"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowRight, ArrowUpRight, AudioLines, Gauge, Globe, Menu, Play, Workflow, X, Check } from "lucide-react";
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
  useActiveSection,
  useClock,
  useMediaQuery,
} from "./motion-kit";
import { DemoCall } from "./demo-call";
import { CaseVisual } from "./case-visual";

const BUILD_ICONS = [AudioLines, Workflow, Globe, Gauge];
const NAV_IDS = nav.map((n) => n.id);

const Serif = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <em className={cx("font-serif font-normal italic tracking-[-0.01em]", className)}>{children}</em>
);

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-6 flex items-center gap-2 text-sm font-medium text-accent">
      <span className="size-1.5 rounded-full bg-accent" />
      {children}
    </p>
  );
}

function H2({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={cx("font-tight text-[clamp(2.2rem,4.6vw,3.9rem)] font-medium leading-[1.02] tracking-[-0.035em] text-fg", className)}>
      {children}
    </h2>
  );
}

function Nav() {
  const { scrollY, scrollYProgress } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(NAV_IDS);

  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(v > prev && v > 160);
  });

  return (
    <>
      <motion.div style={{ scaleX: scrollYProgress }} className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent" />
      <motion.header
        animate={{ y: hidden && !open ? "-110%" : "0%" }}
        transition={{ duration: 0.4, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
          <a href="#top" className="font-tight text-lg font-semibold tracking-tight text-fg">
            {NAME}
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} className={cx("relative py-2 text-sm transition-colors", active === n.id ? "text-fg" : "text-muted hover:text-fg")}>
                {n.label}
                {active === n.id && (
                  <motion.span layoutId="nav-underline" className="absolute inset-x-0 -bottom-0.5 h-[2px] rounded-full bg-accent" transition={{ duration: 0.35, ease: EASE }} />
                )}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a
              href="#contact"
              className="hidden min-h-10 items-center gap-2 rounded-full bg-accent-fill px-5 text-sm font-medium text-on-accent transition-transform hover:-translate-y-0.5 sm:inline-flex"
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
          </div>
        </div>
      </motion.header>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[70] bg-black/40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed inset-x-0 bottom-0 z-[80] rounded-t-[28px] border-t border-line bg-surface p-6 pb-10 md:hidden"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <div className="mx-auto mb-6 h-1 w-10 rounded-full bg-line" />
              <div className="mb-4 flex items-center justify-between">
                <span className="font-tight font-semibold text-fg">{NAME}</span>
                <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="grid size-11 place-items-center rounded-full border border-line text-fg">
                  <X className="size-4" />
                </button>
              </div>
              <nav className="flex flex-col">
                {nav.map((n) => (
                  <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} className="border-b border-line py-4 font-tight text-2xl font-medium text-fg">
                    {n.label}
                  </a>
                ))}
              </nav>
              <a href="#contact" onClick={() => setOpen(false)} className="mt-6 flex min-h-12 items-center justify-center rounded-full bg-accent-fill font-medium text-on-accent">
                Start a project
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function ColumnLines() {
  return (
    <div className="pointer-events-none absolute inset-0 mx-auto grid max-w-7xl grid-cols-4 px-4 sm:px-8 lg:grid-cols-6" aria-hidden>
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.span
          key={i}
          className={cx("h-full border-l border-line", i >= 4 && "hidden lg:block")}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          style={{ transformOrigin: "top" }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.1 + i * 0.08 }}
        />
      ))}
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const yPhoto = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const yCard = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative overflow-hidden pb-20 pt-28 sm:pt-36 lg:min-h-[100svh] lg:pb-24">
      <ColumnLines />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-10">
        <motion.div style={{ y: yText, opacity }} className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm text-fg"
          >
            <span className="relative flex size-2">
              <span className="pulse-dot relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {hero.chip}
          </motion.p>
          <h1 className="font-tight text-[clamp(2.9rem,7vw,6.4rem)] font-medium leading-[0.98] tracking-[-0.045em] text-fg">
            <MaskLines
              delay={0.15}
              stagger={0.07}
              lines={[hero.headline[0], hero.headline[1], <Serif key="s" className="text-accent">the phone.</Serif>]}
            />
          </h1>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted sm:text-xl">{hero.sub}</p>
            <p className="mt-2 text-lg text-fg sm:text-xl">
              Built, shipped and run: <Serif className="text-accent"><RotatingWord words={hero.rotating} /></Serif>
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.6 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <a
              href="#demo"
              data-cursor="Play"
              className="group inline-flex min-h-12 items-center gap-3 rounded-full bg-accent-fill py-1.5 pl-1.5 pr-6 font-medium text-on-accent transition-transform hover:-translate-y-0.5"
            >
              <span className="grid size-9 place-items-center rounded-full bg-on-accent/15 transition-transform group-hover:scale-110">
                <Play className="size-3.5 fill-current" />
              </span>
              Hear the demo
            </a>
            <a href="#contact" className="group inline-flex min-h-12 items-center gap-2 rounded-full border border-line bg-surface px-6 font-medium text-fg transition-colors hover:border-accent">
              Start a project <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 flex flex-wrap gap-x-3 gap-y-2 text-sm text-muted"
          >
            {hero.facts.map((f, i) => (
              <li key={f} className="flex items-center gap-3">
                {i > 0 && <span className="text-line">·</span>}
                {f}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <div className="relative lg:col-span-5">
          <motion.div style={{ y: yPhoto }}>
            <BlurIn className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[28px] border border-line bg-surface">
              <div className="absolute inset-0" style={{ background: "radial-gradient(120% 80% at 70% 10%, var(--glow), transparent 60%)" }} />
              <div className="absolute inset-0 grid place-items-center text-sm text-muted">[PHOTO]</div>
            </BlurIn>
          </motion.div>
          <motion.div
            style={{ y: yCard }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.9 }}
            className="absolute -bottom-6 left-0 w-[290px] rounded-2xl border border-line bg-surface/90 p-4 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.3)] backdrop-blur sm:left-4 lg:-left-10"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-8 place-items-center rounded-full bg-accent-fill text-xs font-semibold text-on-accent">AI</span>
              <div>
                <p className="text-sm font-medium text-fg">Agent on a call</p>
                <p className="text-xs text-muted">Clinic front desk · 0:31</p>
              </div>
              <Waveform bars={8} className="ml-auto h-5 text-accent" />
            </div>
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6, duration: 0.4, ease: EASE }}
              className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-accent/30 px-2.5 py-1 text-xs text-fg"
            >
              <Check className="size-3 text-accent" /> Booked Tue 4:30 PM
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Demo() {
  return (
    <section id="demo" className="scroll-mt-16 border-t border-line bg-surface/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Kicker>
            <span className="mx-auto">Scripted demo</span>
          </Kicker>
          <H2>
            <MaskLines inView lines={[<>Listen to it <Serif>book</Serif></>, "an appointment."]} />
          </H2>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              A call to a clinic front desk. The agent checks the calendar, books the slot and texts a confirmation. Pick a language and it runs again.
            </p>
          </Reveal>
        </div>
        <Reveal y={40} className="mx-auto mt-14 max-w-3xl">
          <DemoCall variant="b" />
        </Reveal>
      </div>
    </section>
  );
}

function Builds() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-8 sm:py-32">
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Kicker>What I build</Kicker>
          <H2>
            <MaskLines inView lines={["Four kinds of work.", <Serif key="s">Each one shipped.</Serif>]} />
          </H2>
        </div>
      </div>
      <div className="mt-14 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
        {builds.map((b, i) => {
          const Icon = BUILD_ICONS[i];
          return (
            <Reveal key={b.title} delay={i * 0.08} y={30} className="border-b border-line sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:last:border-r-0">
              <article className="group relative h-full p-6 transition-transform duration-200 hover:-translate-y-1 lg:p-8">
                <span className="absolute inset-x-0 -top-px h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
                <div className="flex items-center justify-between">
                  <span className="font-jb text-xs text-muted">0{i + 1}</span>
                  <Icon className="size-5 text-accent transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-125" />
                </div>
                <h3 className="mt-12 font-tight text-2xl font-medium tracking-tight text-fg">{b.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{b.what}</p>
                <p className="mt-6 text-sm leading-relaxed text-fg">
                  <Serif className="text-base text-accent">You get </Serif>
                  {b.get}
                </p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function Work() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "end 60%"] });
  const [current, setCurrent] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setCurrent(Math.min(cases.length - 1, Math.max(0, Math.floor(v * cases.length)))));

  return (
    <section id="work" className="scroll-mt-16 border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-8 sm:py-32 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Kicker>Selected work</Kicker>
            <H2 className="lg:text-[clamp(2rem,3.4vw,3rem)]">
              <MaskLines inView lines={["Production work,", <Serif key="s">with the numbers.</Serif>]} />
            </H2>
            <p className="mt-6 max-w-xs text-muted">Client names are replaced with what the client does.</p>
            <div className="mt-10 hidden items-baseline gap-2 font-tight lg:flex">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={current}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="text-5xl font-medium tabular-nums tracking-tight text-fg"
                >
                  0{current + 1}
                </motion.span>
              </AnimatePresence>
              <span className="text-muted">/ 0{cases.length}</span>
            </div>
            <ul className="mt-4 hidden gap-1 lg:grid">
              {cases.map((c, i) => (
                <li key={c.title} className={cx("text-sm transition-colors", i === current ? "text-fg" : "text-muted/60")}>
                  {c.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div ref={ref} className="relative lg:col-span-8">
          <div className="absolute bottom-0 left-0 top-0 w-px bg-line" />
          <motion.div style={{ scaleY: scrollYProgress }} className="absolute bottom-0 left-0 top-0 w-px origin-top bg-accent" />
          <div className="grid gap-20 pl-6 sm:pl-10">
            {cases.map((c) => (
              <article key={c.title} data-cursor="Open" className="group">
                <BlurIn className="overflow-hidden rounded-2xl border border-line">
                  <div className="aspect-[16/9] transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                    <CaseVisual kind={c.visual} />
                  </div>
                </BlurIn>
                <Reveal className="mt-7">
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <p className="text-sm text-accent">{c.descriptor}</p>
                      <h3 className="mt-1 font-tight text-2xl font-medium tracking-tight text-fg sm:text-3xl">{c.title}</h3>
                    </div>
                    <div className="text-right">
                      <CountUp from={c.metric.from} to={c.metric.to} suffix={c.metric.suffix} className="font-tight text-5xl font-medium tracking-[-0.04em] text-fg" />
                      <p className="text-xs text-muted">{c.metric.label}</p>
                    </div>
                  </div>
                  <dl className="mt-6 grid gap-6 border-t border-line pt-6 sm:grid-cols-3">
                    {[
                      ["Context", c.context],
                      ["What I built", c.built],
                      ["Result", c.result],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <dt className="font-serif text-lg italic text-accent">{k}</dt>
                        <dd className={cx("mt-1 leading-relaxed", k === "Result" ? "text-fg" : "text-muted")}>{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {c.stack.map((s) => (
                      <li key={s} className="rounded-full bg-fg/5 px-3 py-1 text-xs text-muted">
                        {s}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="border-t border-line bg-surface/50">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-8 sm:py-32">
        <Kicker>Own projects</Kicker>
        <H2>
          <MaskLines inView lines={[<>Built on <Serif>my own time.</Serif></>]} />
        </H2>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={(i % 2) * 0.08}>
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="Open"
                className="group flex h-full flex-col rounded-[20px] border border-line bg-bg p-6 transition-colors hover:border-accent sm:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-tight text-2xl font-medium tracking-tight text-fg">{p.name}</h3>
                  <ArrowUpRight className="size-5 shrink-0 text-muted transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
                </div>
                <p className="mt-3 text-muted">{p.line}</p>
                <p className="mt-auto pt-6 font-jb text-xs text-accent transition-all duration-300 md:translate-y-1 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
                  {p.meta}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ s, i, progress, pinned }: { s: (typeof services)[number]; i: number; progress: MotionValue<number>; pinned: boolean }) {
  const n = services.length;
  const scale = useTransform(progress, [i / n, 1], [1, 1 - (n - 1 - i) * 0.05]);
  return (
    <div className={cx(pinned && "sticky")} style={pinned ? { top: `${110 + i * 28}px` } : undefined}>
      <motion.article
        style={pinned ? { scale, transformOrigin: "top center" } : undefined}
        className="grid gap-8 rounded-[28px] border border-line bg-surface p-7 shadow-[0_-20px_60px_-40px_rgba(0,0,0,0.35)] sm:p-10 lg:min-h-[340px] lg:grid-cols-12"
      >
        <div className="lg:col-span-5">
          <p className="font-jb text-xs text-muted">0{i + 1} / 0{n}</p>
          <h3 className="mt-4 font-tight text-5xl font-medium tracking-[-0.04em] text-fg sm:text-6xl">{s.name}</h3>
          <p className="mt-4 max-w-sm text-xl leading-snug text-fg">{s.line}</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:col-span-7">
          <div>
            <p className="font-serif text-lg italic text-accent">What&apos;s included</p>
            <ul className="mt-3 grid gap-2.5 text-muted">
              {s.included.map((x) => (
                <li key={x} className="flex gap-2.5">
                  <Check className="mt-1 size-4 shrink-0 text-accent" /> {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid content-start gap-6">
            <div>
              <p className="font-serif text-lg italic text-accent">You get</p>
              <p className="mt-2 text-fg">{s.get}</p>
            </div>
            <div>
              <p className="font-serif text-lg italic text-accent">First step</p>
              <p className="mt-2 text-fg">{s.first}</p>
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const pinned = useMediaQuery("(min-width: 1024px)");
  return (
    <section id="services" className="scroll-mt-16 border-t border-line">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-8 sm:py-32">
        <div className="mb-14 max-w-2xl">
          <Kicker>Services</Kicker>
          <H2>
            <MaskLines inView lines={["Consult, build, run.", <Serif key="s">Pick where I start.</Serif>]} />
          </H2>
        </div>
        <div ref={ref} className={cx("grid", pinned ? "gap-[30vh] pb-[10vh]" : "gap-4")}>
          {services.map((s, i) => (
            <ServiceCard key={s.name} s={s} i={i} progress={scrollYProgress} pinned={pinned} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const [reached, setReached] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setReached(Math.floor(v * steps.length + 0.25)));
  return (
    <section className="border-t border-line bg-surface/50">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-8 sm:py-32 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <Kicker>How I work</Kicker>
            <H2>
              <MaskLines inView lines={["Four steps from", <Serif key="s">the workflow to the system.</Serif>]} />
            </H2>
          </div>
        </div>
        <ol ref={ref} className="relative grid gap-14 lg:col-span-7">
          <span className="absolute bottom-6 left-6 top-6 w-px bg-line" />
          <motion.span style={{ scaleY: scrollYProgress }} className="absolute bottom-6 left-6 top-6 w-px origin-top bg-accent" />
          {steps.map((s, i) => {
            const on = reached > i;
            return (
              <li key={s.title} className="relative grid grid-cols-[48px_1fr] gap-6">
                <span
                  className={cx(
                    "relative grid size-12 place-items-center rounded-full border font-tight text-lg transition-colors duration-500",
                    on ? "border-transparent bg-accent-fill text-on-accent" : "border-line bg-bg text-muted",
                  )}
                >
                  {i + 1}
                </span>
                <div className="pt-2">
                  <h3 className="font-tight text-2xl font-medium tracking-tight text-fg">{s.title}</h3>
                  <p className="mt-2 max-w-md text-lg leading-relaxed text-muted">{s.line}</p>
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
  return (
    <section className="border-t border-line py-14">
      <p className="mx-auto mb-8 max-w-7xl px-4 text-sm text-muted sm:px-8">The stack I ship with</p>
      <Marquee
        items={stack}
        duration={45}
        className="px-4 sm:px-0"
        itemClassName="font-tight text-[clamp(2rem,5vw,4.25rem)] font-medium tracking-[-0.04em] text-fg"
        separator={<span className="mx-8 font-serif text-[clamp(2rem,5vw,4.25rem)] italic text-accent">&amp;</span>}
      />
    </section>
  );
}

function About() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-8 sm:py-32 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Kicker>About</Kicker>
          <p className="font-serif text-[clamp(2.4rem,4.5vw,3.75rem)] italic leading-[1.02] tracking-[-0.02em] text-fg">
            <MaskLines inView lines={["I sit where", "the work happens."]} />
          </p>
          <BlurIn className="relative mt-10 aspect-square max-w-[220px] overflow-hidden rounded-full border border-line bg-surface">
            <div className="absolute inset-0 grid place-items-center text-xs text-muted">[PHOTO]</div>
          </BlurIn>
        </div>
        <div className="grid content-start gap-6 lg:col-span-6 lg:col-start-7 lg:pt-14">
          {about.map((p, i) => (
            <Reveal as="p" key={i} delay={i * 0.1} className={cx("text-xl leading-relaxed", i === 0 ? "text-fg" : "text-muted")}>
              {p}
            </Reveal>
          ))}
          <Reveal delay={0.4}>
            <dl className="mt-4 grid grid-cols-2 gap-6 border-t border-line pt-6 text-sm">
              {[
                ["Based in", "Hyderabad, India"],
                ["Education", "BTech CS, VIT, 2025"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-muted">{k}</dt>
                  <dd className="mt-1 text-fg">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="scroll-mt-16 border-t border-line bg-surface/50">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-8 sm:py-32">
        <h2 className="mx-auto max-w-5xl text-center font-tight text-[clamp(2.6rem,7vw,6.5rem)] font-medium leading-[0.98] tracking-[-0.045em] text-fg">
          <MaskLines inView lines={[contact.headline[0], <Serif key="s" className="text-accent">{contact.headline[1]}</Serif>]} />
        </h2>
        <Reveal className="mt-8 flex flex-col items-center gap-3 text-center">
          <p className="text-lg text-muted">Tell me what the workflow looks like today and where it gets stuck.</p>
          <CopyEmail />
        </Reveal>
        <Reveal delay={0.1} className="mx-auto mt-14 max-w-2xl rounded-[28px] border border-line bg-bg p-5 sm:p-8">
          <ContactForm fieldClassName="rounded-2xl" />
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  const time = useClock();
  return (
    <footer className="overflow-hidden border-t border-line bg-fg text-bg">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-8">
        <div className="grid gap-8 text-sm sm:grid-cols-3">
          <div>
            <p className="opacity-60">Elsewhere</p>
            <ul className="mt-2 grid gap-1">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1 hover:opacity-70">
                    {s.label} <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="opacity-60">Local time</p>
            <p className="mt-2 tabular-nums">Hyderabad · {time ?? "--:--:--"} IST</p>
          </div>
          <div className="sm:text-right">
            <a href="#top" className="inline-flex min-h-11 items-center rounded-full border border-bg/20 px-5 hover:border-bg/60">
              Back to top ↑
            </a>
          </div>
        </div>
        <FooterWordmark text={NAME} className="mt-16 font-tight text-[clamp(4rem,18vw,16rem)] font-medium tracking-[-0.06em]" />
      </div>
    </footer>
  );
}

export function DirectionB() {
  return (
    <div className="dir-b min-h-screen bg-bg font-inter text-fg selection:bg-accent selection:text-on-accent">
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
  );
}
