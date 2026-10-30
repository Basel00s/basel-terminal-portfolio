"use client";

import { useEffect, useState } from "react";

const sequence = [
  { command: "whoami", output: "basel — computer science student & developer" },
  { command: "cat /etc/purpose", output: "building useful software, one problem at a time" },
  { command: "npm run build", output: "frontend systems checked — ready to explore" },
  { command: "node ./backend", output: "learning APIs, databases, and backend architecture" },
  { command: "./boot --portfolio --env=local", output: "routes ready — curiosity loaded — let's begin" },
];

const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

export default function IntroSequence({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [typed, setTyped] = useState("");
  const [progress, setProgress] = useState(0);
  const [slicing, setSlicing] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      for (const item of sequence) {
        if (cancelled) return;
        const prompt = `basel@ink:~/portfolio $ ${item.command}`;
        for (let i = 1; i <= prompt.length; i += 1) {
          if (cancelled) return;
          setTyped(prompt.slice(0, i));
          await wait(24);
        }
        if (cancelled) return;
        setLines((current) => [...current, prompt, item.output]);
        setTyped("");
        await wait(360);
      }
      for (let value = 0; value <= 100; value += 2) {
        if (cancelled) return;
        setProgress(value);
        await wait(18);
      }
      await wait(500);
      if (!cancelled) setSlicing(true);
      await wait(1050);
      if (!cancelled) onComplete();
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete();
      return () => { cancelled = true; };
    }

    void run();
    return () => { cancelled = true; };
  }, [onComplete]);

  return (
    <div className={`intro-overlay ${slicing ? "is-slicing" : ""}`} aria-label="Portfolio intro">
      <div className="intro-screen">
        <div className="intro-topline"><span>● SYSTEM ONLINE</span><span>BASEL.DEV / PORTFOLIO_OS</span></div>
        <div className="intro-terminal">
          <p className="mb-5 text-[#FF5C4D]">┌── INITIALIZING PORTFOLIO ──┐</p>
          {lines.map((line, index) => (
            <p key={index} className={index % 2 === 0 ? "text-[#E6E8EE]" : "pl-4 text-[#4ADE80]"}>
              {line}
            </p>
          ))}
          {typed && <p className="text-[#E6E8EE]">{typed}<span className="terminal-cursor">▋</span></p>}
          <div className="mt-7 max-w-md">
            <div className="mb-2 flex justify-between text-[10px] tracking-widest text-[#9297A5]">
              <span>ASSEMBLING EXPERIENCE</span><span>{progress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full border border-[#2A2D3D] bg-[#171923]">
              <div className="h-full bg-[#FF5C4D] transition-[width] duration-100" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <p className="mt-8 text-[10px] tracking-[.2em] text-[#4ADE80]">[ PRESS NOTHING ] — THE JOURNEY STARTS AUTOMATICALLY</p>
        </div>
        <div className="katana-drop" aria-hidden="true"><span className="katana-blade" /><span className="katana-guard" /><span className="katana-handle" /></div>
        <div className="intro-scanlines" />
      </div>
    </div>
  );
}
