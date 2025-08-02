import Navigation from "@/components/layout/navigation";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import Skills from "@/components/sections/skills";
import Biography from "@/components/sections/biography";
import Projects from "@/components/sections/projects";
import Blog from "@/components/sections/blog";
import Contact from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      <main>
        <Hero />
        <Skills />
        <Biography />
        <Projects />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
