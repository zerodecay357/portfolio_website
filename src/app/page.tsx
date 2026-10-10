import Hero from "@/components/Hero";
import Spotlight from "@/components/sections/Spotlight";
import Projects from "@/components/sections/Projects";
import MoreBuilds from "@/components/sections/MoreBuilds";
import Process from "@/components/sections/Process";
import Academics from "@/components/sections/Academics";
import About from "@/components/sections/About";

export default function Home() {
  return (
    <>
      <Hero />
      <Spotlight />
      <Projects />
      <MoreBuilds />
      <Process />
      <Academics />
      <About />
    </>
  );
}
