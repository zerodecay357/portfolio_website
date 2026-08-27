import Hero from "@/components/Hero";
import Projects from "@/components/sections/Projects";
import MoreBuilds from "@/components/sections/MoreBuilds";
import BlogPreview from "@/components/sections/BlogPreview";
import Academics from "@/components/sections/Academics";
import About from "@/components/sections/About";

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <MoreBuilds />
      <BlogPreview />
      <Academics />
      <About />
    </>
  );
}
