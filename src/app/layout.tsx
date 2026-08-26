import type { Metadata } from "next";
import { Baloo_2, Poppins, Hanken_Grotesk } from "next/font/google";
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

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shivanshu Aryan: Robotics, Game Theory, Systems, Quant",
  description:
    "Portfolio of Shivanshu ‘Zero’ Aryan, CS undergraduate at IIT Delhi working across robotics & RL, game theory, systems programming, and quantitative finance.",
  metadataBase: new URL("https://shivanshuaryan.dev"),
};

export const viewport = {
  themeColor: "#14120F",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${baloo.variable} ${poppins.variable} ${hanken.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
