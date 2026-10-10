import type { Metadata } from "next";
import { Hanken_Grotesk, Geist_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import { Z } from "@/lib/z";
import "./globals.css";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const TITLE = "Shivanshu Aryan: Robotics, Game Theory, Systems, Quant";
const DESCRIPTION =
  "Portfolio of Shivanshu ‘Zero’ Aryan, CS undergraduate at IIT Delhi working across robotics & RL, game theory, systems programming, and quantitative finance.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL("https://shivanshuaryan.dev"),
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://shivanshuaryan.dev",
    siteName: "Shivanshu Aryan",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export const viewport = {
  themeColor: "#05070a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${hanken.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col text-chrome">
        <div aria-hidden="true" className="atmosphere pointer-events-none fixed inset-0 -z-10" />
        <ScrollProgress />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <div
          aria-hidden="true"
          className="grain pointer-events-none fixed inset-0"
          style={{ zIndex: Z.overlay }}
        />
      </body>
    </html>
  );
}
