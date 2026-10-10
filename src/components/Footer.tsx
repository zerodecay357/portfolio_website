import Image from "next/image";
import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react/ssr";
import Button from "@/components/ui/Button";
import { Z } from "@/lib/z";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative isolate w-full overflow-hidden border-t border-conduit bg-void"
    >
      {/* Night city, pushed far back so the closing line reads at AA. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <Image
          src="/media/stock/neon-city.jpg"
          alt=""
          width={1600}
          height={1067}
          sizes="100vw"
          quality={75}
          className="h-full w-full object-cover object-right opacity-60 grayscale-[20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void" />
        <div className="absolute inset-0 bg-gradient-to-r from-void from-35% via-void/80 to-void/10" />
      </div>

      <div
        className="relative mx-auto max-w-[1320px] px-5 pb-10 pt-28 sm:px-8 lg:px-12 lg:pt-36"
        style={{ zIndex: Z.raised }}
      >
        <h2 className="max-w-[14ch] font-display text-[56px] font-800 uppercase leading-[0.92] tracking-tight text-phosphor sm:text-[80px] lg:text-[112px]">
          Let&rsquo;s build something that has to work.
        </h2>
        <p className="mt-8 max-w-[52ch] font-body text-[17px] leading-relaxed text-fog sm:text-[18px]">
          Open to research collaborations, internships, and anything that
          needs someone comfortable moving between hardware, theory, and
          production code.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button href="mailto:cs1240237@iitd.ac.in" variant="primary" target="_self">
            Email me
          </Button>
          <Button href="https://github.com/zerodecay357" variant="ghost">
            <GithubLogo size={18} weight="bold" aria-hidden="true" />
            GitHub
          </Button>
          <Button href="https://linkedin.com/in/shivanshu-aryan" variant="ghost">
            <LinkedinLogo size={18} weight="bold" aria-hidden="true" />
            LinkedIn
          </Button>
        </div>

        <div className="mt-24 border-t border-conduit pt-6 font-mono text-[13px] text-fog">
          &copy; {new Date().getFullYear()} Shivanshu Aryan.
        </div>
      </div>
    </footer>
  );
}
