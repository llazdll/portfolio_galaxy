import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills3D from "@/components/Skills3D";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Resume from "@/components/Resume";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ParticleField from "@/components/ParticleField";
import MagicalCursor from "@/components/MagicalCursor";

export default function Home() {
  return (
    <>
      <MagicalCursor />
      <ParticleField />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills3D />
        <Services />
        <Work />
        <Resume />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
