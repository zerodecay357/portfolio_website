import type { Metadata } from "next";
import { Baloo_2, Poppins, Inter } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const baloo = Baloo_2({
  variable: "--font-baloo",
  weight: ["600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "500", "600"],
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
  themeColor: "#14120F",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${baloo.variable} ${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
