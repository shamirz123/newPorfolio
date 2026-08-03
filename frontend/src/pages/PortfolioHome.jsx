import AmbientBackground from "../Components/layout/AmbientBackground";
import CommandPalette from "../Components/layout/CommandPalette";
import Footer from "../Components/layout/Footer";
import Navbar from "../Components/layout/Navbar";
import ScrollProgress from "../Components/layout/ScrollProgress";
import SpotlightCursor from "../Components/layout/SpotlightCursor";
import About from "../Components/sections/About";
import Contact from "../Components/sections/Contact";
import Experience from "../Components/sections/Experience";
import Hero from "../Components/sections/Hero";
import Projects from "../Components/sections/Projects";
import Skills from "../Components/sections/Skills";
import Testimonials from "../Components/sections/Testimonials";

export default function PortfolioHome() {
  return (
    <div className="relative min-h-screen">
      <AmbientBackground />
      <SpotlightCursor />
      <div className="grain-overlay" aria-hidden />
      <ScrollProgress />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
      <CommandPalette />
    </div>
  );
}
