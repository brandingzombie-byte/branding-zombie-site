// Asset pipeline for the Zombie Hands interactive system.
//
// Sources (per group):
//   v1: `Assets to add/Zombie Hand/*.png`     (original 7, already-transparent PNGs)
//   v2: `Assets to add/Zombie Hand v2/*.png`  (cutouts from the 40-image ZH series —
//        background removal happens BEFORE staging; this script only trims/resizes/
//        encodes. Stage ONLY transparent PNGs here, never the raw white-bg exports.)
// Output: `public/hands/{id}.webp` (1x, longest edge 720px) and
//         `public/hands/{id}@2x.webp` (2x, longest edge 1440px).
//
// Each PNG is `.trim()`ed of transparent padding (the art direction relies on
// the wrist bleeding off-edge, so placement CSS — not baked padding — handles
// the bleed). Intrinsic dimensions of every 1x output are written to
// `src/data/hands.ts` so consumers can always set width/height (zero CLS).
//
// Carry-forward: a slug whose source PNG is no longer staged (e.g. the v1
// staging folder was cleaned up after the original run) is NOT an error as
// long as its 1x + 2x outputs already exist in public/hands — those outputs
// are kept verbatim and re-read into the registry. Only a slug with neither a
// source nor existing outputs fails the run.
//
// Budget gates:
//   - every 1x file (new or carried) must be <= 90KB;
//   - the HOMEPAGE subset (the original 7 slugs — the only hands the homepage
//     loads) must total <= 450KB at 1x. Hands used solely on other routes
//     (contact / services / free-site-audit) are budgeted per page in
//     ZOMBIE-HANDS-SPEC.md, not against the homepage total.
//   Newly encoded files retry once at quality 72 before failing.
//
// Run: `node scripts/optimize-hands.mjs`

import sharp from "sharp";
import { mkdir, writeFile, readdir, readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "public", "hands");
const DATA_FILE = join(ROOT, "src", "data", "hands.ts");

// Source groups: staging dir -> { source filename -> stable slug id }.
const SOURCES = [
  {
    dir: join(ROOT, "Assets to add", "Zombie Hand"),
    slugs: {
      "ZH-01_left_thumbs-up_man.png": "zh01-thumbsup-l",
      "ZH-09_left_thumbs-down_man.png": "zh09-thumbsdown-l",
      "ZH-10_right_rock-on_woman.png": "zh10-rockon-r",
      "ZH-11_bottom_pointing-up_man.png": "zh11-point-up",
      "ZH-25_diagTL_pointing_woman.png": "zh25-point-diag",
      "ZH-34_left_highfive_man.png": "zh34-highfive-l",
      "ZH-37_right_thumbs-up_woman.png": "zh37-thumbsup-r",
    },
  },
  {
    dir: join(ROOT, "Assets to add", "Zombie Hand v2"),
    slugs: {
      "ZH-05_left_brains-wanted-sign_man.png": "zh05-brains-sign-l",
      "ZH-13_left_point-viewer_man.png": "zh13-point-viewer-l",
      "ZH-22_right_beckon_woman.png": "zh22-beckon-r",
      "ZH-32_right_count-three_woman.png": "zh32-count-three-r",
    },
  },
];

// The hands the HOMEPAGE actually loads (the original 7) — the 450KB total
// gate applies to this subset only.
const HOMEPAGE_IDS = new Set([
  "zh01-thumbsup-l",
  "zh09-thumbsdown-l",
  "zh10-rockon-r",
  "zh11-point-up",
  "zh25-point-diag",
  "zh34-highfive-l",
  "zh37-thumbsup-r",
]);

const EDGE_1X = 720;
const EDGE_2X = 1440;
const MAX_FILE_1X = 90 * 1024; // 90KB per 1x file
const MAX_TOTAL_1X = 450 * 1024; // 450KB total 1x HOMEPAGE set
const ALPHA_QUALITY = 85;
const EFFORT = 6;

const kb = (n) => (n / 1024).toFixed(1) + "KB";

const exists = (p) =>
  stat(p).then(
    () => true,
    () => false
  );

// Trim transparent padding, resize so the longest edge == `edge`px (never
// upscaling), then encode WebP. Returns { buffer, info }.
async function render(srcPath, edge, quality) {
  const trimmed = await sharp(srcPath).trim().toBuffer();
  const out = await sharp(trimmed)
    .resize(edge, edge, { fit: "inside", withoutEnlargement: true })
    .webp({ quality, alphaQuality: ALPHA_QUALITY, effort: EFFORT })
    .toBuffer({ resolveWithObject: true });
  return { buffer: out.data, info: out.info };
}

async function buildAt(jobs, quality) {
  const results = [];
  for (const job of jobs) {
    const one = await render(job.srcPath, EDGE_1X, quality);
    const two = await render(job.srcPath, EDGE_2X, quality);
    results.push({
      id: job.id,
      file: job.file,
      carried: false,
      width: one.info.width,
      height: one.info.height,
      size1x: one.buffer.length,
      size2x: two.buffer.length,
      buffers: { one: one.buffer, two: two.buffer },
    });
  }
  return results;
}

// Re-read an already-shipped asset (source no longer staged) into a result row.
async function carryExisting(id) {
  const onePath = join(OUT_DIR, `${id}.webp`);
  const twoPath = join(OUT_DIR, `${id}@2x.webp`);
  if (!(await exists(onePath)) || !(await exists(twoPath))) return null;
  const buf = await readFile(onePath);
  const meta = await sharp(buf).metadata();
  return {
    id,
    file: "(carried — output already in public/hands)",
    carried: true,
    width: meta.width,
    height: meta.height,
    size1x: buf.length,
    size2x: (await stat(twoPath)).size,
    buffers: null,
  };
}

function report(results, quality) {
  console.log(`\n  Encoded at WebP quality ${quality} (carried files unchanged):`);
  let homeTotal = 0;
  for (const r of results) {
    if (HOMEPAGE_IDS.has(r.id)) homeTotal += r.size1x;
    const flag = r.size1x > MAX_FILE_1X ? "  ✗ OVER 90KB" : "";
    const tag = r.carried ? " (carried)" : "";
    console.log(
      `    ${r.id.padEnd(20)} ${String(r.width).padStart(4)}x${String(
        r.height
      ).padEnd(4)}  1x ${kb(r.size1x).padStart(8)}  2x ${kb(r.size2x).padStart(
        8
      )}${flag}${tag}`
    );
  }
  console.log(
    `    ${"HOMEPAGE 1x TOTAL".padEnd(20)} ${" ".repeat(11)}${kb(homeTotal).padStart(8)}`
  );
  const overFile = results.filter((r) => r.size1x > MAX_FILE_1X);
  const overTotal = homeTotal > MAX_TOTAL_1X;
  return {
    total: homeTotal,
    ok: overFile.length === 0 && !overTotal,
    overFile,
    overTotal,
  };
}

async function main() {
  // Resolve every slug to either a fresh encode job or a carried output.
  const jobs = [];
  const carried = [];
  const missing = [];
  for (const source of SOURCES) {
    const dirList = (await exists(source.dir)) ? await readdir(source.dir) : [];
    for (const [file, id] of Object.entries(source.slugs)) {
      if (dirList.includes(file)) {
        jobs.push({ id, file, srcPath: join(source.dir, file) });
      } else {
        const kept = await carryExisting(id);
        if (kept) carried.push(kept);
        else missing.push(`${file} (${id})`);
      }
    }
  }
  if (missing.length) {
    console.error(
      "  FAIL — no staged source AND no existing output for:",
      missing.join(", ")
    );
    process.exit(1);
  }

  await mkdir(OUT_DIR, { recursive: true });

  console.log("Zombie Hands asset pipeline");
  console.log(`  ${jobs.length} source PNG(s) to encode, ${carried.length} carried`);

  let quality = 80;
  let encoded = await buildAt(jobs, quality);
  let results = [...encoded, ...carried].sort((a, b) =>
    a.id.localeCompare(b.id)
  );
  let gate = report(results, quality);

  if (!gate.ok && jobs.length > 0) {
    console.log(
      `\n  Budget exceeded at q80 (${
        gate.overFile.length
      } file(s) over 90KB${gate.overTotal ? ", homepage total over 450KB" : ""}). Retrying at q72...`
    );
    quality = 72;
    encoded = await buildAt(jobs, quality);
    results = [...encoded, ...carried].sort((a, b) => a.id.localeCompare(b.id));
    gate = report(results, quality);
  }

  // Write freshly encoded outputs regardless so we can inspect, but fail the
  // process if the gate did not pass at the retry quality.
  for (const r of results) {
    if (r.carried) continue;
    await writeFile(join(OUT_DIR, `${r.id}.webp`), r.buffers.one);
    await writeFile(join(OUT_DIR, `${r.id}@2x.webp`), r.buffers.two);
  }

  // Emit the asset registry consumed by ZombieHand / the placement maps.
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
    `\n  Wrote ${encoded.length * 2} new WebP file(s) to public/hands/ (${carried.length} carried).`
  );
  console.log(`  Wrote registry (${results.length} entries) to src/data/hands.ts`);

  if (!gate.ok) {
    console.error(
      `\n  FAIL — budget gate not met at q${quality}:` +
        (gate.overFile.length
          ? ` files over 90KB: ${gate.overFile.map((r) => r.id).join(", ")}.`
          : "") +
        (gate.overTotal
          ? ` homepage 1x set ${kb(gate.total)} > 450KB.`
          : "")
    );
    process.exit(1);
  }

  console.log(
    `\n  ✓ Budget gate passed (all 1x <= 90KB, homepage 1x total <= 450KB).`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
