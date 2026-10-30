"use client";

import { Github, Moon, Sun } from "lucide-react";

type NavbarProps = {
  lightMode: boolean;
  onToggleTheme: () => void;
};

const links = [
  { label: "WORK", href: "#work" },
  { label: "SKILLS", href: "#skills" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navbar({ lightMode, onToggleTheme }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-ink/75 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-5 px-5 sm:px-8 lg:px-12">
        <div className="flex items-center gap-4">
          <a href="https://github.com/Basel00s" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-muted transition hover:text-coral">
            <Github size={18} />
          </a>
          <span className="hidden h-5 w-px bg-line sm:block" />
          <span className="hidden font-mono text-[10px] tracking-[0.18em] text-muted sm:block">BASEL.DEV</span>
        </div>
        <nav className="flex items-center gap-3 sm:gap-6" aria-label="Main navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-[9px] font-bold tracking-[0.12em] text-muted transition hover:text-coral sm:text-[10px] sm:tracking-[0.18em]">
              {link.label}
            </a>
          ))}
        </nav>
        <button onClick={onToggleTheme} aria-label="Toggle color theme" className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-panel text-paper transition hover:border-coral hover:text-coral">
          {lightMode ? <Moon size={15} /> : <Sun size={15} />}
        </button>
      </div>
    </header>
  );
}