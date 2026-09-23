import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import {
  Mail, Sun, Moon, Menu, X, ArrowRight, ExternalLink,
  Code2, Terminal, Sparkles, Database, Server, Layers, BookOpen,
  ChevronRight, Send, Check, AlertCircle, ArrowUp, Play, Search, Zap, Boxes, Bug, Lightbulb, Rocket, Eye, Brain, Download, FileText
} from "lucide-react"

// Fallback brand icons (lucide brand icons removed in newer versions)
const Github = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={props.size || 16} height={props.size || 16} {...props}>
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
)
const Linkedin = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={props.size || 16} height={props.size || 16} {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
)
import { projects as projectsData } from "./data/projects"
import { skillGroups, currentlyLearning } from "./data/skills"
import { submitContact } from "./lib/api"

const GITHUB_URL = "https://github.com/rishikesh-Dev01"
const LINKEDIN_URL = "https://www.linkedin.com/in/rishikesh-pal-0508b5398/"
const EMAIL = "rishikeshpal937@gmail.com"
const LOGO_URL = "/logo.svg"
const RESUME_URL = "/Rishikesh_Pal_Resume.docx"

// ---------- helpers ----------
const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
]

const roles = ["Full-Stack Developer", "Frontend Developer", "JavaScript Developer", "Problem Solver"]

function useAnimatedRole() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % roles.length), 1800)
    return () => clearInterval(id)
  }, [])
  return roles[idx]
}

// ---------- Cinematic reveal like Anand: scale + slide + glass glow ----------
function Reveal({ children, direction = "up", delay = 0 }: { children: React.ReactNode; direction?: "up" | "down" | "left" | "right"; delay?: number }) {
  const variants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -44 : direction === "right" ? 44 : 0,
      y: direction === "up" ? 34 : direction === "down" ? -34 : 0,
      scale: 0.97,
      filter: "blur(6px)",
    },
    visible: { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" },
  }
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.16, margin: "-70px" }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] as any, delay }}
      style={{ willChange: "transform, opacity, filter" }}
    >
      {children}
    </motion.div>
  )
}

function PageSlideProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])
  return (
    <div className="scroll-progress-container">
      <motion.div style={{ scaleX }} className="scroll-progress-bar origin-left" />
    </div>
  )
}

// ---------- Components ----------
function Navbar({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", h)
    return () => window.removeEventListener("scroll", h)
  }, [])
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? "py-3" : "py-5"}`}>
      <div className={`mx-auto max-w-[1220px] px-6 md:px-8 flex items-center justify-between ${scrolled ? "glass rounded-2xl px-5 md:px-6 py-3.5 shadow-[0_8px_32px_rgba(0,0,0,0.3)]" : ""}`}>
        <a href="#home" className="flex items-center gap-3">
          <img src={LOGO_URL} alt="Rishikesh Pal logo" className="w-9 h-9 rounded-xl object-cover border border-border shadow-[0_0_12px_rgba(0,180,255,0.35)]" />
          <span className="font-semibold tracking-tight text-[15px] hidden sm:block">Rishikesh Pal</span>
          <span className="text-[11px] px-2 py-1 rounded-full bg-[#1c1c1c] border border-border text-secondary hidden md:inline-flex">Available for opportunities</span>
        </a>
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map(l => (
            <a key={l.label} href={l.href} className="px-3 py-2 text-[13px] text-secondary hover:text-white transition rounded-full hover:bg-white/5">{l.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-white hover:text-black transition"><Github size={16} /></a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-border hidden sm:flex items-center justify-center hover:bg-white hover:text-black transition"><Linkedin size={16} /></a>
          <a href={RESUME_URL} download className="hidden md:inline-flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-zinc-200 transition">Resume <Download size={14} /></a>
          <button onClick={toggleTheme} aria-label="toggle theme" className="w-9 h-9 rounded-full border border-border flex items-center justify-center hover:bg-zinc-900 dark:hover:bg-white dark:hover:text-black transition">
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button onClick={() => setOpen(v => !v)} className="lg:hidden w-9 h-9 rounded-full border border-border flex items-center justify-center">
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="lg:hidden mx-6 mt-3 glass rounded-2xl p-6 flex flex-col gap-4">
            {navLinks.map(l => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="text-sm text-secondary hover:text-white py-1">{l.label}</a>
            ))}
            <div className="flex gap-2 pt-2">
              <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="flex-1 py-2.5 rounded-xl bg-white text-black text-center text-sm font-medium">GitHub</a>
              <a href="#contact" className="flex-1 py-2.5 rounded-xl border border-border text-center text-sm">Contact</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function Hero() {
  const role = useAnimatedRole()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const [typed, setTyped] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTyped(v => (v + 1) % 120), 60)
    return () => clearInterval(id)
  }, [])
  return (
    <section id="home" ref={ref} className="relative overflow-hidden pt-28 pb-10">
      <div className="absolute inset-0 grid-bg opacity-[0.6]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A0A0A]" />
      {/* glow */}
      <div className="absolute -top-32 -right-32 w-[520px] h-[520px] bg-accent/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-40 -left-40 w-[480px] h-[480px] bg-highlight/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div style={{ y, opacity }} className="relative container-max grid lg:grid-cols-[1.05fr_0.9fr] gap-10 items-center">
        <div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border text-xs text-secondary">
            <span className="w-2 h-2 rounded-full bg-accent2 animate-pulse" /> Available for opportunities <span className="hidden sm:inline text-zinc-600">•</span> <span className="hidden sm:inline">Open to internships & collaborations</span>
          </motion.div>

          <h1 className="mt-6 font-display font-bold tracking-tight leading-[0.95]">
            <span className="block text-4xl md:text-6xl lg:text-[64px]">Hi, I'm</span>
            <span className="block text-4xl md:text-6xl lg:text-[64px] bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">Rishikesh Pal.</span>
            <span className="block mt-2 text-2xl md:text-4xl lg:text-[40px] font-semibold text-zinc-300">I build modern web</span>
            <span className="block text-2xl md:text-4xl lg:text-[40px] font-semibold text-zinc-300">experiences.</span>
          </h1>

          <div className="mt-4 h-7 flex items-center gap-3 text-sm">
            <span className="text-secondary">—</span>
            <AnimatePresence mode="wait">
              <motion.span key={role} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.35 }} className="font-mono text-accent font-medium tracking-wide">
                {role}
              </motion.span>
            </AnimatePresence>
          </div>

          <p className="mt-4 max-w-[560px] text-secondary leading-relaxed text-[15px]">
            I'm a BSE/IT student and aspiring Full-Stack Developer passionate about building scalable, interactive and real-world web applications.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#projects" className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-semibold hover:bg-zinc-200 transition">View My Work <ArrowRight size={16} /></a>
            <a href={RESUME_URL} download className="inline-flex items-center gap-2 bg-card border border-border px-6 py-3 rounded-full text-sm font-medium hover:bg-zinc-900 transition"> <Download size={16} /> Download Resume</a>
          </div>
          <a href="#contact" className="inline-flex items-center gap-2 mt-4 text-sm text-secondary hover:text-white transition">Let's Connect <ArrowRight size={14} /></a>

          <div className="mt-8 flex items-center gap-4 text-xs text-secondary">
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition"><Github size={14} /> github.com/rishikesh-Dev01</a>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 hover:text-white transition"><Mail size={14} /> {EMAIL}</a>
          </div>
        </div>

        {/* Terminal */}
        <motion.div initial={{ opacity: 0, y: 20, rotate: -1 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ delay: 0.3 }} className="relative">
          <div className="rounded-[20px] bg-card border border-border overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-[#101010]">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-xs font-mono text-secondary flex items-center gap-2"><Terminal size={12} /> rishikesh@developer — zsh</span>
              <span className="w-6" />
            </div>
            <div className="p-5 font-mono text-sm leading-relaxed">
              <div className="text-secondary">$ whoami</div>
              <div className="text-accent2">rishikesh@developer</div>
              <div className="mt-3 space-y-1.5 text-secondary">
                <div className="flex gap-2"><span className="text-accent">&gt;</span> Full-Stack Developer</div>
                <div className="flex gap-2"><span className="text-accent">&gt;</span> JavaScript Enthusiast</div>
                <div className="flex gap-2"><span className="text-accent">&gt;</span> React Developer</div>
                <div className="flex gap-2"><span className="text-accent">&gt;</span> Backend Explorer</div>
                <div className="flex gap-2"><span className="text-highlight">&gt;</span> Always Learning<span className="inline-block w-2 h-4 bg-white/80 animate-pulse ml-1 translate-y-0.5" /></div>
              </div>
              <div className="mt-5 rounded-xl bg-[#0f0f0f] border border-border p-3 text-xs">
                <div className="text-zinc-500">$ cat stack.json</div>
                <pre className="mt-2 text-zinc-300 whitespace-pre-wrap break-words">{`{\n  "frontend": ["React", "Vite"],\n  "backend": ["Node", "Express"],\n  "db": ["MongoDB", "MySQL"]\n}`}</pre>
              </div>
              <div className="mt-4 flex gap-2">
                <span className="px-2 py-1 rounded bg-accent/20 text-accent text-xs">● building</span>
                <span className="px-2 py-1 rounded bg-zinc-800 text-zinc-400 text-xs">● learning</span>
                <span className="px-2 py-1 rounded bg-zinc-800 text-zinc-400 text-xs">{Math.round(typed / 1.2)}% shipped</span>
              </div>
            </div>
          </div>
          {/* floating badges */}
          <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity }} className="hidden md:flex absolute -right-4 -top-6 bg-white text-black px-3 py-2 rounded-xl text-xs font-semibold shadow-xl items-center gap-2">
            <Zap size={14} className="text-accent" /> Fast & Responsive
          </motion.div>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 6, repeat: Infinity }} className="hidden md:flex absolute -left-6 -bottom-6 glass px-3 py-2.5 rounded-xl text-xs items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent2" /> System operational
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

function Stats() {
  const stats = [
    { val: "10+", label: "Projects Built", sub: "and counting" },
    { val: "5+", label: "Technologies", sub: "in active use" },
    { val: "100%", label: "Learning Mindset", sub: "every day" },
    { val: "∞", label: "Curiosity", sub: "never stops" },
  ]
  return (
    <section className="border-y border-border bg-[#0f0f0f]">
      <div className="container-max grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
        {stats.map(s => (
          <div key={s.label} className="py-7 px-4 md:px-6 text-center md:text-left">
            <div className="text-2xl md:text-3xl font-bold tracking-tight">{s.val}</div>
            <div className="text-sm font-medium mt-1">{s.label}</div>
            <div className="text-xs text-secondary">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section-pad">
      <div className="container-max">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-8 h-[1px] bg-accent" />
          <span className="text-xs tracking-[0.2em] text-secondary uppercase">About Me</span>
        </div>
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">Passionate about building<br /><span className="text-zinc-400">real-world products.</span></h2>
            <p className="mt-4 text-secondary leading-relaxed">
              I'm Rishikesh Pal, a BSE/IT student passionate about software development and modern web technologies. I enjoy transforming ideas into interactive applications and continuously improving my understanding of frontend, backend and database technologies.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
              {[
                "Currently studying BSE/IT",
                "Strong interest in Web Development",
                "Learning Full-Stack Development",
                "Interested in real-world products",
                "Enjoy solving programming problems",
                "Continuously exploring new tech",
              ].map(i => (
                <div key={i} className="flex gap-2 items-start text-secondary"><Check size={16} className="text-accent2 mt-0.5 shrink-0" /> {i}</div>
              ))}
            </div>
            <div className="mt-8 flex gap-3">
              <a href="#contact" className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium">Let's talk</a>
              <a href="#journey" className="px-5 py-2.5 rounded-full border border-border text-sm">My journey</a>
            </div>
          </div>
          <div className="card p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-2xl rounded-full" />
            <div className="flex items-center gap-3">
              <img src={LOGO_URL} alt="Rishikesh Pal logo" className="w-12 h-12 rounded-xl object-cover border border-border shadow-[0_0_12px_rgba(0,180,255,0.3)] bg-black" />
              <div>
                <div className="text-sm font-semibold">Rishikesh Pal</div>
                <div className="text-xs text-secondary">Full-Stack Developer • India</div>
              </div>
              <span className="ml-auto w-2.5 h-2.5 rounded-full bg-accent2 animate-pulse" />
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-4">
                <div><div className="text-[11px] uppercase tracking-widest text-secondary">Name</div><div className="font-medium">Rishikesh Pal</div></div>
                <div><div className="text-[11px] uppercase tracking-widest text-secondary">Focus</div><div className="font-medium">Full-Stack Development</div></div>
                <div><div className="text-[11px] uppercase tracking-widest text-secondary">Interests</div><div className="text-secondary text-xs leading-relaxed">Web Development<br />Software Engineering<br />UI/UX • Technology</div></div>
              </div>
              <div className="space-y-4">
                <div><div className="text-[11px] uppercase tracking-widest text-secondary">Education</div><div className="font-medium">BSE / IT</div></div>
                <div><div className="text-[11px] uppercase tracking-widest text-secondary">Based In</div><div className="font-medium">India</div></div>
                <div className="rounded-xl bg-[#0f0f0f] border border-border p-3">
                  <div className="text-xs font-mono text-secondary">commit: "always learning"</div>
                  <div className="mt-2 h-1.5 bg-zinc-800 rounded-full overflow-hidden"><div className="h-full w-[82%] bg-accent rounded-full" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="section-pad bg-bg2 border-y border-border">
      <div className="container-max">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card border border-border text-xs text-secondary"><Sparkles size={12} /> Tech Stack</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold">My Tech Stack</h2>
          <p className="mt-2 text-secondary text-sm">Technologies I use to turn ideas into products — interactive cards, hover to see details.</p>
        </div>

        <div className="mt-10 space-y-8">
          {skillGroups.map(g => (
            <div key={g.title}>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-2 h-2 rounded-full" style={{ background: g.color }} />
                <h3 className="text-sm font-semibold tracking-wide">{g.title}</h3>
                <span className="h-[1px] flex-1 bg-border ml-2" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {g.items.map(s => (
                  <motion.div key={g.title + s.name} whileHover={{ y: -4, scale: 1.02 }} className="card p-4 group hover:border-zinc-700 transition cursor-default">
                    <div className="w-9 h-9 rounded-xl bg-[#0f0f0f] border border-border flex items-center justify-center text-sm group-hover:scale-110 transition">{s.icon}</div>
                    <div className="mt-3 text-sm font-medium">{s.name}</div>
                    <div className="text-xs text-secondary">{s.desc}</div>
                    <div className="mt-2 text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/5 inline-block">{g.title}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 card p-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h3 className="font-semibold flex items-center gap-2"><BookOpen size={16} className="text-accent" /> Currently Learning</h3>
            <span className="text-xs text-secondary">Editable progress — not verified claims</span>
          </div>
          <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentlyLearning.map(c => (
              <div key={c.name} className="rounded-xl bg-[#0f0f0f] border border-border p-4">
                <div className="flex justify-between text-sm"><span className="font-medium">{c.name}</span><span className="text-secondary">{c.progress}%</span></div>
                <div className="text-xs text-secondary">{c.note}</div>
                <div className="mt-3 h-1.5 bg-zinc-800 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} whileInView={{ width: `${c.progress}%` }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="h-full bg-accent rounded-full" /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Projects({ onSelect }: { onSelect: (id: string) => void }) {
  const [filter, setFilter] = useState("All")
  const filters = ["All", "Frontend", "Backend", "Full Stack", "AI", "Developer Tools"]
  const filtered = projectsData.filter(p => filter === "All" ? true : p.filter.includes(filter))
  return (
    <section id="projects" className="section-pad">
      <div className="container-max">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs tracking-[0.2em] text-secondary uppercase">Portfolio</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Things I've Built</h2>
            <p className="text-secondary text-sm mt-2 max-w-xl">Some of the projects I've worked on while learning, experimenting and solving real-world problems.</p>
          </div>
          <div className="flex gap-2 overflow-auto hide-scrollbar pb-1">
            {filters.map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full text-xs font-medium border whitespace-nowrap transition ${filter === f ? "bg-white text-black border-white" : "bg-card border-border text-secondary hover:text-white"}`}>{f}</button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {filtered.map(p => (
            <motion.div key={p.id} layout initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ y: -6 }} className="card overflow-hidden group">
              <div className="relative h-56 overflow-hidden">
                <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                <div className={`absolute inset-0 bg-gradient-to-t ${p.gradient} opacity-20 mix-blend-overlay`} />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur border border-white/10 text-[11px]">{p.category}</div>
                <div className="absolute top-3 right-3 flex gap-1.5">
                  {p.technologies.slice(0, 3).map(t => <span key={t} className="px-2 py-1 rounded-full bg-black/60 backdrop-blur text-[10px] border border-white/10">{t}</span>)}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-sm text-secondary mt-1 line-clamp-2">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.features.slice(0, 4).map(f => <span key={f} className="text-[11px] px-2 py-1 rounded-full bg-[#0f0f0f] border border-border text-secondary">{f}</span>)}
                  {p.features.length > 4 && <span className="text-[11px] px-2 py-1">+{p.features.length - 4} more</span>}
                </div>
                <div className="mt-4 flex gap-2">
                  <a href={p.github} target="_blank" rel="noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border text-sm hover:bg-white hover:text-black transition"><Github size={14} /> GitHub</a>
                  <a href={p.live} target="_blank" rel="noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white text-black text-sm font-medium"><Play size={14} /> Live Demo</a>
                </div>
                <button onClick={() => onSelect(p.id)} className="mt-2 w-full py-2.5 rounded-xl bg-card border border-border text-sm hover:bg-zinc-900 transition flex items-center justify-center gap-2">View Details <Eye size={14} /></button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectModal({ id, onClose }: { id: string | null; onClose: () => void }) {
  const proj = projectsData.find(p => p.id === id)
  if (!proj) return null
  return (
    <AnimatePresence>
      {id && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" />
          <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-[#0f0f0f] border border-border rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-auto">
              <div className="relative h-56">
                <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                <div className={`absolute inset-0 bg-gradient-to-t ${proj.gradient} opacity-40`} />
                <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center"><X size={14} /></button>
                <div className="absolute bottom-4 left-4">
                  <div className="text-xs px-2 py-1 rounded-full bg-black/60 border border-white/10 inline-block">{proj.category}</div>
                  <h3 className="text-2xl font-bold mt-2">{proj.title}</h3>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6 text-sm">
                  {[
                    ["Problem", proj.problem],
                    ["Solution", proj.solution],
                    ["Architecture", proj.architecture],
                    ["Challenges", proj.challenges],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-xl bg-card border border-border p-4">
                      <div className="text-xs uppercase tracking-widest text-secondary">{k}</div>
                      <div className="mt-1 text-secondary leading-relaxed">{v}</div>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl bg-accent/10 border border-accent/20 p-4">
                  <div className="text-sm font-medium flex items-center gap-2"><Lightbulb size={16} className="text-accent" /> What I Learned</div>
                  <div className="text-sm text-secondary mt-1">{proj.learned}</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {proj.technologies.map(t => <span key={t} className="px-3 py-1.5 rounded-full bg-card border border-border text-xs">{t}</span>)}
                </div>
                <div className="flex gap-2">
                  <a href={proj.github} target="_blank" rel="noreferrer" className="flex-1 py-3 rounded-xl border border-border text-center text-sm flex items-center justify-center gap-2"><Github size={16} /> GitHub</a>
                  <a href={proj.live} target="_blank" rel="noreferrer" className="flex-1 py-3 rounded-xl bg-white text-black text-center text-sm font-medium flex items-center justify-center gap-2"><ExternalLink size={16} /> Live Demo</a>
                  <button className="flex-1 py-3 rounded-xl bg-accent text-white text-sm flex items-center justify-center gap-2"><FileText size={16} /> Case Study</button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function Journey() {
  const steps = [
    { title: "Foundation", desc: "Started with programming fundamentals", items: ["C", "C++", "Data Structures", "Logic"], icon: Code2 },
    { title: "Web Development", desc: "Started building websites", items: ["HTML", "CSS", "JavaScript"], icon: Layers },
    { title: "Frontend Development", desc: "Moved into modern UI", items: ["React", "Vite", "Redux Toolkit"], icon: Sparkles },
    { title: "Backend Development", desc: "Started learning server side", items: ["Node.js", "Express", "REST APIs", "Auth"], icon: Server },
    { title: "Database", desc: "Worked with data layer", items: ["MySQL", "MongoDB", "Mongoose"], icon: Database },
    { title: "Full-Stack Projects", desc: "Combining everything into apps", items: ["KitchenOS AI", "Wanderlust", "Civic Platform"], icon: Boxes },
    { title: "Current Focus", desc: "Improving at scale", items: ["TypeScript", "Advanced React", "System Design"], icon: Rocket },
  ]
  return (
    <section id="journey" className="section-pad bg-bg2 border-y border-border">
      <div className="container-max">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">My Development Journey</h2>
          <p className="text-secondary text-sm mt-2">Animated timeline — how I learned step by step.</p>
        </div>
        <div className="mt-10 relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-border md:-translate-x-1/2" />
          <div className="space-y-6">
            {steps.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className={`relative flex ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} flex-row gap-4 md:gap-0`}>
                <div className="md:w-1/2 flex md:justify-end md:pr-10 pl-10 md:pl-0">
                  <div className={`card p-5 w-full md:max-w-[420px] ${i === steps.length - 1 ? "border-accent/40 bg-accent/5" : ""}`}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#0f0f0f] border border-border flex items-center justify-center"><s.icon size={14} /></div>
                      <div className="font-semibold text-sm">{s.title}</div>
                      <span className="ml-auto text-[11px] px-2 py-1 rounded-full bg-white/5 border border-white/5">0{i + 1}</span>
                    </div>
                    <div className="text-xs text-secondary mt-1">{s.desc}</div>
                    <div className="mt-3 flex flex-wrap gap-1.5">{s.items.map(it => <span key={it} className="text-xs px-2 py-1 rounded-full bg-[#0f0f0f] border border-border">{it}</span>)}</div>
                  </div>
                </div>
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-accent border-2 border-bg2 -translate-x-1/2 mt-6 shadow-[0_0_0_4px_rgba(99,102,241,0.2)]" />
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProblemSolving() {
  return (
    <section className="section-pad">
      <div className="container-max grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <span className="text-xs tracking-[0.2em] text-secondary uppercase">Mindset</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">I Don't Just Build —<br />I Debug.</h2>
          <p className="text-secondary text-sm mt-3">Development is iterative: understand → debug → experiment → fix → improve.</p>
          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs">
            {["Problem", "Understand", "Debug", "Experiment", "Fix", "Improve"].map((k, i) => (
              <span key={k} className="flex items-center gap-2">
                <span className={`px-3 py-1.5 rounded-full border ${i === 2 ? "bg-accent text-white border-accent" : "bg-card border-border"}`}>{k}</span>
                {i < 5 && <ChevronRight size={12} className="text-secondary" />}
              </span>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            {["C/C++ programming", "JavaScript debugging", "React errors", "Node.js errors", "MongoDB issues", "MySQL errors", "Git/GitHub", "API development", "UI/UX problems"].map(t => (
              <span key={t} className="px-3 py-2 rounded-xl bg-card border border-border text-secondary">{t}</span>
            ))}
          </div>
        </div>
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-[#0f0f0f]">
            <span className="text-xs font-mono flex items-center gap-2"><Bug size={12} /> debug_session.log</span>
            <span className="text-xs px-2 py-1 rounded bg-accent2/20 text-accent2">● debugging</span>
          </div>
          <div className="p-5 font-mono text-xs leading-relaxed space-y-2">
            <div className="text-red-400">✗ Error: Cannot read property 'data' of undefined</div>
            <div className="text-secondary">→ console.log(req.body) // undefined</div>
            <div className="text-yellow-400">⚠ Fix: Added express.json() middleware</div>
            <div className="text-accent2">✓ Resolved in 12m 34s</div>
            <div className="mt-3 p-3 rounded-xl bg-[#0f0f0f] border border-border">
              <div className="text-zinc-500">$ git diff</div>
              <div className="text-emerald-400">+ app.use(express.json())</div>
              <div className="text-emerald-400">+ app.use(cors())</div>
            </div>
            <div className="flex gap-2 pt-2">
              <span className="px-2 py-1 rounded bg-white text-black text-xs">Retry</span>
              <span className="px-2 py-1 rounded border border-border text-xs">Explain</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Philosophy() {
  const cards = [
    { title: "Learn", desc: "Understand the fundamentals before depending on abstractions.", icon: BookOpen, color: "text-accent" },
    { title: "Build", desc: "Turn concepts into real working applications.", icon: Boxes, color: "text-accent2" },
    { title: "Debug", desc: "Treat errors as part of the development process.", icon: Bug, color: "text-highlight" },
    { title: "Improve", desc: "Continuously refactor, optimize and learn.", icon: Rocket, color: "text-violet-400" },
  ]
  return (
    <section className="section-pad bg-bg2 border-y border-border">
      <div className="container-max">
        <h2 className="text-3xl font-bold text-center">How I Build</h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map(c => (
            <motion.div key={c.title} whileHover={{ y: -4 }} className="card p-6">
              <c.icon className={c.color} size={20} />
              <h3 className="font-semibold mt-3">{c.title}</h3>
              <p className="text-sm text-secondary mt-1">{c.desc}</p>
              <div className="mt-4 h-1 bg-zinc-800 rounded-full overflow-hidden"><div className="h-full w-2/3 bg-white/20 rounded-full" /></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CurrentlyExploring() {
  const items = [
    { name: "TypeScript", icon: "TS", desc: "Strict types" },
    { name: "Advanced React", icon: "⚛", desc: "Perf patterns" },
    { name: "Node.js", icon: "⬢", desc: "Backend core" },
    { name: "API Architecture", icon: "⇄", desc: "REST design" },
    { name: "MongoDB", icon: "⬡", desc: "Aggregations" },
    { name: "System Design", icon: "▦", desc: "Scale" },
    { name: "AI Integration", icon: "✦", desc: "LLMs" },
    { name: "UI/UX", icon: "◐", desc: "Design sys" },
  ]
  return (
    <section className="section-pad">
      <div className="container-max">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-3xl font-bold">Currently Exploring</h2>
            <p className="text-secondary text-sm mt-1">A futuristic learning dashboard — editable progress indicators.</p>
          </div>
          <span className="text-xs px-3 py-1.5 rounded-full bg-card border border-border">8 active tracks</span>
        </div>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map(it => (
            <div key={it.name} className="card p-5 group hover:border-accent/30 transition">
              <div className="w-10 h-10 rounded-xl bg-[#0f0f0f] border border-border flex items-center justify-center text-sm group-hover:scale-110 transition">{it.icon}</div>
              <div className="font-medium text-sm mt-3">{it.name}</div>
              <div className="text-xs text-secondary">{it.desc}</div>
              <div className="mt-3 flex gap-1">{Array.from({ length: 4 }).map((_, i) => <div key={i} className={`h-1 flex-1 rounded-full ${i < 3 ? "bg-accent" : "bg-zinc-800"}`} />)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Experience() {
  const exps = [
    { title: "Project Development", desc: "Built 10+ projects combining frontend, backend and database.", icon: Boxes },
    { title: "Frontend Practice", desc: "Crafted responsive, accessible UIs with React & Tailwind.", icon: Layers },
    { title: "Backend Practice", desc: "Designed REST APIs, auth, and middleware with Express.", icon: Server },
    { title: "Database Practice", desc: "Modeled data with MongoDB/Mongoose & MySQL.", icon: Database },
    { title: "Problem Solving", desc: "Debugged real errors across the stack daily.", icon: Bug },
  ]
  return (
    <section id="experience" className="section-pad bg-bg2 border-y border-border">
      <div className="container-max">
        <h2 className="text-3xl font-bold">Development Experience</h2>
        <p className="text-secondary text-sm mt-2">No fake employment — real practice, real projects, real learning.</p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {exps.map(e => (
            <div key={e.title} className="card p-6">
              <e.icon size={18} className="text-accent" />
              <h3 className="font-semibold mt-3 text-sm">{e.title}</h3>
              <p className="text-xs text-secondary mt-1 leading-relaxed">{e.desc}</p>
            </div>
          ))}
          <div className="card p-6 bg-accent text-white border-accent">
            <Brain size={18} />
            <h3 className="font-semibold mt-3 text-sm">Academic + Self Learning</h3>
            <p className="text-xs text-white/80 mt-1">BSE/IT studies + continuous self-driven experimentation.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function ResumeCTA() {
  return (
    <section className="section-pad bg-bg2 border-y border-border">
      <div className="container-max">
        <div className="card p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-br from-card to-[#1a1a1a]">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Want to know more about my journey?</h2>
            <p className="text-secondary text-sm mt-2 max-w-xl">Take a closer look at my education, technical skills, projects and development experience.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <a href={RESUME_URL} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-full bg-white text-black text-sm font-medium flex items-center gap-2"><Eye size={16} /> View Resume</a>
            <a href={RESUME_URL} download className="px-6 py-3 rounded-full border border-border text-sm flex items-center gap-2"><Download size={16} /> Download</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact({ toast }: { toast: (m: string) => void }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sending, setSending] = useState(false)
  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = "Name required"
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Valid email required"
    if (!form.subject.trim()) e.subject = "Subject required"
    if (form.message.trim().length < 10) e.message = "At least 10 characters"
    setErrors(e)
    return Object.keys(e).length === 0
  }
  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    setSending(true)
    try {
      const res = await submitContact(form)
      toast(res.message || "Message sent — I'll get back soon!")
      setForm({ name: "", email: "", subject: "", message: "" })
      setErrors({})
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.response?.data?.errors || err.message
      if (err?.response?.data?.errors) setErrors(err.response.data.errors)
      else toast(typeof msg === "string" ? msg : "Offline mode — message saved locally")
      // Fallback: still show success locally if backend down
      if (!err?.response) {
        toast("Backend offline — message queued (demo)")
        setForm({ name: "", email: "", subject: "", message: "" })
      }
    } finally {
      setSending(false)
    }
  }
  return (
    <section id="contact" className="section-pad">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-10">
          <div>
            <span className="text-xs tracking-[0.2em] text-secondary uppercase">Contact</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">Let's Build Something<br />Together</h2>
            <p className="text-secondary text-sm mt-3">Have an idea, project or opportunity? I'd love to hear about it.</p>
            <div className="mt-6 space-y-3 text-sm">
              <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="flex items-center gap-3 card px-4 py-3 hover:border-zinc-700 transition"><Github size={16} /> github.com/rishikesh-Dev01</a>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="flex items-center gap-3 card px-4 py-3 hover:border-zinc-700 transition"><Linkedin size={16} /> linkedin.com/in/rishikesh-pal-0508b5398</a>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 card px-4 py-3 hover:border-zinc-700 transition"><Mail size={16} /> {EMAIL}</a>
            </div>
            <div className="mt-6 rounded-2xl bg-[#0f0f0f] border border-border p-4 font-mono text-xs">
              <div className="text-secondary">&gt; connection.request()</div>
              <div className="text-accent2 mt-1">status: waiting...</div>
              <div className="mt-2 text-white">&gt; Let's build something great.</div>
              <div className="mt-3 flex gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span className="w-2 h-2 rounded-full bg-yellow-500" />
                <span className="w-2 h-2 rounded-full bg-green-500" />
              </div>
            </div>
          </div>
          <form onSubmit={submit} className="card p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-secondary">Name</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Rishikesh Pal" className="mt-1 w-full px-3 py-2.5 rounded-xl bg-[#0f0f0f] border border-border text-sm outline-none focus:border-accent" />
                {errors.name && <span className="text-xs text-red-400 flex items-center gap-1 mt-1"><AlertCircle size={12} /> {errors.name}</span>}
              </div>
              <div>
                <label className="text-xs text-secondary">Email</label>
                <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" className="mt-1 w-full px-3 py-2.5 rounded-xl bg-[#0f0f0f] border border-border text-sm outline-none focus:border-accent" />
                {errors.email && <span className="text-xs text-red-400 flex items-center gap-1 mt-1"><AlertCircle size={12} /> {errors.email}</span>}
              </div>
            </div>
            <div>
              <label className="text-xs text-secondary">Subject</label>
              <input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} placeholder="Project inquiry" className="mt-1 w-full px-3 py-2.5 rounded-xl bg-[#0f0f0f] border border-border text-sm outline-none focus:border-accent" />
              {errors.subject && <span className="text-xs text-red-400 flex items-center gap-1 mt-1"><AlertCircle size={12} /> {errors.subject}</span>}
            </div>
            <div>
              <label className="text-xs text-secondary">Message</label>
              <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={4} placeholder="Tell me about your idea..." className="mt-1 w-full px-3 py-2.5 rounded-xl bg-[#0f0f0f] border border-border text-sm outline-none focus:border-accent resize-none" />
              {errors.message && <span className="text-xs text-red-400 flex items-center gap-1 mt-1"><AlertCircle size={12} /> {errors.message}</span>}
            </div>
            <button disabled={sending} className="w-full py-3 rounded-xl bg-white text-black font-medium text-sm flex items-center justify-center gap-2 hover:bg-zinc-200 transition disabled:opacity-60">
              {sending ? "Sending..." : <>Send Message <Send size={16} /></>}
            </button>
            <p className="text-xs text-secondary text-center">Avg response time: ~24h • No spam</p>
          </form>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" })
  return (
    <footer className="border-t border-border py-8">
      <div className="container-max flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <span className="text-secondary">© 2026 Rishikesh Pal</span>
        <span className="flex items-center gap-2 text-secondary">Built with <span className="text-white flex items-center gap-1"><Code2 size={14} /> React</span> • Tailwind • Framer Motion</span>
        <div className="flex items-center gap-3">
          <img src={LOGO_URL} alt="RP" className="w-8 h-8 rounded-full object-cover border border-border hidden sm:block" />
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-white hover:text-black transition"><Github size={14} /></a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-white hover:text-black transition"><Linkedin size={14} /></a>
          <a href={`mailto:${EMAIL}`} className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-white hover:text-black transition"><Mail size={14} /></a>
          <button onClick={scrollTop} className="ml-2 px-4 py-2 rounded-full border border-border text-xs flex items-center gap-1 hover:bg-white hover:text-black transition">Back to top <ArrowUp size={12} /></button>
        </div>
      </div>
    </footer>
  )
}

function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; if (dotRef.current) { dotRef.current.style.left = mx - 3 + "px"; dotRef.current.style.top = my - 3 + "px" } }
    const loop = () => {
      rx += (mx - rx) * 0.13
      ry += (my - ry) * 0.13
      if (ringRef.current) { ringRef.current.style.left = rx - 18 + "px"; ringRef.current.style.top = ry - 18 + "px" }
      requestAnimationFrame(loop)
    }
    loop()
    window.addEventListener("mousemove", onMove)
    const addHover = () => {
      document.querySelectorAll("a,button,.card").forEach(el => {
        el.addEventListener("mouseenter", () => {
          ringRef.current?.classList.add("hovered")
          dotRef.current?.classList.add("hovered")
        })
        el.addEventListener("mouseleave", () => {
          ringRef.current?.classList.remove("hovered")
          dotRef.current?.classList.remove("hovered")
        })
      })
    }
    addHover()
    const mo = new MutationObserver(addHover)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => { window.removeEventListener("mousemove", onMove); mo.disconnect() }
  }, [])
  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}

// ---------- Main App ----------
export default function App() {
  const [theme, setTheme] = useState("dark")
  const [projectId, setProjectId] = useState<string | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [loaderProgress, setLoaderProgress] = useState(0)

  useEffect(() => {
    let p = 0
    const id = setInterval(() => {
      p += Math.random() * 18 + 8
      if (p >= 100) { p = 100; setLoaderProgress(100); clearInterval(id); setTimeout(() => setLoading(false), 450) }
      else setLoaderProgress(Math.round(p))
    }, 120)
    return () => clearInterval(id)
  }, [])
  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light")
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])
  useEffect(() => {
    if (toast) {
      const id = setTimeout(() => setToast(null), 2500)
      return () => clearTimeout(id)
    }
  }, [toast])

  if (loading) {
    return (
      <div className="cinematic-loader">
        <canvas id="webgl-canvas" />
        <div className="hud-overlay" />
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <img src={LOGO_URL} alt="RP logo" className="w-20 h-20 rounded-2xl object-cover border border-white/10 shadow-[0_0_28px_rgba(0,229,255,0.45)] mb-6" />
          <div className="cyber-glitch-text" data-text="SYSTEM INITIALIZING">SYSTEM INITIALIZING</div>
          <div className="loader-bar-container">
            <div className="loader-bar" style={{ width: `${loaderProgress}%` }} />
          </div>
          <div className="loader-percentage">{loaderProgress}%</div>
          <p className="text-[11px] tracking-[0.32em] text-zinc-500 mt-3">RISHIKESH PAL • BUILD • LEARN • GROW</p>
          <p className="text-[10px] tracking-[0.2em] text-zinc-600 mt-8">CINEMATIC PORTFOLIO • {new Date().getFullYear()}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-[#050508] text-white" : "bg-[#fafafa] text-zinc-900"} selection:bg-accent selection:text-white relative`}>
      <canvas id="webgl-canvas" />
      <div className="hud-overlay" />
      <PageSlideProgress />
      <Cursor />
      <Navbar theme={theme} toggleTheme={() => setTheme(t => t === "dark" ? "light" : "dark")} />
      <main className="overflow-x-hidden relative z-[5]">
        <Reveal direction="up"><Hero /></Reveal>
        <Reveal direction="up" delay={0.06}><Stats /></Reveal>
        <Reveal direction="left"><About /></Reveal>
        <Reveal direction="right"><Skills /></Reveal>
        <Reveal direction="up"><Projects onSelect={setProjectId} /></Reveal>
        <ProjectModal id={projectId} onClose={() => setProjectId(null)} />
        <Reveal direction="left"><Journey /></Reveal>
        <Reveal direction="right"><ProblemSolving /></Reveal>
        <Reveal direction="up"><Philosophy /></Reveal>
        <Reveal direction="up"><CurrentlyExploring /></Reveal>
        <Reveal direction="left"><Experience /></Reveal>
        <Reveal direction="up"><ResumeCTA /></Reveal>
        <Reveal direction="up"><Contact toast={setToast} /></Reveal>
      </main>
      <Footer />

      {/* toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white text-black px-5 py-3 rounded-full shadow-xl text-sm font-medium flex items-center gap-2 z-50">
            <Check size={16} className="text-accent2" /> {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* search / quick palette (decorative) */}
      <div className="fixed bottom-6 right-6 hidden md:flex">
        <button onClick={() => setToast("Press ⌘K soon — command palette coming")} className="glass px-3 py-2 rounded-full text-xs flex items-center gap-2 text-secondary">
          <Search size={12} /> ⌘K
        </button>
      </div>
    </div>
  )
}
