import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import SecondaryProjects from "@/components/SecondaryProjects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CodeBackground from "@/components/CodeBackground";

export default function Home() {
  return (
    <main>
      <Header />
      {/* Shared background wrapper for Hero and About */}
      <div className="relative overflow-hidden">
        <CodeBackground enableParallax={true} />
        <Hero />
        <About />
      </div>
      <Projects />

      <SecondaryProjects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
