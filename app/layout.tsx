import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Inter,
  Inter_Tight,
  Instrument_Serif,
  JetBrains_Mono,
  Noto_Sans_Devanagari,
  Noto_Sans_Telugu,
} from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono-v", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter-v", subsets: ["latin"] });
const interTight = Inter_Tight({ variable: "--font-inter-tight", subsets: ["latin"] });
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });
const deva = Noto_Sans_Devanagari({ variable: "--font-deva", subsets: ["devanagari"] });
const telugu = Noto_Sans_Telugu({ variable: "--font-telugu", subsets: ["telugu"] });

export const metadata: Metadata = {
  title: "[NAME] · Design directions",
  description: "Design exploration for a forward deployed engineer's portfolio.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const fonts = [geist, geistMono, inter, interTight, instrument, jetbrains, deva, telugu]
    .map((f) => f.variable)
    .join(" ");
  return (
    <html lang="en" className={`${fonts} antialiased`} suppressHydrationWarning>
      <body className="min-h-screen" suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
