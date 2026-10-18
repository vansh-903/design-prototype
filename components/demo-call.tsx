"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Check, Loader2, Pause, Play, RotateCcw, PhoneCall } from "lucide-react";
import { demoScripts, demoSummary, languages, type DemoEvent, type Lang } from "@/lib/content";
import { EASE, Waveform, cx } from "./motion-kit";

type Phase = "idle" | "typing" | "speaking" | "tool" | "done";

function useDemoPlayer(events: DemoEvent[], inView: boolean, reduced: boolean) {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [words, setWords] = useState(0);
  const [paused, setPaused] = useState(false);
  const [started, setStarted] = useState(false);

  if (inView && !started) setStarted(true);

  const running = started && !paused && inView && !reduced && phase !== "done";

  useEffect(() => {
    if (!running) return;
    const ev = events[idx];
    let t: ReturnType<typeof setTimeout>;
    if (!ev) {
      t = setTimeout(() => setPhase("done"), 300);
    } else if (phase === "idle") {
      t = setTimeout(() => setPhase(ev.kind === "turn" ? "typing" : "tool"), 350);
    } else if (phase === "typing") {
      t = setTimeout(() => {
        setWords(0);
        setPhase("speaking");
      }, 650);
    } else if (phase === "speaking" && ev.kind === "turn") {
      const total = ev.text.split(" ").length;
      t =
        words < total
          ? setTimeout(() => setWords((w) => w + 1), 90)
          : setTimeout(() => {
              setIdx((i) => i + 1);
              setWords(0);
              setPhase("idle");
            }, 450);
    } else if (phase === "tool") {
      t = setTimeout(() => {
        setIdx((i) => i + 1);
        setPhase("idle");
      }, 950);
    }
    return () => clearTimeout(t);
  }, [running, idx, phase, words, events]);

  const restart = () => {
    setIdx(0);
    setWords(0);
    setPhase("idle");
    setPaused(false);
    setStarted(true);
  };

  if (reduced) {
    return { idx: events.length, phase: "done" as Phase, words: 0, paused, setPaused, restart, started: true };
  }
  return { idx, phase, words, paused, setPaused, restart, started };
}

export function DemoCall({ variant }: { variant: "a" | "b" }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const reduced = !!useReducedMotion();
  const [lang, setLang] = useState<Lang>("en");
  const events = demoScripts[lang];
  const p = useDemoPlayer(events, inView, reduced);
  const current = events[p.idx];
  const speakingWho = p.phase === "speaking" && current?.kind === "turn" ? current.who : null;
  const elapsed = Math.min(48, Math.round((p.idx / events.length) * 48));
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduced ? "auto" : "smooth" });
  }, [p.idx, p.words, p.phase, reduced]);

  const a = variant === "a";

  return (
    <div
      ref={ref}
      data-cursor={p.phase === "done" ? "Replay" : p.paused ? "Play" : undefined}
      className={cx(
        "relative w-full overflow-hidden border border-line bg-surface text-fg",
        a ? "rounded-2xl font-geist" : "rounded-[28px] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)]",
      )}
    >
      <div className={cx("flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5", a && "font-geist-mono text-xs")}>
        <div className="flex items-center gap-3">
          <span className="relative flex size-2.5">
            <span className={cx("pulse-dot relative inline-flex size-2.5 rounded-full", p.phase === "done" ? "bg-muted" : "bg-accent-fill")} />
          </span>
          <span className={cx(a ? "uppercase tracking-wider text-muted" : "text-sm font-medium")}>
            {p.phase === "done" ? "Call ended" : p.started ? "Live call" : "Ready"} · 0:{String(elapsed).padStart(2, "0")}
          </span>
          <span className={cx("rounded-full border border-line px-2 py-0.5 text-muted", a ? "text-[10px]" : "text-xs")}>Scripted demo</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label={p.paused ? "Play" : "Pause"}
            onClick={() => (p.phase === "done" ? p.restart() : p.setPaused(!p.paused))}
            className="grid size-11 place-items-center rounded-full text-muted transition-colors hover:text-fg"
          >
            {p.paused || p.phase === "done" ? <Play className="size-4" /> : <Pause className="size-4" />}
          </button>
          <button type="button" aria-label="Replay" onClick={p.restart} className="grid size-11 place-items-center rounded-full text-muted transition-colors hover:text-fg">
            <RotateCcw className="size-4" />
          </button>
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto border-b border-line px-3 py-2 sm:px-4" role="tablist" aria-label="Call language">
        {languages.map((l) => (
          <button
            key={l.id}
            role="tab"
            aria-selected={lang === l.id}
            onClick={() => {
              setLang(l.id);
              p.restart();
            }}
            className={cx(
              "relative min-h-9 shrink-0 rounded-full px-3 text-sm transition-colors",
              lang === l.id ? "text-on-accent" : "text-muted hover:text-fg",
            )}
          >
            {lang === l.id && (
              <motion.span layoutId={`lang-${variant}`} className="absolute inset-0 rounded-full bg-accent-fill" transition={{ duration: 0.3, ease: EASE }} />
            )}
            <span className="relative">{l.label}</span>
          </button>
        ))}
        <span className="flex min-h-9 shrink-0 items-center px-3 text-sm text-muted">[more]</span>
      </div>

      <div className="grid grid-cols-2 gap-px bg-line">
        {(["caller", "agent"] as const).map((who) => (
          <div key={who} className="flex items-center gap-3 bg-surface px-4 py-3 sm:px-5">
            <span
              className={cx(
                "grid size-8 shrink-0 place-items-center rounded-full text-xs font-semibold",
                who === "agent" ? "bg-accent-fill text-on-accent" : "bg-fg/10 text-fg",
              )}
            >
              {who === "agent" ? "AI" : <PhoneCall className="size-3.5" />}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium">{who === "agent" ? "Agent" : "Caller"}</p>
              <p className={cx("truncate text-xs text-muted", a && "font-geist-mono")}>{who === "agent" ? "Front desk" : "+91 ••••• ••210"}</p>
            </div>
            <Waveform
              bars={10}
              active={speakingWho === who}
              className={cx("ml-auto h-6", speakingWho === who ? (who === "agent" ? "text-accent" : "text-fg") : "text-line")}
            />
          </div>
        ))}
      </div>

      <div ref={scrollRef} className="h-[340px] overflow-y-auto px-4 py-5 sm:h-[380px] sm:px-5">
        <AnimatePresence mode="wait">
          <motion.ul
            key={lang}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-3"
          >
            {events.slice(0, p.idx).map((ev, i) => (
              <EventRow key={i} ev={ev} variant={variant} />
            ))}
            {current && p.phase === "typing" && current.kind === "turn" && <Typing who={current.who} variant={variant} />}
            {current && p.phase === "speaking" && current.kind === "turn" && (
              <EventRow ev={{ ...current, text: current.text.split(" ").slice(0, p.words).join(" ") }} variant={variant} live />
            )}
            {current && p.phase === "tool" && current.kind === "tool" && <EventRow ev={current} variant={variant} running />}
            {p.phase === "done" && (
              <motion.li
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className={cx("mt-2 rounded-xl border border-line p-4", a ? "bg-bg" : "bg-bg/60")}
              >
                <p className={cx("mb-3 text-xs uppercase tracking-wider text-muted", a && "font-geist-mono")}>Call summary</p>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                  {demoSummary.map((s) => (
                    <div key={s.k}>
                      <dt className="text-xs text-muted">{s.k}</dt>
                      <dd className="font-medium">{s.v}</dd>
                    </div>
                  ))}
                </dl>
              </motion.li>
            )}
          </motion.ul>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Typing({ who, variant }: { who: "agent" | "caller"; variant: "a" | "b" }) {
  return (
    <li className={cx("flex", who === "agent" ? "justify-start" : "justify-end")}>
      <span className={cx("flex gap-1 rounded-2xl px-4 py-3", who === "agent" ? "bg-accent-fill/15" : "bg-fg/5", variant === "b" && "rounded-[20px]")}>
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="size-1.5 rounded-full bg-muted"
            animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.12 }}
          />
        ))}
      </span>
    </li>
  );
}

function EventRow({ ev, variant, live, running }: { ev: DemoEvent; variant: "a" | "b"; live?: boolean; running?: boolean }) {
  if (ev.kind === "tool") {
    return (
      <motion.li initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, ease: EASE }} className="flex justify-center">
        <span
          className={cx(
            "inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs",
            variant === "a" ? "font-geist-mono bg-bg" : "bg-bg/60",
            !running && "border-accent/40",
          )}
        >
          {running ? <Loader2 className="size-3.5 animate-spin text-muted" /> : <Check className="size-3.5 text-accent" />}
          {ev.label}
        </span>
      </motion.li>
    );
  }
  const agent = ev.who === "agent";
  return (
    <motion.li
      initial={live ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cx("flex", agent ? "justify-start" : "justify-end")}
    >
      <p
        className={cx(
          "max-w-[85%] px-4 py-2.5 text-[15px] leading-relaxed",
          variant === "a" ? "rounded-2xl" : "rounded-[20px]",
          agent ? "bg-accent-fill/15 text-fg" : "bg-fg/5 text-fg",
          agent && variant === "a" && "rounded-bl-md",
          !agent && variant === "a" && "rounded-br-md",
        )}
      >
        {ev.text}
        {live && <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-accent" />}
      </p>
    </motion.li>
  );
}
