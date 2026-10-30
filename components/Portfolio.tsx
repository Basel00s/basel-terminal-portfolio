"use client";

import { useCallback, useState } from "react";
import IntroSequence from "@/components/IntroSequence";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import TechStack from "@/components/sections/TechStack";
import Experience from "@/components/sections/Experience";
import ResumePreview from "@/components/sections/ResumePreview";
import Contact from "@/components/sections/Contact";
import SakuraBackground from "@/components/ui/SakuraBackground";

export default function Portfolio() {
  const [lightMode, setLightMode] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const finishIntro = useCallback(() => setIntroComplete(true), []);

  return (
    <main data-theme={lightMode ? "light" : "dark"} className="portfolio-shell relative min-h-screen overflow-hidden">
      {!introComplete && <IntroSequence onComplete={finishIntro} />}
      <SakuraBackground />
      {introComplete && <Navbar lightMode={lightMode} onToggleTheme={() => setLightMode((value) => !value)} />}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <Hero />
        <Projects />
        <TechStack />
        <Experience />
        <ResumePreview />
        <Contact />
        <footer className="flex flex-col gap-3 border-t border-line py-7 text-[10px] uppercase tracking-[0.2em] text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} BASEL</span>
          <span>Built with curiosity <span className="text-coral">✳</span> and Next.js</span>
          <a className="transition hover:text-coral" href="https://github.com/Basel00s" target="_blank" rel="noreferrer">GITHUB ↗</a>
        </footer>
      </div>
    </main>
  );
}
