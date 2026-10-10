import Image from "next/image";
import Link from "next/link";
import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react/ssr";
import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import { Z } from "@/lib/z";

const GITHUB = "https://github.com/zerodecay357";
const LINKEDIN = "https://linkedin.com/in/shivanshu-aryan";
const CV = "/cv/Shivanshu_Aryan_CV.pdf";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative isolate w-full overflow-hidden border-t border-hairline bg-obsidian"
    >
      {/* Earth-at-night horizon, bottom-aligned, top fading into obsidian. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src="/media/stock/earth-night.jpg"
          alt=""
          width={2400}
          height={1200}
          sizes="100vw"
          quality={75}
          className="absolute inset-x-0 bottom-0 h-[78%] w-full object-cover object-bottom"
          style={{ filter: "grayscale(0.55) saturate(0.7) hue-rotate(-8deg) brightness(0.85) contrast(1.05) blur(1.5px)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian from-25% via-obsidian/70 via-55% to-obsidian/30" />
        {/* Scrim behind the centered copy and the bottom bar */}
        <div className="absolute inset-0 bg-[radial-gradient(55%_45%_at_50%_42%,rgb(5_7_10/0.75),transparent_75%)]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-obsidian/85 to-transparent" />
      </div>

      <div
        className="relative mx-auto flex min-h-[640px] max-w-[1400px] flex-col px-5 sm:px-8 lg:min-h-[720px] lg:px-12"
        style={{ zIndex: Z.raised }}
      >
        <div className="flex flex-1 flex-col items-center justify-center pb-20 pt-28 text-center lg:pt-36">
          <Label className="text-chrome/80">Build it, then prove it holds up.</Label>
          <p className="mt-6 max-w-[52ch] font-body text-[16px] leading-relaxed text-chrome/80 sm:text-[17px]">
            Open to research collaborations, internships, and anything that
            needs someone comfortable moving between hardware, theory, and
            production code.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <Button href="mailto:cs1240237@iitd.ac.in" variant="primary" target="_self">
              Email me
            </Button>
            <Button href={GITHUB} variant="ghost">
              <GithubLogo size={16} weight="regular" aria-hidden="true" />
              GitHub
            </Button>
            <Button href={LINKEDIN} variant="ghost">
              <LinkedinLogo size={16} weight="regular" aria-hidden="true" />
              LinkedIn
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-hairline py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              aria-label="Zero, home"
              className="font-display text-[20px] font-500 lowercase leading-none tracking-[-0.02em] text-chrome"
            >
              zero
            </Link>
            <p className="font-body text-[13px] text-chrome/75">
              &copy; {new Date().getFullYear()} Shivanshu Aryan.
            </p>
          </div>
          <ul className="flex items-center gap-6 font-body text-[13px]">
            <li>
              <a href={GITHUB} target="_blank" rel="noopener" className="text-chrome/75 transition-colors hover:text-chrome">
                GitHub
              </a>
            </li>
            <li>
              <a href={LINKEDIN} target="_blank" rel="noopener" className="text-chrome/75 transition-colors hover:text-chrome">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={CV} target="_blank" rel="noopener" className="text-chrome/75 transition-colors hover:text-chrome">
                CV
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
