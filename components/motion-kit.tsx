"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useTheme } from "next-themes";
import { Check, Copy, Moon, Sun, Loader2, AlertCircle } from "lucide-react";
import { contact, EMAIL } from "@/lib/content";

export const EASE = [0.22, 1, 0.36, 1] as const;
export const VIEW = { once: true, amount: 0.3 } as const;

function cx(...c: (string | false | undefined | null)[]) {
  return c.filter(Boolean).join(" ");
}
export { cx };

export function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function MaskLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  inView = false,
  stagger = 0.06,
  duration = 0.8,
  from = "up",
}: {
  lines: React.ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  inView?: boolean;
  stagger?: number;
  duration?: number;
  from?: "up" | "left" | "scale";
}) {
  const trigger = inView
    ? { initial: "hidden", whileInView: "show", viewport: VIEW }
    : { initial: "hidden", animate: "show" };
  const hidden =
    from === "left"
      ? { x: "-40%", opacity: 0 }
      : from === "scale"
        ? { y: "20%", opacity: 0, scale: 0.96 }
        : { y: "110%" };
  const show =
    from === "left"
      ? { x: "0%", opacity: 1 }
      : from === "scale"
        ? { y: "0%", opacity: 1, scale: 1 }
        : { y: "0%" };
  return (
    <motion.span className={cx("block", className)} {...trigger}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className={cx("block", lineClassName)}
            variants={{
              hidden,
              show: { ...show, transition: { duration, ease: EASE, delay: delay + i * stagger } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export function RotatingWord({ words, className }: { words: string[]; className?: string }) {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setI((n) => (n + 1) % words.length), 2200);
    return () => clearInterval(t);
  }, [reduced, words.length]);
  return (
    <span className={cx("relative inline-grid align-bottom overflow-hidden", className)}>
      {words.map((w) => (
        <span key={w} className="invisible col-start-1 row-start-1" aria-hidden>
          {w}
        </span>
      ))}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          className="col-start-1 row-start-1"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const BAR_SEED = [0.4, 0.75, 0.55, 1, 0.65, 0.85, 0.35, 0.95, 0.5, 0.7, 0.45, 0.9, 0.6, 0.8, 0.3, 1, 0.55, 0.75];

export function Waveform({
  bars = 18,
  active = true,
  className,
  barClassName,
  speed = 1,
}: {
  bars?: number;
  active?: boolean;
  className?: string;
  barClassName?: string;
  speed?: number;
}) {
  return (
    <div className={cx("flex items-center gap-[3px]", active && "wave-on", className)} aria-hidden>
      {Array.from({ length: bars }).map((_, i) => {
        const s = BAR_SEED[i % BAR_SEED.length];
        return (
          <span
            key={i}
            className={cx("wave-bar block h-full w-[3px] rounded-full bg-current", barClassName)}
            style={{
              animationDelay: `${(i * 97) % 900}ms`,
              animationDuration: `${(0.8 + s * 0.7) / speed}s`,
              height: `${30 + s * 70}%`,
            }}
          />
        );
      })}
    </div>
  );
}

export function CountUp({
  from = 0,
  to,
  prefix = "",
  suffix = "",
  className,
}: {
  from?: number;
  to: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, VIEW);
  const reduced = useReducedMotion();
  const [v, setV] = useState(from);
  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      const id = requestAnimationFrame(() => setV(to));
      return () => cancelAnimationFrame(id);
    }
    const c = animate(from, to, { duration: 1.4, ease: EASE, onUpdate: (x) => setV(x) });
    return () => c.stop();
  }, [inView, from, to, reduced]);
  return (
    <span ref={ref} className={cx("tabular-nums", className)}>
      {prefix}
      {Math.round(v)}
      {suffix}
    </span>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  x = 0,
  scale,
  duration = 0.7,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  scale?: number;
  duration?: number;
  as?: "div" | "li" | "p" | "section" | "article";
}) {
  const C = motion[as];
  return (
    <C
      className={className}
      initial={{ opacity: 0, y, x, ...(scale != null ? { scale } : {}) }}
      whileInView={{ opacity: 1, y: 0, x: 0, ...(scale != null ? { scale: 1 } : {}) }}
      viewport={VIEW}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </C>
  );
}

export function BlurIn({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: "blur(16px)", scale: 1.04 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
      viewport={VIEW}
      transition={{ duration: 0.9, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const dark = mounted && resolvedTheme === "dark";
  return (
    <button
      type="button"
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(dark ? "light" : "dark")}
      className={cx(
        "relative grid size-10 place-items-center overflow-hidden rounded-full border border-line text-fg transition-colors hover:border-accent",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={dark ? "moon" : "sun"}
          initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          {dark ? <Moon className="size-4" /> : <Sun className="size-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export function Cursor({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });
  const [label, setLabel] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled || reduced) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = (e.target as HTMLElement | null)?.closest?.("[data-cursor], a, button");
      setHover(!!t);
      setLabel(t?.getAttribute("data-cursor") ?? null);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [enabled, reduced, x, y]);

  if (!enabled || reduced) return null;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100]"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className={cx(
          "-translate-x-1/2 -translate-y-1/2 flex items-center justify-center whitespace-nowrap rounded-full bg-accent-fill text-on-accent font-medium",
          className,
        )}
        animate={
          label
            ? { width: "auto", height: 32, paddingLeft: 14, paddingRight: 14, opacity: 1 }
            : { width: hover ? 28 : 10, height: hover ? 28 : 10, paddingLeft: 0, paddingRight: 0, opacity: hover ? 0.5 : 1 }
        }
        transition={{ duration: 0.2, ease: EASE }}
      >
        {label && <span className="text-xs">{label}</span>}
      </motion.div>
    </motion.div>
  );
}

export function Marquee({
  items,
  className,
  itemClassName,
  separator,
  duration = 40,
}: {
  items: string[];
  className?: string;
  itemClassName?: string;
  separator?: React.ReactNode;
  duration?: number;
}) {
  const row = (hidden?: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden}>
      {items.map((it) => (
        <span key={it} className="flex items-center">
          <span className={itemClassName}>{it}</span>
          {separator}
        </span>
      ))}
    </div>
  );
  return (
    <div className={cx("marquee overflow-hidden", className)}>
      <div
        className="marquee-track flex w-max motion-reduce:hidden"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {row()}
        {row(true)}
      </div>
      <div className="hidden flex-wrap gap-y-2 motion-reduce:flex">{row()}</div>
    </div>
  );
}

export function useClock(timeZone = "Asia/Kolkata") {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [timeZone]);
  return now;
}

export function CopyEmail({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <button
      type="button"
      onClick={copy}
      className={cx(
        "group inline-flex min-h-11 items-center gap-3 rounded-full border border-line px-5 text-fg transition-colors hover:border-accent",
        className,
      )}
    >
      <span>{EMAIL}</span>
      <span className="relative grid size-5 place-items-center">
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span key="ok" initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }} className="text-accent">
              <Check className="size-4" />
            </motion.span>
          ) : (
            <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="text-muted">
              <Copy className="size-4" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className="text-sm text-accent"
          >
            Copied
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

type FormState = "idle" | "sending" | "sent" | "error";

export function ContactForm({ className, fieldClassName, buttonClassName }: { className?: string; fieldClassName?: string; buttonClassName?: string }) {
  const [state, setState] = useState<FormState>("idle");
  const [need, setNeed] = useState("Build");
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") || "");
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter an email address I can reply to.");
      setState("error");
      return;
    }
    setError(null);
    setState("sending");
    setTimeout(() => setState("sent"), 1400);
  };

  const field = cx(
    "w-full min-h-11 rounded-xl border border-line bg-surface px-4 py-3 text-fg placeholder:text-muted/70 outline-none transition-colors focus:border-accent",
    fieldClassName,
  );

  if (state === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className={cx("flex flex-col items-start gap-3 rounded-2xl border border-line bg-surface p-8", className)}
      >
        <span className="grid size-10 place-items-center rounded-full bg-accent-fill text-on-accent">
          <Check className="size-5" />
        </span>
        <p className="text-lg text-fg">Thanks. Your message is sent.</p>
        <button type="button" onClick={() => setState("idle")} className="text-sm text-muted underline underline-offset-4">
          Send another
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className={cx("grid gap-4", className)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm text-muted">
          Name
          <input name="name" className={field} placeholder="Your name" autoComplete="name" />
        </label>
        <label className="grid gap-1.5 text-sm text-muted">
          Email
          <input name="email" type="email" className={field} placeholder="you@company.com" autoComplete="email" />
        </label>
      </div>
      <fieldset className="grid gap-1.5 text-sm text-muted">
        <legend className="mb-1.5">What you need</legend>
        <div className="flex flex-wrap gap-2">
          {contact.needs.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setNeed(n)}
              aria-pressed={need === n}
              className={cx(
                "relative min-h-11 rounded-full border px-4 text-sm transition-colors",
                need === n ? "border-transparent text-on-accent" : "border-line text-fg hover:border-accent",
              )}
            >
              {need === n && (
                <motion.span layoutId="need-pill" className="absolute inset-0 rounded-full bg-accent-fill" transition={{ duration: 0.3, ease: EASE }} />
              )}
              <span className="relative">{n}</span>
            </button>
          ))}
        </div>
      </fieldset>
      <label className="grid gap-1.5 text-sm text-muted">
        Message
        <textarea name="message" rows={4} className={cx(field, "resize-none")} placeholder="What does the workflow look like today?" />
      </label>
      <label className="grid gap-1.5 text-sm text-muted">
        Link (optional)
        <input name="link" className={field} placeholder="Your site or a doc" />
      </label>
      <input name="company" className="hidden" tabIndex={-1} autoComplete="off" />
      {state === "error" && error && (
        <p className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400" role="alert">
          <AlertCircle className="size-4" /> {error}
        </p>
      )}
      <button
        type="submit"
        disabled={state === "sending"}
        className={cx(
          "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent-fill px-6 font-medium text-on-accent transition-transform hover:-translate-y-0.5 disabled:opacity-70",
          buttonClassName,
        )}
      >
        {state === "sending" ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Sending
          </>
        ) : state === "error" ? (
          "Try again"
        ) : (
          "Send"
        )}
      </button>
    </form>
  );
}

export function FooterWordmark({ text, className }: { text: string; className?: string }) {
  return (
    <motion.div
      className={cx("flex overflow-hidden leading-[0.8]", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      aria-label={text}
    >
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          variants={{
            hidden: { y: "100%" },
            show: { y: "0%", transition: { duration: 0.9, ease: EASE, delay: i * 0.04 } },
          }}
        >
          {ch === " " ? "\u00a0" : ch}
        </motion.span>
      ))}
    </motion.div>
  );
}

export function useMediaQuery(q: string) {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(q);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(q).matches,
    () => false,
  );
}

export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}
