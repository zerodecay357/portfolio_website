import Reveal from "@/components/Reveal";
import { SparkleDoodle, WaveDoodle, WashiTape } from "@/components/Doodles";

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-paper px-5 py-20 sm:px-10 sm:py-28"
    >
      <WashiTape
        className="right-16 top-8 h-9 w-28 -rotate-6"
        color="var(--gold)"
      />
      <SparkleDoodle className="absolute left-10 top-16 hidden rotate-6 sm:block" />
      <WaveDoodle className="absolute bottom-8 right-10 hidden rotate-3 opacity-70 sm:block" />

      <Reveal className="relative mx-auto max-w-[720px]">
        <p className="font-heading text-[11px] font-700 uppercase tracking-[3px] text-terracotta">
          About
        </p>
        <h2 className="mt-3 font-heading text-3xl font-800 text-ink sm:text-4xl">
          Why the range, not the niche
        </h2>
        <p className="mt-6 font-body text-[16px] leading-relaxed text-muted sm:text-[17px]">
          I&rsquo;m a CS undergraduate at IIT Delhi, and I lead hardware and
          controls work for the Robotics Club, where Hexabot and the
          LiDAR-mapping stack both came out of the same team. The apportionment
          proof, the hexapod&rsquo;s gait policy, the out-of-order simulator, and the
          equity strategy all sit on the same underlying skill: modeling a system
          precisely enough that you can predict, and sometimes exploit, how it
          behaves at the edges. Robotics gives that model hardware to fail
          against; game theory gives it a proof; markets give it a P&amp;L. Different
          domains, same instinct.
        </p>
      </Reveal>
    </section>
  );
}
