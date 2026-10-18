import type { CaseVisualKind } from "@/lib/content";
import { cx } from "./motion-kit";

export function CaseVisual({ kind, className }: { kind: CaseVisualKind; className?: string }) {
  return (
    <div className={cx("relative h-full w-full overflow-hidden bg-bg p-5 sm:p-6", className)}>
      <div className="dot-grid absolute inset-0 opacity-60" />
      <div className="relative h-full">{VISUALS[kind]}</div>
      <span className="absolute right-3 top-3 rounded-full border border-line bg-surface/80 px-2 py-0.5 text-[10px] text-muted backdrop-blur">
        Illustrative UI
      </span>
    </div>
  );
}

const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cx("rounded-xl border border-line bg-surface p-4 shadow-sm", className)}>{children}</div>
);

const Bar = ({ w, accent }: { w: number; accent?: boolean }) => (
  <div className="h-2 w-full rounded-full bg-fg/5">
    <div className={cx("h-2 rounded-full", accent ? "bg-accent-fill" : "bg-fg/25")} style={{ width: `${w}%` }} />
  </div>
);

const VISUALS: Record<CaseVisualKind, React.ReactNode> = {
  review: (
    <div className="grid h-full grid-cols-5 gap-3">
      <Card className="col-span-3 flex flex-col gap-3">
        <p className="text-[11px] uppercase tracking-wider text-muted">Call #4182 · scored</p>
        {[
          ["Talk ratio", 62, "42 / 58"],
          ["Pace", 78, "148 wpm"],
          ["Filler words", 30, "6"],
          ["Discovery", 84, "4.2 / 5"],
          ["Objection handling", 70, "3.5 / 5"],
        ].map(([k, w, v]) => (
          <div key={k as string} className="grid gap-1">
            <div className="flex justify-between text-[11px] text-muted">
              <span>{k}</span>
              <span className="text-fg">{v}</span>
            </div>
            <Bar w={w as number} accent={(w as number) > 75} />
          </div>
        ))}
      </Card>
      <div className="col-span-2 flex flex-col gap-3">
        <Card className="flex flex-1 flex-col justify-between">
          <p className="text-[11px] uppercase tracking-wider text-muted">Overall</p>
          <p className="text-4xl font-semibold tracking-tight text-fg">78</p>
        </Card>
        <Card className="flex-1">
          <p className="text-[11px] uppercase tracking-wider text-muted">Review time</p>
          <p className="mt-1 text-xl font-semibold text-accent">1:54</p>
        </Card>
      </div>
    </div>
  ),
  roleplay: (
    <div className="flex h-full flex-col gap-3">
      <div className="flex gap-2">
        {["Skeptical CFO", "Busy founder", "Procurement lead"].map((p, i) => (
          <span key={p} className={cx("rounded-full border px-3 py-1 text-[11px]", i === 0 ? "border-transparent bg-accent-fill text-on-accent" : "border-line text-muted")}>
            {p}
          </span>
        ))}
      </div>
      <Card className="flex flex-1 flex-col gap-2">
        <p className="max-w-[80%] rounded-xl bg-fg/5 px-3 py-2 text-xs text-fg">We already have a vendor. Why switch?</p>
        <p className="ml-auto max-w-[80%] rounded-xl bg-accent-fill/20 px-3 py-2 text-xs text-fg">Fair. What would make a switch worth it for you?</p>
        <div className="mt-auto flex items-end gap-[3px] h-8 text-accent">
          {Array.from({ length: 40 }).map((_, i) => (
            <span key={i} className="w-full rounded-full bg-current" style={{ height: `${20 + ((i * 37) % 80)}%`, opacity: 0.35 + ((i * 13) % 60) / 100 }} />
          ))}
        </div>
      </Card>
      <div className="grid grid-cols-2 gap-3">
        <Card className="py-3"><p className="text-[11px] text-muted">Quality</p><p className="text-lg font-semibold text-fg">4.4 / 5</p></Card>
        <Card className="py-3"><p className="text-[11px] text-muted">Scenario adherence</p><p className="text-lg font-semibold text-fg">91%</p></Card>
      </div>
    </div>
  ),
  latency: (
    <Card className="flex h-full flex-col">
      <div className="flex justify-between text-[11px] text-muted">
        <span className="uppercase tracking-wider">P95 latency · 3 endpoints</span>
        <span>before → after</span>
      </div>
      <div className="mt-4 grid flex-1 grid-cols-3 items-end gap-6">
        {[30, 28, 26].map((v, i) => (
          <div key={i} className="flex h-full items-end gap-2">
            <div className="w-full rounded-t-md bg-fg/15" style={{ height: `${(v / 30) * 100}%` }} />
            <div className="w-full rounded-t-md bg-accent-fill" style={{ height: `${10 + i * 1.5}%` }} />
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-3 gap-6 text-[11px] text-muted">
        <span>/analytics</span><span>/calls</span><span>/reports</span>
      </div>
    </Card>
  ),
  models: (
    <Card className="h-full overflow-hidden p-0">
      <div className="grid grid-cols-4 border-b border-line px-4 py-2.5 text-[11px] uppercase tracking-wider text-muted">
        <span>KPI</span><span>GPT-5.1</span><span>o3</span><span>o4-mini</span>
      </div>
      {[
        ["Accuracy", "92", "94", "88"],
        ["Relevance", "90", "91", "86"],
        ["Cost / 1k", "$4.1", "$6.8", "$1.2"],
        ["Latency", "2.1s", "4.8s", "1.4s"],
        ["Tool use", "96", "97", "90"],
      ].map((r, i) => (
        <div key={r[0]} className={cx("grid grid-cols-4 px-4 py-2.5 text-xs text-fg", i % 2 === 1 && "bg-fg/[0.03]")}>
          {r.map((c, j) => (
            <span key={j} className={cx(j === 0 && "text-muted", j === 3 && i === 2 && "font-semibold text-accent")}>{c}</span>
          ))}
        </div>
      ))}
    </Card>
  ),
};
