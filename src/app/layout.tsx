import type { Metadata } from "next";
import { Space_Grotesk, Newsreader, IBM_Plex_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const serif = Newsreader({
  variable: "--font-serif",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono-plex",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shivanshu Aryan — Robotics, Game Theory, Systems, Quant",
  description:
    "Portfolio of Shivanshu ‘Zero’ Aryan, CS undergraduate at IIT Delhi working across robotics & RL, game theory, systems programming, and quantitative finance.",
  metadataBase: new URL("https://shivanshuaryan.dev"),
};

export const viewport = {
  themeColor: "#14161B",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${grotesk.variable} ${serif.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
