"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Github, ArrowUpRight, Terminal as TerminalIcon } from "lucide-react";

const commands = ["help", "about", "projects", "skills", "stack", "contact", "clear"];
const projects = [
  { name: "Task Tracker CLI", description: "A command-line task manager built while learning Node.js and file-system operations.", stack: "JavaScript · Node.js · JSON", url: "https://github.com/Basel00s" },
  { name: "Task Tracker API", description: "An Express API experiment with route organization and REST fundamentals.", stack: "JavaScript · Express · REST", url: "https://github.com/Basel00s" },
  { name: "Quote Generator", description: "A small frontend project focused on DOM interaction and responsive styling.", stack: "HTML · CSS · JavaScript", url: "https://github.com/Basel00s" },
];

function getOutput(command) {
  switch (command) {
    case "help": return { kind: "help", lines: [["about", "A little about me"], ["projects", "Things I've built"], ["skills", "Tools and technologies"], ["stack", "What I'm focused on now"], ["contact", "Find me around the web"], ["clear", "Clear the terminal"], ["help", "Show this list"]] };
    case "about": return { kind: "text", text: "I'm Basel — a Computer Science student interested in software engineering and building useful things. I enjoy understanding how systems work, learning by shipping projects, and getting a little better with every iteration." };
    case "projects": return { kind: "projects" };
    case "skills": return { kind: "text", text: "LANGUAGES\n  JavaScript · Python · SQL · C++\n\nWEB & BACKEND\n  Node.js · Express · Next.js · HTML · CSS\n\nTOOLS\n  Git · Linux · PostgreSQL · SQL Server" };
    case "stack": return { kind: "text", text: "CURRENT FOCUS\n  Backend development\n  NestJS · TypeScript · SQL · API design\n\nAlso exploring\n  Data structures · Linux · system design fundamentals" };
    case "contact": return { kind: "contact", text: "The easiest way to find me is GitHub." };
    default: return { kind: "text", text: `Command not found: ${command}\nType "help" to see the available commands.` };
  }
}

export default function TerminalPortfolio() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([{ id: 1, type: "output", kind: "welcome" }]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandLog, setCommandLog] = useState([]);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);
  const nextId = useRef(2);
  const suggestions = useMemo(() => {
    const value = input.trim().toLowerCase();
    return value ? commands.filter((item) => item.startsWith(value) && item !== value) : [];
  }, [input]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [history]);

  function addEntry(entry) {
    setHistory((current) => [...current, { id: nextId.current++, ...entry }]);
  }
  function runCommand(raw) {
    const command = raw.trim().toLowerCase();
    if (!command) return;
    setInput("");
    setSuggestionsOpen(false);
    setHistoryIndex(-1);
    if (command === "clear") { setHistory([]); return; }
    addEntry({ type: "command", text: command });
    setCommandLog((current) => [command, ...current]);
    addEntry({ type: "output", ...getOutput(command) });
  }
  function handleSubmit(event) { event.preventDefault(); runCommand(input); }
  function handleKeyDown(event) {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      const next = Math.min(historyIndex + 1, commandLog.length - 1);
      setHistoryIndex(next);
      setInput(commandLog[next] || "");
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      const next = historyIndex - 1;
      setHistoryIndex(next);
      setInput(next < 0 ? "" : commandLog[next] || "");
    }
    if (event.key === "Tab" && suggestions.length) {
      event.preventDefault();
      setInput(suggestions[0]);
      setSuggestionsOpen(false);
    }
    if (event.key === "Escape") { setInput(""); setSuggestionsOpen(false); }
  }
  function renderOutput(entry) {
    if (entry.kind === "welcome") return <div className="welcome-output"><div className="welcome-mark">B<span>.</span></div><div><p className="welcome-title">Welcome to my corner of the internet.</p><p className="muted">I'm Basel — developer in progress, curious by default.</p><p className="hint">Type <kbd>help</kbd> to explore. Try <kbd>about</kbd> or <kbd>projects</kbd>.</p></div></div>;
    if (entry.kind === "help") return <div className="help-grid">{entry.lines.map(([name, description]) => <button className="help-command" key={name} onClick={() => runCommand(name)}><span>{name}</span><small>{description}</small></button>)}</div>;
    if (entry.kind === "projects") return <div className="project-list">{projects.map((project, index) => <article className="project-row" key={project.name}><span className="project-number">0{index + 1}</span><div className="project-info"><div className="project-heading">{project.name}</div><p>{project.description}</p><small>{project.stack}</small></div><a href={project.url} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} on GitHub`}><ArrowUpRight size={16} /></a></article>)}<p className="muted project-note">Project links are starter links — replace them with each project's repository when ready.</p></div>;
    if (entry.kind === "contact") return <div className="contact-output"><p>{entry.text}</p><a href="https://github.com/Basel00s" target="_blank" rel="noreferrer"><Github size={15} /> github.com/Basel00s <ArrowUpRight size={14} /></a></div>;
    return <pre className="output-text">{entry.text}</pre>;
  }

  return <main className="site-shell">
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <header className="topbar"><a className="brand" href="/" aria-label="Basel home">basel<span>.dev</span></a><nav className="top-links" aria-label="Social links"><a href="https://github.com/Basel00s" target="_blank" rel="noreferrer"><Github size={15} /> GitHub</a><span className="availability"><i /> open to opportunities</span></nav></header>
    <section className="intro"><div className="intro-kicker"><span /> PERSONAL WEBSITE <span className="kicker-divider">/</span> 2026</div><h1>Curious mind.<br /><em>Builder's</em> mindset.</h1><p className="intro-copy">I'm Basel, a CS student exploring software engineering — currently spending most of my time on the backend.</p></section>
    <section className="terminal-wrap" aria-label="Interactive portfolio terminal"><div className="terminal-window">
      <div className="terminal-chrome"><div className="traffic-lights"><i /><i /><i /></div><div className="window-label"><TerminalIcon size={13} /> basel@portfolio <span>—</span> ~/home</div><div className="chrome-right">zsh</div></div>
      <div className="terminal-content" ref={bodyRef} onClick={() => inputRef.current?.focus()}><div className="session-line"><span className="session-dot" /> session initialized <span className="session-time">interactive shell</span></div>
        {history.map((entry) => <div className="history-entry" key={entry.id}>{entry.type === "command" && <div className="command-line"><span className="prompt-user">basel<span>@</span>portfolio</span><span className="prompt-path">:~</span><b>$</b><span>{entry.text}</span></div>}{entry.type === "output" && <div className="entry-output">{renderOutput(entry)}</div>}</div>)}
        <form className="command-form" onSubmit={handleSubmit}><span className="prompt-user">basel<span>@</span>portfolio</span><span className="prompt-path">:~</span><b>$</b><input ref={inputRef} value={input} onChange={(event) => { setInput(event.target.value); setSuggestionsOpen(true); }} onKeyDown={handleKeyDown} onBlur={() => setTimeout(() => setSuggestionsOpen(false), 120)} onFocus={() => setSuggestionsOpen(true)} autoComplete="off" autoCapitalize="none" spellCheck="false" aria-label="Enter a portfolio command" placeholder="type a command..." />{suggestionsOpen && suggestions.length > 0 && <div className="suggestions">{suggestions.slice(0, 5).map((suggestion) => <button type="button" key={suggestion} onMouseDown={(event) => event.preventDefault()} onClick={() => runCommand(suggestion)}>{suggestion}<span>↵</span></button>)}<small>Tab to autocomplete</small></div>}<span className="input-caret" /></form>
      </div><div className="terminal-footer"><span><i /> connected</span><span>↑ ↓ command history <b>·</b> tab autocomplete</span></div>
    </div><p className="terminal-caption"><span>01</span> A small interactive introduction. Go ahead, type something.</p></section>
    <footer className="site-footer"><span>© 2026 BASEL</span><span>DESIGNED WITH INTENTION <b>✳</b></span><a href="https://github.com/Basel00s" target="_blank" rel="noreferrer">GITHUB <ArrowUpRight size={12} /></a></footer>
  </main>;
}
