export type SignalVariant = "a" | "a2" | "a3";

export type SignalRhythm = {
  id: SignalVariant;
  label: string;
  section: string;
  sectionLoose: string;
  blockGap: string;
  labelMb: string;
  cardGap: string;
  stagger: number;
  revealY: number;
  revealX: number;
  revealScale?: number;
  duration: number;
  maskFrom: "up" | "left" | "scale";
  maskStagger: number;
  maskDuration: number;
  scrollDrift: number;
  cardHover: string;
  serviceHover: string;
  workZoom: string;
  buildIconHover: string;
};

export const SIGNAL: Record<SignalVariant, SignalRhythm> = {
  a: {
    id: "a",
    label: "Signal",
    section: "py-24",
    sectionLoose: "py-24 sm:py-32",
    blockGap: "mt-12",
    labelMb: "mb-5",
    cardGap: "gap-4",
    stagger: 0.08,
    revealY: 30,
    revealX: 0,
    duration: 0.7,
    maskFrom: "up",
    maskStagger: 0.06,
    maskDuration: 0.8,
    scrollDrift: 140,
    cardHover: "hover:-translate-y-1 hover:border-accent",
    serviceHover: "hover:border-transparent hover:bg-accent-fill",
    workZoom: "duration-500 group-hover:scale-105",
    buildIconHover: "group-hover:rotate-[-8deg] group-hover:scale-110",
  },
  a2: {
    id: "a2",
    label: "Signal · Terminal",
    section: "py-14 sm:py-16",
    sectionLoose: "py-14 sm:py-16",
    blockGap: "mt-8",
    labelMb: "mb-3",
    cardGap: "gap-2",
    stagger: 0.02,
    revealY: 0,
    revealX: -18,
    duration: 0.38,
    maskFrom: "left",
    maskStagger: 0.02,
    maskDuration: 0.42,
    scrollDrift: 48,
    cardHover: "hover:border-accent hover:bg-bg",
    serviceHover: "hover:border-accent hover:bg-bg",
    workZoom: "duration-200 group-hover:scale-[1.02]",
    buildIconHover: "group-hover:bg-fg group-hover:text-bg",
  },
  a3: {
    id: "a3",
    label: "Signal · Broadcast",
    section: "py-28 sm:py-36",
    sectionLoose: "py-32 sm:py-44",
    blockGap: "mt-16",
    labelMb: "mb-7",
    cardGap: "gap-6",
    stagger: 0.1,
    revealY: 48,
    revealX: 0,
    revealScale: 0.97,
    duration: 1.0,
    maskFrom: "scale",
    maskStagger: 0.1,
    maskDuration: 1.05,
    scrollDrift: 220,
    cardHover:
      "hover:-translate-y-2 hover:border-accent hover:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.35)]",
    serviceHover:
      "hover:-translate-y-2 hover:border-transparent hover:bg-accent-fill hover:shadow-[0_28px_70px_-30px_rgba(198,244,50,0.45)]",
    workZoom: "duration-700 group-hover:scale-[1.06]",
    buildIconHover: "group-hover:rotate-[-12deg] group-hover:scale-125",
  },
};
