import Image from "next/image";
import Headline from "@/components/ui/Headline";

export default function About() {
  return (
    <section id="about" className="relative isolate overflow-hidden border-t border-hairline">
      {/* Soft cool light behind the portrait, plus a masked hairline grid. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(40%_55%_at_22%_45%,rgb(160_180_205/0.10),transparent_70%)]" />
        <div className="bg-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(50%_60%_at_25%_50%,black,transparent)]" />
      </div>

      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-10 lg:gap-16">
          <figure className="mx-auto w-full max-w-[420px] md:col-span-5 md:mx-0 md:max-w-none">
            <div className="ticks border border-hairline p-3">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src="/portrait/zero-portrait-photo.jpg"
                  alt="Portrait of Shivanshu Aryan"
                  width={700}
                  height={859}
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="h-full w-full object-cover object-top"
                  style={{ filter: "grayscale(1) contrast(1.12) brightness(0.92)" }}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent"
                />
              </div>
            </div>
            <figcaption className="mt-4 font-body text-[14px] text-steel">
              Shivanshu &ldquo;Zero&rdquo; Aryan, IIT Delhi
            </figcaption>
          </figure>

          <div className="md:col-span-7">
            <Headline lead="Why the range," follow="not the niche." />
            <div className="mt-10 max-w-[65ch] space-y-6">
              <p className="font-body text-[16px] leading-relaxed text-steel sm:text-[17px]">
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
              <p className="font-body text-[16px] leading-relaxed text-steel sm:text-[17px]">
                None of this is random. I want to build a deep-tech company
                eventually, and deep tech is unforgiving about the part most
                startups skip: whether the underlying system actually works before
                any of the business around it matters. So I&rsquo;ve been deliberately
                testing myself against different corners of computer science,
                hardware, theory, systems, and markets, to find out where the hard
                problems actually are and whether I can solve them, not just talk
                about them. Every project here is that stress test running in
                public.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
