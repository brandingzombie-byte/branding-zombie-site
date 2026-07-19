"use client";

import { useActionState, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import {
  SECTIONS, BANDS, computeResult, emptyAnswers,
  type Answers, type BandKey, type IconKey, type Tier,
} from "@/lib/brand-checkup/data";
import { CALENDLY_URL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import { emailCheckup, type CheckupState } from "./actions";
import Heartbeat from "./Heartbeat";
import ZombieHand from "@/components/ZombieHand";
import { HANDS } from "@/data/hands";
import styles from "./BrandCheckup.module.css";

// The disembodied zombie hand that reacts to each score band on the results
// screen — approval when you're alive, a thumbs-down when you're a zombie.
const REACTION: Record<BandKey, { id: keyof typeof HANDS; flip: boolean; width: number }> = {
  alive: { id: "zh01-thumbsup-l", flip: true, width: 150 },   // 👍 you made it
  pulse: { id: "zh37-thumbsup-r", flip: false, width: 150 },  // 👍 solid
  half: { id: "zh10-rockon-r", flip: false, width: 104 },     // 🤘 not dead yet
  zombie: { id: "zh09-thumbsdown-l", flip: true, width: 150 }, // 👎 oof
};

// Count a number up to its target on an ease-out-quart ramp, synced with the
// score-ring reveal. Honors reduced-motion by jumping straight to the target.
function useCountUp(target: number, durationMs = 1100): number {
  const reduce = useReducedMotion();
  const [n, setN] = useState(target);
  useEffect(() => {
    if (reduce) { setN(target); return; }
    setN(0);
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / durationMs, 1);
      setN(Math.round((1 - Math.pow(1 - p, 4)) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs, reduce]);
  return n;
}

const CIRC = 2 * Math.PI * 66;
const TIER_VAR: Record<Tier, string> = { strong: "var(--color-toxic)", mid: "#E7B23A", weak: "var(--color-destructive)" };
const BAND_VAR: Record<BandKey, string> = { alive: "var(--color-toxic)", pulse: "#E7B23A", half: "#E07B2E", zombie: "var(--color-destructive)" };

const ICONS: Record<IconKey | "check" | "back" | "mail" | "star" | "bolt", ReactNode> = {
  search: <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>,
  globe: <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 9h18M8 18v2m8-2v2M7 22h10" /></svg>,
  tag: <svg viewBox="0 0 24 24"><path d="M4 4h7l9 9-7 7-9-9V4z" /><circle cx="8.5" cy="8.5" r="1.4" fill="currentColor" stroke="none" /></svg>,
  doc: <svg viewBox="0 0 24 24"><path d="M6 2h8l4 4v16H6z" /><path d="M14 2v4h4M9 13h6M9 17h6" /></svg>,
  truck: <svg viewBox="0 0 24 24"><path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z" /><circle cx="7" cy="18" r="1.8" /><circle cx="17" cy="18" r="1.8" /></svg>,
  check: <svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>,
  back: <svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" /></svg>,
  mail: <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>,
  star: <svg viewBox="0 0 24 24"><path d="M12 3l2.6 5.6 6.1.7-4.5 4.1 1.2 6L12 16.9 6.6 19.5l1.2-6-4.5-4.1 6.1-.7z" /></svg>,
  bolt: <svg viewBox="0 0 24 24"><path d="M13 2L4 14h6l-1 8 9-12h-6z" /></svg>,
};

export default function BrandCheckup() {
  const [step, setStep] = useState(0); // 0 intro · 1..5 sections · 6 results
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (step > 0 && topRef.current) topRef.current.scrollIntoView({ block: "start", behavior: "auto" });
  }, [step]);

  const toggle = (k: string, qi: number) =>
    setAnswers((prev) => {
      const yes = new Set(prev[k].yes);
      const skip = new Set(prev[k].skip);
      yes.has(qi) ? yes.delete(qi) : yes.add(qi);
      skip.delete(qi);
      return { ...prev, [k]: { yes: [...yes], skip: [...skip] } };
    });
  const skipQ = (k: string, qi: number) =>
    setAnswers((prev) => {
      const yes = new Set(prev[k].yes);
      const skip = new Set(prev[k].skip);
      if (skip.has(qi)) skip.delete(qi);
      else { skip.add(qi); yes.delete(qi); }
      return { ...prev, [k]: { yes: [...yes], skip: [...skip] } };
    });
  const restart = () => { setAnswers(emptyAnswers()); setStep(0); };

  // Band for the results reaction hand (only needed on the results step).
  const reactionBand = step === 6 ? computeResult(answers).bandKey : null;

  return (
    <div className={styles.app} data-theme="dark">
      <div className={styles.dots} aria-hidden />

      {/* Decorative zombie hands, painted in the empty side-gutters beside the
          ≤680px content column so they never overlap text or controls. The layer
          spans the full-width .app (so "left"/"right" mean the viewport edges);
          hands bleed off-edge → the wrist reads as disembodied. Desktop-only,
          aria-hidden, pointer-events:none, zero CLS. */}
      <div className={styles.handLayer} aria-hidden>
        {step === 0 && (
          // Points in at the headline from the left gutter.
          <ZombieHand
            src={HANDS["zh25-point-diag"].src}
            width={HANDS["zh25-point-diag"].width}
            height={HANDS["zh25-point-diag"].height}
            edge="left"
            behaviors={["peek", "idle"]}
            offset="210px"
            bleed="-30px"
            displayWidth={210}
            rotate={-3}
            zIndex={2}
          />
        )}
        {reactionBand && (
          // Band-keyed verdict: 👍 alive · 🤘 half · 👎 zombie — from the right gutter.
          <ZombieHand
            key={reactionBand}
            src={HANDS[REACTION[reactionBand].id].src}
            width={HANDS[REACTION[reactionBand].id].width}
            height={HANDS[REACTION[reactionBand].id].height}
            edge="right"
            behaviors={["peek", "idle"]}
            offset="150px"
            bleed="-30px"
            displayWidth={REACTION[reactionBand].width}
            flip={REACTION[reactionBand].flip}
            zIndex={2}
          />
        )}
      </div>

      <div className={styles.wrap} ref={topRef}>
        <div className={styles.brandbar}>
          <Image src="/assets/Branding_Zombie_Logo_Icon.svg" alt="" width={30} height={30} priority />
          <span>Branding Zombie Designs</span>
        </div>
        {step === 0 && <Intro onStart={() => setStep(1)} />}
        {step >= 1 && step <= 5 && (
          <Section
            key={step}
            i={step - 1}
            answers={answers}
            onToggle={toggle}
            onSkip={skipQ}
            onNext={() => setStep(step + 1)}
            onPrev={() => setStep(step - 1)}
          />
        )}
        {step === 6 && <Results answers={answers} onRestart={restart} />}
      </div>
    </div>
  );
}

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div className={`${styles.intro} ${styles.fade}`}>
      <Image className={styles.skull} src="/assets/Branding_Zombie_Logo_Icon.svg" alt="Branding Zombie skull" width={120} height={120} priority />
      <div className={styles.kick}>The 5-Minute Brand Checkup</div>
      <h1 className={styles.h1}>Is Your Brand<br /><em>Half-Dead?</em></h1>
      <p className={styles.deck}>25 honest questions. One straight answer on where your business is losing customers — and the fastest way to fix it.</p>
      <Heartbeat band="pulse" seconds={3.4} className={styles.hbIntro} />
      <div className={styles.pills}>
        <span className={styles.pill}>⏱️ <b>5 minutes</b></span>
        <span className={styles.pill}>📊 <b>Instant</b> personalized score</span>
        <span className={styles.pill}>🎯 Your <b>3 fastest fixes</b></span>
      </div>
      <div className={styles.start}>
        <button className={styles.cta} onClick={onStart}>Start my checkup →</button>
        <div className={styles.trust}>No jargon. No sales pitch. <b>Just honest answers.</b></div>
      </div>
    </div>
  );
}

function Section({ i, answers, onToggle, onSkip, onNext, onPrev }: {
  i: number; answers: Answers;
  onToggle: (k: string, qi: number) => void; onSkip: (k: string, qi: number) => void;
  onNext: () => void; onPrev: () => void;
}) {
  const s = SECTIONS[i];
  const a = answers[s.key];
  const doneUpTo = useMemo(() => {
    let n = 0;
    for (let j = 0; j <= i; j++) { const k = SECTIONS[j].key; n += answers[k].yes.length + answers[k].skip.length; }
    return n;
  }, [i, answers]);
  const pct = Math.round((doneUpTo / 25) * 100);

  return (
    <div className={styles.fade}>
      <div className={styles.qhead}>
        <div className={styles.qmeta}><span>Section {i + 1} of 5 · {s.title}</span><span className={styles.pct}>{pct}% there</span></div>
        <div className={styles.barTrack}><span className={styles.barFill} style={{ width: `${pct}%` }} /></div>
      </div>
      <div className={styles.card}>
        <div className={styles.secTop}>
          <div className={styles.secIc}>{ICONS[s.icon]}</div>
          <div><div className={styles.secTtl}>{s.title}</div><div className={styles.secSub}>{s.sub}</div></div>
        </div>
        <div className={styles.secHint}>{s.hint}</div>
        <div className={styles.qlist}>
          {s.q.map((q, qi) => {
            const yes = a.yes.includes(qi), skip = a.skip.includes(qi);
            return (
              <div key={qi}>
                <button type="button" className={`${styles.q} ${yes ? styles.yes : ""} ${skip ? styles.skip : ""}`} onClick={() => onToggle(s.key, qi)}>
                  <span className={styles.chk}>{ICONS.check}</span>
                  <span className={styles.qtx}><span className={styles.t}>{q.t}</span><span className={styles.hh}>{q.h}</span></span>
                </button>
                {q.cond && (
                  <button type="button" className={`${styles.na} ${skip ? styles.on : ""}`} onClick={() => onSkip(s.key, qi)}>
                    {skip ? "✓ " : ""}{q.cond} — doesn&apos;t apply to me
                  </button>
                )}
              </div>
            );
          })}
        </div>
        <div className={styles.qnav}>
          {i > 0 && <button type="button" className={`${styles.cta} ${styles.ghost} ${styles.back}`} onClick={onPrev}>{ICONS.back}</button>}
          <button type="button" className={styles.cta} onClick={onNext}>{i < 4 ? "Next section →" : "See my results →"}</button>
        </div>
      </div>
    </div>
  );
}

function Results({ answers, onRestart }: { answers: Answers; onRestart: () => void }) {
  const r = useMemo(() => computeResult(answers), [answers]);
  const band = BANDS[r.bandKey];
  const bandColor = BAND_VAR[r.bandKey];
  const count = useCountUp(r.scaled);
  const [offset, setOffset] = useState(CIRC);

  useEffect(() => {
    const id = requestAnimationFrame(() => setOffset(CIRC * (1 - r.pct)));
    return () => cancelAnimationFrame(id);
  }, [r.pct]);

  return (
    <div className={styles.fade}>
      <div className={`${styles.rhero} ${styles[r.bandKey]}`}>
        <div className={styles.ringWrap}>
          <svg width="150" height="150">
            <circle className={styles.ringBg} cx="75" cy="75" r="66" fill="none" strokeWidth="12" />
            <circle className={styles.ringFg} cx="75" cy="75" r="66" fill="none" strokeWidth="12"
              stroke={bandColor} strokeDasharray={CIRC} strokeDashoffset={offset} />
          </svg>
          <div className={styles.ringCtr}><span className={styles.scoreN}>{count}</span><span className={styles.scoreOf}>out of 25</span></div>
        </div>
        <div className={styles.verdictPill} style={{ background: bandColor }}>{band.pill}</div>
        <div className={styles.bandH} style={{ color: bandColor }}>{band.name}</div>
        <p dangerouslySetInnerHTML={{ __html: band.copy }} />
        <Heartbeat band={r.bandKey} color={bandColor} className={styles.hbHero} />
      </div>

      <div className={styles.blk}>
        <div className={`${styles.blkH} ${styles.dark}`}>Your brand, section by section</div>
        <div className={styles.blkSub}>Where your business is alive — and where it&apos;s fading.</div>
        {r.sections.map((d) => (
          <div key={d.key} className={styles.secrow}>
            <div className={styles.top}><span className={styles.nm}>{d.title}</span><span className={styles.sc} style={{ color: TIER_VAR[d.tier] }}>{d.score}/{d.app}</span></div>
            <div className={styles.sbar}><i style={{ width: `${Math.round(d.ratio * 100)}%`, background: TIER_VAR[d.tier] }} /></div>
            <div className={styles.cap}><b>{d.cap}</b>{d.tier !== "strong" ? ` ${d.cost}` : ""}</div>
          </div>
        ))}
      </div>

      {r.wins.length > 0 && (
        <div className={styles.blk}>
          <div className={styles.blkH}>{ICONS.check} What you&apos;re already nailing</div>
          <div className={styles.blkSub}>Credit where it&apos;s due — build on these.</div>
          {r.wins.map((w) => (
            <div key={w} className={styles.win}>{ICONS.check}<span>Your <b>{w.toLowerCase()}</b> is in good shape. Most businesses your size aren&apos;t there.</span></div>
          ))}
        </div>
      )}

      {r.fixes.length > 0 && (
        <div className={styles.blk}>
          <div className={styles.blkH}>{ICONS.bolt} Your 3 fastest fixes</div>
          <div className={styles.blkSub}>Start here. These move the needle the most for the least effort.</div>
          {r.fixes.map((f, i) => (
            <div key={i} className={styles.fix}><span className={styles.n}>{i + 1}</span>
              <div><div className={styles.ft}>{f.fix}</div><span className={styles.tag}>{f.svc}</span></div></div>
          ))}
        </div>
      )}

      <EmailCapture answers={answers} score={r.scaled} />

      <div className={styles.consult}>
        <div className={styles.ch}>Want me to take a look?</div>
        <div className={styles.cs}>Book a free 15-minute Brand Checkup call. We&apos;ll go through your score together and I&apos;ll tell you the 2–3 things to fix first — <b>whether you hire me or not.</b></div>
        <div className={styles.proof}>
          <div className={styles.pr}>{ICONS.check}<span><b>It&apos;s actually free.</b> No charge, no obligation, no canned pitch.</span></div>
          <div className={styles.pr}>{ICONS.check}<span><b>You talk to me, the owner</b> — not a salesperson. I answer my own phone, right here in Cumming.</span></div>
          <div className={styles.pr}>{ICONS.star}<span><b>Real results:</b> &quot;Within two days of my website going live, I started getting new business.&quot; One client&apos;s online store did <b>$100k its first year.</b></span></div>
          <div className={styles.pr}>{ICONS.bolt}<span>Agencies charge <b>$15k and 4 months.</b> This is a 15-minute call and a flat, honest quote — days, not months.</span></div>
        </div>
        <a className={styles.cta} href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("contact_intent", { form: "brand_checkup", method: "calendly" })}>📅 Book my free checkup call</a>
        <div className={styles.orline}>or call / text <a href={PHONE_HREF}>{PHONE_DISPLAY}</a></div>
        <div className={styles.quote}>&quot;Gerry got it immediately — a can-do person, and his turnover time is hella fast.&quot; <b>— real Forsyth County clients, 5.0★ on Google</b></div>
      </div>

      <div className={styles.rfoot}><b>Branding Zombie Designs</b> — real brands for real businesses in Cumming, Forsyth County &amp; North Metro Atlanta.<br />Logos · Websites · Signs · Print · Apparel. Flat prices. Days, not months.</div>
      <button type="button" className={styles.restart} onClick={onRestart}>↻ Retake the checkup</button>
    </div>
  );
}

const INITIAL: CheckupState = { ok: false, message: "" };

function EmailCapture({ answers, score }: { answers: Answers; score: number }) {
  const [state, formAction, pending] = useActionState(emailCheckup, INITIAL);
  const tracked = useRef(false);

  useEffect(() => {
    if (state.ok && !tracked.current) {
      tracked.current = true;
      trackEvent("generate_lead", { form: "brand_checkup", value: 1, score });
    }
  }, [state.ok, score]);

  if (state.ok) {
    return (
      <div className={`${styles.blk} ${styles.emailCard}`}>
        <div className={styles.sent}>
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" /></svg>
          <div className={styles.st}>On its way!</div>
          <p>Check your inbox in a minute. Want to skip ahead? Book your free call below 👇</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.blk} ${styles.emailCard}`}>
      <div className={styles.blkH}>{ICONS.mail} Email me my full report</div>
      <div className={styles.blkSub}>Get your score, the section breakdown, and your personalized action plan in your inbox — so you actually do something with it.</div>
      <form action={formAction}>
        <input type="hidden" name="answers" value={JSON.stringify(answers)} />
        <label className="sr-only" aria-hidden style={{ position: "absolute", left: "-9999px" }}>
          Company website<input type="text" name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
        <div className={styles.field}>
          <label htmlFor="bzq-email">Where should I send it?</label>
          <input id="bzq-email" name="email" type="email" inputMode="email" autoComplete="email" placeholder="you@yourbusiness.com" required maxLength={160}
            className={state.message && !state.ok ? styles.err : ""} />
          {state.message && !state.ok && <div className={styles.errmsg} role="alert">{state.message}</div>}
        </div>
        <div className={styles.field} style={{ marginTop: 11 }}>
          <label htmlFor="bzq-name">Your name <span>(optional)</span></label>
          <input id="bzq-name" name="name" type="text" autoComplete="name" placeholder="First name" maxLength={120} />
        </div>
        <label className={styles.consent}><input type="checkbox" defaultChecked />
          <span>Email me my results and a personalized action plan. Gerry gets a copy too, so he can prep a free 2-minute teardown before any call. No spam, unsubscribe anytime.</span></label>
        <button className={styles.cta} type="submit" disabled={pending} style={{ marginTop: 6 }}>
          {pending ? "Sending…" : "Send me my report →"}
        </button>
        <div className={styles.helper}>We&apos;ll never sell your info. One report, then you decide if you want the free call.</div>
      </form>
    </div>
  );
}
