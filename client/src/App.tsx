import { useEffect, useState } from "react";
import BootSequence from "./components/BootSequence";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const BOOT_SESSION_KEY = "portfolio-boot-played";

export default function App() {
  const [bootDone, setBootDone] = useState(() => sessionStorage.getItem(BOOT_SESSION_KEY) === "1");

  useEffect(() => {
    if (bootDone) sessionStorage.setItem(BOOT_SESSION_KEY, "1");
  }, [bootDone]);

  return (
    <>
      {!bootDone && <BootSequence onDone={() => setBootDone(true)} />}
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
