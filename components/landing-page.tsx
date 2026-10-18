"use client";

import { createContext, useContext, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  Gauge,
  Globe,
  Menu,
  Play,
  Terminal,
  Workflow,
  X,
} from "lucide-react";
import {
  NAME,
  about,
  builds,
  cases,
  contact,
  hero,
  nav,
  projects,
  services,
  socials,
  stack,
  steps,
} from "@/lib/content";
import { SIGNAL, type SignalRhythm, type SignalVariant } from "@/lib/signal";
import {
  BlurIn,
  ContactForm,
  CopyEmail,
  CountUp,
  Cursor,
  EASE,
  FooterWordmark,
  Marquee,
  MaskLines,
  Reveal,
  RotatingWord,
  ThemeToggle,
  Waveform,
  cx,
  useClock,
} from "./motion-kit";
import { DemoCall } from "./demo-call";
import { CaseVisual } from "./case-visual";

const BUILD_ICONS = [AudioLines, Workflow, Globe, Gauge];
const RhythmCtx = createContext<SignalRhythm>(SIGNAL.a);
function useRhythm() {
  return useContext(RhythmCtx);
}

function Label({ n, children }: { n: string; children: React.ReactNode }) {
  const r = useRhythm();
  return (
    <p className={cx("flex items-center gap-3 font-geist-mono text-xs uppercase tracking-[0.14em] text-muted", r.labelMb)}>
      <span className="text-accent">{n}</span>
      <span className="h-px w-8 bg-line" />
      {children}
    </p>
  );
}

function H2({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={cx("max-w-3xl text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-fg", className)}>
      {children}
    </h2>
  );
}

function SoftReveal({
  children,
  className,
  delay = 0,
  as = "div",
  y,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "p" | "section" | "article";
  y?: number;
}) {
  const r = useRhythm();
  return (
    <Reveal
      as={as}
      className={className}
      delay={delay}
      y={y ?? r.revealY}
      x={r.revealX}
      scale={r.revealScale}
      duration={r.duration}
    >
      {children}
    </Reveal>
  );
}

function SoftMask({ lines, delay = 0, inView = false }: { lines: React.ReactNode[]; delay?: number; inView?: boolean }) {
  const r = useRhythm();
  return (
    <MaskLines
      lines={lines}
      delay={delay}
      inView={inView}
      stagger={r.maskStagger}
      duration={r.maskDuration}
      from={r.maskFrom}
    />
  );
}

function Nav() {
  const { scrollY, scrollYProgress } = useScroll();
  const [floating, setFloating] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setFloating(v > 40));
  const r = useRhythm();

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 sm:px-6">
      <motion.div style={{ scaleX: scrollYProgress }} className="fixed inset-x-0 top-0 z-10 h-[2px] origin-left bg-accent-fill" />
      <motion.div
        layout
        transition={{ duration: r.id === "a2" ? 0.25 : r.id === "a3" ? 0.6 : 0.45, ease: EASE }}
        style={{ borderRadius: floating ? 999 : 0 }}
        className={cx(
          "mx-auto flex h-14 items-center justify-between",
          floating
            ? "mt-2 max-w-3xl border border-line bg-surface/75 pl-5 pr-2 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.25)] backdrop-blur-md"
            : "max-w-7xl border-b border-line bg-bg/0 px-1",
        )}
      >
        <motion.a layout="position" href="#top" className="flex items-center gap-2 font-semibold tracking-tight text-fg">
          <span className="grid size-6 place-items-center rounded-md bg-accent-fill text-on-accent">
            {r.id === "a2" ? <Terminal className="size-3.5" /> : <AudioLines className="size-3.5" />}
          </span>
          {NAME}
        </motion.a>
        <motion.nav layout="position" className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="rounded-full px-3 py-2 text-sm text-muted transition-colors hover:text-fg">
              {n.label}
            </a>
          ))}
        </motion.nav>
        <motion.div layout="position" className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#contact"
            className="hidden min-h-10 items-center rounded-full bg-fg px-4 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Start a project
          </a>
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="grid size-10 place-items-center rounded-full border border-line text-fg md:hidden"
          >
            <Menu className="size-4" />
          </button>
        </motion.div>
      </motion.div>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 bg-bg/95 backdrop-blur-md md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex h-16 items-center justify-between px-4">
              <span className="font-semibold text-fg">{NAME}</span>
              <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="grid size-11 place-items-center rounded-full border border-line text-fg">
                <X className="size-4" />
              </button>
            </div>
            <nav className="flex flex-col gap-1 px-4 pt-6">
              {[...nav, { id: "contact", label: "Start a project" }].map((n, i) => (
                <motion.a
                  key={n.label}
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * r.stagger, duration: r.duration, ease: EASE }}
                  className="border-b border-line py-4 text-3xl font-semibold tracking-tight text-fg"
                >
                  {n.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function HeroA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, SIGNAL.a.scrollDrift]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative flex min-h-[100svh] items-end overflow-hidden pb-14 pt-32 sm:pb-20">
      <div className="dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div className="pointer-events-none absolute -right-40 -top-40 size-[640px] rounded-full blur-3xl" style={{ background: "radial-gradient(circle, var(--glow), transparent 65%)" }} />
      <Waveform bars={72} className="pointer-events-none absolute inset-x-0 bottom-[18%] h-56 justify-between px-4 text-accent opacity-[0.14]" speed={0.5} />

      <motion.div style={{ y, opacity }} className="relative mx-auto w-full max-w-7xl px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 px-3 py-1.5 font-geist-mono text-xs text-fg backdrop-blur"
        >
          <span className="relative flex size-2">
            <span className="pulse-dot relative inline-flex size-2 rounded-full bg-accent-fill" />
          </span>
          {hero.chip}
        </motion.p>

        <h1 className="text-[clamp(3.1rem,10.5vw,9.75rem)] font-semibold leading-[0.9] tracking-[-0.055em] text-fg">
          <SoftMask
            delay={0.1}
            lines={[
              hero.headline[0],
              hero.headline[1],
              <>
                the{" "}
                <span className="rounded-[0.12em] bg-accent-fill px-[0.1em] text-on-accent">phone.</span>
              </>,
            ]}
          />
        </h1>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.45 }}>
            <p className="max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{hero.sub}</p>
            <p className="mt-3 font-geist-mono text-sm text-fg">
              <span className="text-muted">Built, shipped, run: </span>
              <RotatingWord words={hero.rotating} className="text-accent" />
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
            className="flex flex-wrap gap-3 lg:justify-end"
          >
            <a
              href="#demo"
              data-cursor="Play"
              className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-accent-fill px-6 font-medium text-on-accent transition-transform hover:-translate-y-0.5"
            >
              <Play className="size-4 fill-current transition-transform group-hover:scale-110" /> Hear the demo
            </a>
            <a
              href="#contact"
              className="group inline-flex min-h-12 items-center gap-2 rounded-full border border-line bg-surface/60 px-6 font-medium text-fg backdrop-blur transition-colors hover:border-accent"
            >
              Start a project <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-14 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-5 font-geist-mono text-xs uppercase tracking-[0.14em] text-muted"
        >
          {hero.facts.map((f, i) => (
            <li key={f} className="flex items-center gap-4 sm:gap-6">
              {i > 0 && <span className="size-1 rounded-full bg-accent-fill" />}
              {f}
            </li>
          ))}
          <li className="ml-auto hidden sm:block">Scroll ↓</li>
        </motion.ul>
      </motion.div>
    </section>
  );
}

function Hero() { return <HeroA />; }

function Demo() {
  const r = useRhythm();
  return (
    <section id="demo" className={cx("mx-auto max-w-7xl scroll-mt-20 px-4 sm:px-6", r.sectionLoose)}>
      <div className={cx("grid lg:grid-cols-[1fr_1.35fr]", r.id === "a2" ? "gap-8" : r.id === "a3" ? "gap-16 lg:gap-24" : "gap-12 lg:gap-16")}>
        <div className="lg:pt-6">
          <Label n="01">Demo</Label>
          <H2>
            <SoftMask inView lines={["Hear it book", "an appointment."]} />
          </H2>
          <SoftReveal delay={0.1}>
            <p className={cx("max-w-md leading-relaxed text-muted", r.id === "a3" ? "mt-8 text-xl" : "mt-6 text-lg")}>
              A scripted call to a clinic front desk. The agent checks the calendar mid-call, books the slot and texts a confirmation. Switch the language and it runs again.
            </p>
          </SoftReveal>
          <ul className={cx("grid gap-3 font-geist-mono text-sm text-fg", r.id === "a3" ? "mt-10" : "mt-8")}>
            {["Reads the calendar while talking", "Books and confirms by SMS", "Writes a summary when the call ends"].map((t, i) => (
              <SoftReveal as="li" key={t} delay={0.15 + i * r.stagger} className="flex items-center gap-3">
                <span className="size-1.5 rounded-full bg-accent-fill" /> {t}
              </SoftReveal>
            ))}
          </ul>
        </div>
        <SoftReveal y={r.id === "a2" ? 0 : 40}>
          <DemoCall variant="a" />
        </SoftReveal>
      </div>
    </section>
  );
}

function Builds() {
  const r = useRhythm();
  return (
    <section className={cx("mx-auto max-w-7xl px-4 sm:px-6", r.section)}>
      <Label n="02">What I build</Label>
      <H2>
        <SoftMask inView lines={["Four things,", "done properly."]} />
      </H2>
      <div className={cx("grid sm:grid-cols-2 lg:grid-cols-4", r.blockGap, r.cardGap)}>
        {builds.map((b, i) => {
          const Icon = BUILD_ICONS[i];
          return (
            <SoftReveal key={b.title} delay={i * r.stagger}>
              <article
                className={cx(
                  "group flex h-full flex-col border border-line bg-surface transition-[transform,border-color,box-shadow,background-color] duration-200",
                  r.id === "a2" ? "rounded-md p-4" : r.id === "a3" ? "rounded-2xl p-8" : "rounded-[14px] p-6",
                  r.cardHover,
                )}
              >
                <span
                  className={cx(
                    "mb-10 grid place-items-center bg-accent-fill text-on-accent transition-transform duration-300",
                    r.id === "a2" ? "mb-6 size-9 rounded-md" : r.id === "a3" ? "mb-12 size-14 rounded-2xl" : "size-11 rounded-xl",
                    r.buildIconHover,
                  )}
                >
                  <Icon className={r.id === "a3" ? "size-6" : "size-5"} />
                </span>
                <h3 className={cx("font-semibold tracking-tight text-fg", r.id === "a3" ? "text-2xl" : "text-xl")}>{b.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{b.what}</p>
                <p className="mt-auto border-t border-dashed border-line pt-4 font-geist-mono text-xs leading-relaxed text-fg">
                  <span className="text-accent">→ </span>
                  {b.get}
                </p>
              </article>
            </SoftReveal>
          );
        })}
      </div>
    </section>
  );
}

function Work() {
  const r = useRhythm();
  return (
    <section id="work" className={cx("mx-auto max-w-7xl scroll-mt-20 px-4 sm:px-6", r.section)}>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Label n="03">Selected work</Label>
          <H2>
            <SoftMask inView lines={["Shipped to production,", "measured after."]} />
          </H2>
        </div>
        <p className="max-w-xs text-sm text-muted">Client names are replaced with what the client does.</p>
      </div>
      <div className={cx("grid md:grid-cols-2", r.blockGap, r.id === "a2" ? "gap-3" : r.id === "a3" ? "gap-8" : "gap-5")}>
        {cases.map((c, i) => (
          <SoftReveal key={c.title} delay={(i % 2) * r.stagger}>
            <article
              data-cursor="Open"
              className={cx(
                "group relative overflow-hidden border border-line bg-surface",
                r.id === "a2" ? "rounded-md" : r.id === "a3" ? "rounded-2xl" : "rounded-[10px]",
              )}
            >
              <div className="relative aspect-[16/10] overflow-hidden border-b border-line">
                <BlurIn className="h-full">
                  <div className={cx("h-full transition-transform ease-out", r.workZoom)}>
                    <CaseVisual kind={c.visual} />
                  </div>
                </BlurIn>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-40" />
                <p className="pointer-events-none absolute bottom-2 left-4 translate-y-2 text-sm font-medium tracking-wide text-white opacity-0 transition-all duration-500 group-hover:-translate-y-1 group-hover:opacity-100">
                  {c.descriptor} · {c.stack.join(", ")}
                </p>
              </div>
              <div className={r.id === "a3" ? "p-7 sm:p-8" : r.id === "a2" ? "p-4" : "p-5 sm:p-6"}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-geist-mono text-xs uppercase tracking-[0.12em] text-muted">{c.descriptor}</p>
                    <h3 className="mt-1.5 text-xl font-semibold tracking-tight text-fg sm:text-2xl">{c.title}</h3>
                  </div>
                  <div className="shrink-0 text-right">
                    <CountUp from={c.metric.from} to={c.metric.to} suffix={c.metric.suffix} className="text-3xl font-semibold tracking-tight text-accent sm:text-4xl" />
                    <p className="font-geist-mono text-[11px] text-muted">{c.metric.label}</p>
                  </div>
                </div>
                <dl className="mt-5 grid gap-3 text-[15px] leading-relaxed">
                  {[
                    ["Context", c.context],
                    ["Built", c.built],
                    ["Result", c.result],
                  ].map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[72px_1fr] gap-3">
                      <dt className="pt-0.5 font-geist-mono text-xs uppercase tracking-wider text-muted">{k}</dt>
                      <dd className={k === "Result" ? "text-fg" : "text-muted"}>{v}</dd>
                    </div>
                  ))}
                </dl>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {c.stack.map((s) => (
                    <li key={s} className="rounded-md border border-line px-2 py-1 font-geist-mono text-[11px] text-muted">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </SoftReveal>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  const r = useRhythm();
  return (
    <section className={cx("mx-auto max-w-7xl px-4 sm:px-6", r.section)}>
      <Label n="04">Own projects</Label>
      <H2>
        <SoftMask inView lines={["Things I build", "on my own time."]} />
      </H2>
      <ul className={cx("border-t border-line", r.blockGap)}>
        {projects.map((p, i) => (
          <SoftReveal as="li" key={p.name} delay={i * r.stagger} y={r.id === "a2" ? 0 : 16}>
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              data-cursor="Open"
              className={cx(
                "group grid gap-2 border-b border-line transition-colors hover:bg-surface sm:grid-cols-[260px_1fr_auto] sm:items-center sm:gap-8 sm:px-4",
                r.id === "a2" ? "py-4" : r.id === "a3" ? "py-8" : "py-6",
              )}
            >
              <span className="text-xl font-semibold tracking-tight text-fg">{p.name}</span>
              <span>
                <span className="block text-muted">{p.line}</span>
                <span className="mt-1 block font-geist-mono text-xs text-accent transition-all duration-300 sm:translate-y-1 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                  $ {p.meta}
                </span>
              </span>
              <ArrowUpRight className="hidden size-5 text-muted transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-fg sm:block" />
            </a>
          </SoftReveal>
        ))}
      </ul>
    </section>
  );
}

function Services() {
  const r = useRhythm();
  return (
    <section id="services" className={cx("mx-auto max-w-7xl scroll-mt-20 px-4 sm:px-6", r.section)}>
      <Label n="05">Services</Label>
      <H2>
        <SoftMask inView lines={["Hire me for one step,", "or all three."]} />
      </H2>
      <div className={cx("grid lg:grid-cols-3", r.blockGap, r.cardGap)}>
        {services.map((s, i) => (
          <SoftReveal key={s.name} delay={i * r.stagger}>
            <article
              className={cx(
                "group flex h-full flex-col border border-line bg-surface transition-[transform,box-shadow,background-color,border-color] duration-300",
                r.id === "a2" ? "rounded-md p-5" : r.id === "a3" ? "rounded-2xl p-9" : "rounded-[14px] p-7",
                r.serviceHover,
              )}
            >
              <div className="flex items-baseline justify-between">
                <h3 className={cx("text-4xl font-semibold tracking-[-0.04em] text-fg", r.id !== "a2" && "group-hover:text-on-accent")}>{s.name}</h3>
                <span className={cx("font-geist-mono text-xs text-muted", r.id !== "a2" && "group-hover:text-on-accent/70")}>0{i + 1}</span>
              </div>
              <p className={cx("mt-3 text-lg leading-snug text-fg", r.id !== "a2" && "group-hover:text-on-accent")}>{s.line}</p>
              <ul className={cx("mt-6 grid gap-2 border-t border-line pt-5 text-[15px] text-muted", r.id !== "a2" && "group-hover:border-on-accent/20 group-hover:text-on-accent/80")}>
                {s.included.map((x) => (
                  <li key={x} className="flex gap-2">
                    <span className={cx("text-accent", r.id !== "a2" && "group-hover:text-on-accent")}>+</span> {x}
                  </li>
                ))}
              </ul>
              <div className="mt-auto grid gap-3 pt-8 text-sm">
                <p className={cx("text-fg", r.id !== "a2" && "group-hover:text-on-accent")}>
                  <span className={cx("font-geist-mono text-xs uppercase tracking-wider text-muted", r.id !== "a2" && "group-hover:text-on-accent/60")}>You get · </span>
                  {s.get}
                </p>
                <p className={cx("text-fg", r.id !== "a2" && "group-hover:text-on-accent")}>
                  <span className={cx("font-geist-mono text-xs uppercase tracking-wider text-muted", r.id !== "a2" && "group-hover:text-on-accent/60")}>First step · </span>
                  {s.first}
                </p>
              </div>
            </article>
          </SoftReveal>
        ))}
      </div>
    </section>
  );
}

function Process() {
  const r = useRhythm();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const [reached, setReached] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setReached(Math.floor(v * steps.length + 0.15)));

  return (
    <section className={cx("mx-auto max-w-7xl px-4 sm:px-6", r.section)}>
      <Label n="06">How I work</Label>
      <H2>
        <SoftMask inView lines={["From your workflow", "to a running system."]} />
      </H2>
      <div ref={ref} className={cx("relative", r.id === "a3" ? "mt-20" : r.id === "a2" ? "mt-8" : "mt-14")}>
        <div className="absolute left-[19px] top-0 h-full w-px bg-line lg:left-0 lg:top-[19px] lg:h-px lg:w-full" />
        <motion.div style={{ scaleY: scrollYProgress }} className="absolute left-[19px] top-0 h-full w-px origin-top bg-accent-fill lg:hidden" />
        <motion.div style={{ scaleX: scrollYProgress }} className="absolute left-0 top-[19px] hidden h-px w-full origin-left bg-accent-fill lg:block" />
        <ol className={cx("relative grid lg:grid-cols-4", r.id === "a2" ? "gap-6 lg:gap-4" : "gap-10 lg:gap-6")}>
          {steps.map((s, i) => {
            const on = reached > i;
            return (
              <li key={s.title} className="grid grid-cols-[40px_1fr] gap-4 lg:grid-cols-1">
                <span
                  className={cx(
                    "grid size-10 place-items-center rounded-full border font-geist-mono text-sm transition-colors duration-300",
                    on ? "border-transparent bg-accent-fill text-on-accent" : "border-line bg-bg text-muted",
                  )}
                >
                  0{i + 1}
                </span>
                <div className="lg:pr-6">
                  <h3 className={cx("text-xl font-semibold tracking-tight transition-colors", on ? "text-fg" : "text-muted")}>{s.title}</h3>
                  <p className="mt-2 text-muted">{s.line}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function Stack() {
  const r = useRhythm();
  return (
    <section className={cx("border-y border-line", r.id === "a2" ? "py-6" : r.id === "a3" ? "py-14" : "py-10")}>
      <p className="mx-auto mb-6 max-w-7xl px-4 font-geist-mono text-xs uppercase tracking-[0.14em] text-muted sm:px-6">
        <span className="text-accent">07</span> · Stack I ship with
      </p>
      <Marquee
        items={stack}
        duration={r.id === "a2" ? 28 : r.id === "a3" ? 48 : 36}
        className="px-4 sm:px-0"
        itemClassName="text-[clamp(1.8rem,4vw,3.25rem)] font-semibold tracking-[-0.04em] text-fg"
        separator={<span className="mx-8 font-geist-mono text-2xl text-accent">/</span>}
      />
    </section>
  );
}

function About() {
  const r = useRhythm();
  return (
    <section className={cx("mx-auto max-w-7xl px-4 sm:px-6", r.sectionLoose)}>
      <div className={cx("grid lg:grid-cols-[0.8fr_1.2fr]", r.id === "a2" ? "gap-8 lg:gap-12" : r.id === "a3" ? "gap-16 lg:gap-28" : "gap-12 lg:gap-20")}>
        <BlurIn className={cx("relative aspect-[4/5] overflow-hidden border border-line bg-surface", r.id === "a2" ? "rounded-md" : r.id === "a3" ? "rounded-3xl" : "rounded-[14px]")}>
          <div className="dot-grid absolute inset-0" />
          <div className="absolute inset-0 grid place-items-center font-geist-mono text-sm text-muted">[PHOTO]</div>
          <p className="absolute bottom-4 left-4 rounded-full border border-line bg-surface px-3 py-1 font-geist-mono text-xs text-fg">Remote, Available</p>
        </BlurIn>
        <div>
          <Label n="08">About</Label>
          <p className="mb-8 font-geist-mono text-sm text-muted">
            <span className="text-accent">$</span> whoami
          </p>
          <div className="grid gap-5 text-[clamp(1.15rem,1.8vw,1.5rem)] leading-snug tracking-[-0.01em] text-fg">
            {about.map((p, i) => (
              <SoftReveal as="p" key={i} delay={i * r.stagger} className={i === 0 ? "" : "text-muted"}>
                {p}
              </SoftReveal>
            ))}
          </div>
          <dl className={cx("mt-10 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line font-geist-mono text-sm", r.id === "a2" ? "rounded-md" : "rounded-[14px]")}>
            {[
              ["Role", "Forward deployed engineer"],
              ["Availability", "Remote"],
              ["Education", "BTech CS, VIT, 2025"],
              ["Focus", "Voice agents, LLM evals"],
            ].map(([k, v]) => (
              <div key={k} className="bg-surface p-4">
                <dt className="text-xs uppercase tracking-wider text-muted">{k}</dt>
                <dd className="mt-1 text-fg">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const r = useRhythm();
  return (
    <section id="contact" className={cx("mx-auto max-w-7xl scroll-mt-20 px-4 sm:px-6", r.section)}>
      <Label n="09">Contact</Label>
      <h2 className="text-[clamp(2.6rem,7.5vw,7rem)] font-semibold leading-[0.92] tracking-[-0.055em] text-fg">
        <SoftMask inView lines={contact.headline} />
      </h2>
      <div className={cx("grid lg:grid-cols-[1fr_1.2fr]", r.blockGap, r.id === "a3" ? "gap-14" : "gap-10")}>
        <div>
          <p className="max-w-sm text-lg text-muted">Tell me what the workflow looks like today and where it gets stuck.</p>
          <CopyEmail className="mt-6 font-geist-mono text-sm" />
        </div>
        <SoftReveal className={cx("border border-line bg-surface", r.id === "a2" ? "rounded-md p-4 sm:p-5" : "rounded-2xl p-5 sm:p-7")}>
          <ContactForm />
        </SoftReveal>
      </div>
    </section>
  );
}

function Footer() {
  const time = useClock();
  const r = useRhythm();
  return (
    <footer className={cx("overflow-hidden border-t border-line px-4 pb-6 sm:px-6", r.id === "a2" ? "pt-10" : "pt-16")}>
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-6 font-geist-mono text-sm text-muted">
          <ul className="flex gap-6">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-fg">
                  {s.label} ↗
                </a>
              </li>
            ))}
          </ul>
          <p className="flex items-center gap-2">
            <span className="relative flex size-2">
              <span className="pulse-dot relative inline-flex size-2 rounded-full bg-accent-fill" />
            </span>
            Local Time <span className="tabular-nums text-fg">{time ?? "--:--:--"}</span>
          </p>
          <a href="#top" className="transition-colors hover:text-fg">
            Back to top ↑
          </a>
        </div>
        <FooterWordmark text={NAME} className="mt-10 text-[clamp(4rem,19vw,17rem)] font-semibold tracking-[-0.06em] text-fg" />
      </div>
    </footer>
  );
}

function SignalShell() {
  const r = SIGNAL.a;
  return (
    <RhythmCtx.Provider value={r}>
      <div className="dir-a min-h-screen bg-bg font-geist text-fg selection:bg-accent-fill selection:text-on-accent">
        <Cursor />
        <Nav />
        <main>
          <Hero />
          <Demo />
          <Builds />
          <Work />
          <Projects />
          <Services />
          <Process />
          <Stack />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </RhythmCtx.Provider>
  );
}

export function LandingPage() {
  return <SignalShell />;
}


