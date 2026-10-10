import Hero from "@/components/Hero";
import FieldFootage from "@/components/sections/FieldFootage";
import Projects from "@/components/sections/Projects";
import Secondary from "@/components/sections/Secondary";
import MoreBuilds from "@/components/sections/MoreBuilds";
import Academics from "@/components/sections/Academics";
import About from "@/components/sections/About";

export default function Home() {
  return (
    <>
      <Hero />
      <FieldFootage />
      <Projects />
      <Secondary />
      <MoreBuilds />
      <Academics />
      <About />
    </>
  );
}
