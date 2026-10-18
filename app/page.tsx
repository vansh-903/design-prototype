import type { Metadata } from "next";
import { LandingPage } from "@/components/landing-page";

export const metadata: Metadata = { title: "Landing Page · Signal" };

export default function Page() {
  return <LandingPage />;
}
