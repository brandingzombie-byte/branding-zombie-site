// Asset pipeline for the Zombie Hands interactive system.
//
// Source: `Assets to add/Zombie Hand/*.png` (7 files, ~23MB raw).
// Output: `public/hands/{id}.webp` (1x, longest edge 720px) and
//         `public/hands/{id}@2x.webp` (2x, longest edge 1440px).
//
// Each PNG is `.trim()`ed of transparent padding (the art direction relies on
// the wrist bleeding off-edge, so placement CSS — not baked padding — handles
// the bleed). Intrinsic dimensions of every 1x output are written to
// `src/data/hands.ts` so consumers can always set width/height (zero CLS).
//
// Budget gate: fails the build if any 1x file > 90KB or the total 1x set >
// 450KB. Drops WebP quality 80 -> 72 and retries once before failing.
//
// Run: `node scripts/optimize-hands.mjs`

import sharp from "sharp";
import { mkdir, writeFile, readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SRC_DIR = join(ROOT, "Assets to add", "Zombie Hand");
const OUT_DIR = join(ROOT, "public", "hands");
const DATA_FILE = join(ROOT, "src", "data", "hands.ts");

// Source filename -> stable slug id (matches the Agent 3 placement map).
const SLUGS = {
  "ZH-01_left_thumbs-up_man.png": "zh01-thumbsup-l",
  "ZH-09_left_thumbs-down_man.png": "zh09-thumbsdown-l",
  "ZH-10_right_rock-on_woman.png": "zh10-rockon-r",
  "ZH-11_bottom_pointing-up_man.png": "zh11-point-up",
  "ZH-25_diagTL_pointing_woman.png": "zh25-point-diag",
  "ZH-34_left_highfive_man.png": "zh34-highfive-l",
  "ZH-37_right_thumbs-up_woman.png": "zh37-thumbsup-r",
};

const EDGE_1X = 720;
const EDGE_2X = 1440;
const MAX_FILE_1X = 90 * 1024; // 90KB per 1x file
const MAX_TOTAL_1X = 450 * 1024; // 450KB total 1x set
const ALPHA_QUALITY = 85;
const EFFORT = 6;

const kb = (n) => (n / 1024).toFixed(1) + "KB";

// Trim transparent padding, resize so the longest edge == `edge`px (never
// upscaling), then encode WebP. Returns { buffer, info, trim }.
async function render(srcPath, edge, quality) {
  const pipeline = sharp(srcPath).trim();
  // Capture trim offsets before the resize consumes the pipeline metadata.
  const trimmed = await pipeline.toBuffer({ resolveWithObject: true });
  const trim = {
    top: trimmed.info.trimOffsetTop ?? 0,
    left: trimmed.info.trimOffsetLeft ?? 0,
    width: trimmed.info.width,
    height: trimmed.info.height,
  };
  const out = await sharp(trimmed.data)
    .resize(edge, edge, { fit: "inside", withoutEnlargement: true })
    .webp({ quality, alphaQuality: ALPHA_QUALITY, effort: EFFORT })
    .toBuffer({ resolveWithObject: true });
  return { buffer: out.data, info: out.info, trim };
}

async function buildAt(files, quality) {
  const results = [];
  for (const file of files) {
    const id = SLUGS[file];
    const srcPath = join(SRC_DIR, file);
    const one = await render(srcPath, EDGE_1X, quality);
    const two = await render(srcPath, EDGE_2X, quality);
    results.push({
      id,
      file,
      width: one.info.width,
      height: one.info.height,
      size1x: one.buffer.length,
      size2x: two.buffer.length,
      trim: one.trim,
      buffers: {
        one: one.buffer,
        two: two.buffer,
      },
    });
  }
  return results;
}

function report(results, quality) {
  console.log(`\n  Encoded at WebP quality ${quality}:`);
  let total = 0;
  for (const r of results) {
    total += r.size1x;
    const flag = r.size1x > MAX_FILE_1X ? "  ✗ OVER 90KB" : "";
    console.log(
      `    ${r.id.padEnd(20)} ${String(r.width).padStart(4)}x${String(
        r.height
      ).padEnd(4)}  1x ${kb(r.size1x).padStart(8)}  2x ${kb(r.size2x).padStart(
        8
      )}${flag}`
    );
  }
  console.log(`    ${"TOTAL 1x".padEnd(20)} ${" ".repeat(11)}${kb(total).padStart(8)}`);
  const overFile = results.filter((r) => r.size1x > MAX_FILE_1X);
  const overTotal = total > MAX_TOTAL_1X;
  return { total, ok: overFile.length === 0 && !overTotal, overFile, overTotal };
}

async function main() {
  const dir = await readdir(SRC_DIR);
  const files = Object.keys(SLUGS).filter((f) => dir.includes(f));
  const missing = Object.keys(SLUGS).filter((f) => !dir.includes(f));
  if (missing.length) {
    console.error("  FAIL — missing source files:", missing.join(", "));
    process.exit(1);
  }

  const srcTotal = (
    await Promise.all(
      files.map(async (f) => (await sharp(join(SRC_DIR, f)).metadata()).size ?? 0)
    )
  ).reduce((a, b) => a + b, 0);

  await mkdir(OUT_DIR, { recursive: true });

  console.log("Zombie Hands asset pipeline");
  console.log(`  ${files.length} source PNGs`);

  let quality = 80;
  let results = await buildAt(files, quality);
  let gate = report(results, quality);

  if (!gate.ok) {
    console.log(
      `\n  Budget exceeded at q80 (${
        gate.overFile.length
      } file(s) over 90KB${gate.overTotal ? ", total over 450KB" : ""}). Retrying at q72...`
    );
    quality = 72;
    results = await buildAt(files, quality);
    gate = report(results, quality);
  }

  // Write outputs regardless so we can inspect, but fail the process if the
  // gate did not pass at the retry quality.
  for (const r of results) {
    await writeFile(join(OUT_DIR, `${r.id}.webp`), r.buffers.one);
    await writeFile(join(OUT_DIR, `${r.id}@2x.webp`), r.buffers.two);
  }

  // Emit the asset registry consumed by ZombieHand / the placement map.
  const entries = results
    .map(
      (r) =>
        `  "${r.id}": {\n` +
        `    id: "${r.id}",\n` +
        `    src: "/hands/${r.id}.webp",\n` +
        `    src2x: "/hands/${r.id}@2x.webp",\n` +
        `    width: ${r.width},\n` +
        `    height: ${r.height},\n` +
        `    aspectRatio: ${(r.width / r.height).toFixed(4)},\n` +
        `  },`
    )
    .join("\n");

  const dataFile = `// AUTO-GENERATED by scripts/optimize-hands.mjs — do not edit by hand.
// Intrinsic dimensions of the optimized 1x WebP hands, so every <ZombieHand>
// can set width/height and contribute ZERO cumulative layout shift.

export interface HandAsset {
  /** Stable slug id, e.g. "zh09-thumbsdown-l". */
  id: string;
  /** 1x WebP path (longest edge 720px). */
  src: string;
  /** 2x WebP path (longest edge 1440px), used for srcSet. */
  src2x: string;
  /** Intrinsic pixel width of the 1x asset. */
  width: number;
  /** Intrinsic pixel height of the 1x asset. */
  height: number;
  /** width / height, precomputed. */
  aspectRatio: number;
}

export const HANDS: Record<string, HandAsset> = {
${entries}
};

export type HandId = keyof typeof HANDS;
`;

  await mkdir(dirname(DATA_FILE), { recursive: true });
  await writeFile(DATA_FILE, dataFile);

  console.log(
    `\n  Source set: ${kb(srcTotal)} -> optimized 1x set: ${kb(gate.total)}`
  );
  console.log(`  Wrote ${results.length * 2} WebP files to public/hands/`);
  console.log(`  Wrote registry to src/data/hands.ts`);

  if (!gate.ok) {
    console.error(
      `\n  FAIL — budget gate not met at q${quality}:` +
        (gate.overFile.length
          ? ` files over 90KB: ${gate.overFile.map((r) => r.id).join(", ")}.`
          : "") +
        (gate.overTotal ? ` total 1x set ${kb(gate.total)} > 450KB.` : "")
    );
    process.exit(1);
  }

  console.log(`\n  ✓ Budget gate passed (all 1x <= 90KB, total <= 450KB).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
