import { useState, useEffect, useRef } from 'react'
import './index.css'
import { projects } from './data/projects'
import { skillGroups, currentlyLearning } from './data/skills'

// ============ CONSTANTS ============
const GITHUB_URL = 'https://github.com/rishikesh-Dev01'
const LINKEDIN_URL = 'https://www.linkedin.com/in/rishikesh-pal-0508b5398/'
const EMAIL = 'rishikeshpal937@gmail.com'
const RESUME_URL = '/Rishikesh_Pal_Resume.pdf'

const certificates = [
  {
    title: 'Rishikesh Certificate',
    issuer: 'Certified Achievement',
    file: '/Rishikesh certificate.pdf',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80&auto=format&fit=crop',
    color: '#6366F1',
    desc: 'Professional certification showcasing completed training and verified skills.',
  },
  {
    title: 'YouTube BluePrint',
    issuer: 'YouTube Certified',
    file: '/YouTube BluePrint.pdf',
    image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&q=80&auto=format&fit=crop',
    color: '#FF0000',
    desc: 'YouTube Blueprint certification — content strategy, growth and channel optimization.',
  },
]

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Experience', href: '#experience' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
]

const roles = ['Full-Stack Developer', 'Frontend Developer', 'JavaScript Developer', 'Problem Solver']

const stats = [
  { val: '10+', label: 'Projects Built', sub: 'and counting' },
  { val: '5+', label: 'Technologies', sub: 'in active use' },
  { val: '100%', label: 'Learning Mindset', sub: 'every day' },
  { val: '∞', label: 'Curiosity', sub: 'never stops' },
]

const checks = [
  'Currently studying BSE/IT',
  'Strong interest in Web Development',
  'Learning Full-Stack Development',
  'Interested in real-world products',
  'Enjoy solving programming problems',
  'Continuously exploring new tech',
]

const filters = ['All', 'Frontend', 'Backend', 'Full Stack', 'AI', 'Developer Tools']

const journeySteps = [
  { title: 'Foundation', desc: 'Started with programming fundamentals', items: ['C', 'C++', 'Data Structures', 'Logic'] },
  { title: 'Web Development', desc: 'Started building websites', items: ['HTML', 'CSS', 'JavaScript'] },
  { title: 'Frontend Development', desc: 'Moved into modern UI', items: ['React', 'Vite', 'Redux Toolkit'] },
  { title: 'Backend Development', desc: 'Started learning server side', items: ['Node.js', 'Express', 'REST APIs', 'Auth'] },
  { title: 'Database', desc: 'Worked with data layer', items: ['MySQL', 'MongoDB', 'Mongoose'] },
  { title: 'Full-Stack Projects', desc: 'Combining everything into apps', items: ['Recall AI', 'Wanderlust', 'Civic Platform'] },
  { title: 'Current Focus', desc: 'Improving at scale', items: ['TypeScript', 'Advanced React', 'System Design'] },
]

const debugSteps = ['Problem', 'Understand', 'Debug', 'Experiment', 'Fix', 'Improve']
const debugTags = ['C/C++ programming', 'JavaScript debugging', 'React errors', 'Node.js errors', 'MongoDB issues', 'MySQL errors', 'Git/GitHub', 'API development', 'UI/UX problems']

const philosophy = [
  { title: 'Learn', desc: 'Understand the fundamentals before depending on abstractions.', color: '#6366F1' },
  { title: 'Build', desc: 'Turn concepts into real working applications.', color: '#22C55E' },
  { title: 'Debug', desc: 'Treat errors as part of the development process.', color: '#38BDF8' },
  { title: 'Improve', desc: 'Continuously refactor, optimize and learn.', color: '#a78bfa' },
]

const exploring = [
  { name: 'TypeScript', icon: 'TS', desc: 'Strict types' },
  { name: 'Advanced React', icon: '⚛', desc: 'Perf patterns' },
  { name: 'Node.js', icon: '⬢', desc: 'Backend core' },
  { name: 'API Architecture', icon: '⇄', desc: 'REST design' },
  { name: 'MongoDB', icon: '⬡', desc: 'Aggregations' },
  { name: 'System Design', icon: '▦', desc: 'Scale' },
  { name: 'AI Integration', icon: '✦', desc: 'LLMs' },
  { name: 'UI/UX', icon: '◐', desc: 'Design sys' },
]

const experiences = [
  { title: 'Project Development', desc: 'Built 10+ projects combining frontend, backend and database.' },
  { title: 'Frontend Practice', desc: 'Crafted responsive, accessible UIs with React & Tailwind.' },
  { title: 'Backend Practice', desc: 'Designed REST APIs, auth, and middleware with Express.' },
  { title: 'Database Practice', desc: 'Modeled data with MongoDB/Mongoose & MySQL.' },
  { title: 'Problem Solving', desc: 'Debugged real errors across the stack daily.' },
]

// ============ HOOKS ============
function useRole() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % roles.length), 1800)
    return () => clearInterval(id)
  }, [])
  return roles[idx]
}

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.15 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

function useCursor() {
  useEffect(() => {
    const dot = document.getElementById('cursorDot')
    const ring = document.getElementById('cursorRing')
    if (!dot || !ring) return
    let mx = 0, my = 0, rx = 0, ry = 0
    const onMove = e => { mx = e.clientX; my = e.clientY; dot.style.left = mx - 3 + 'px'; dot.style.top = my - 3 + 'px' }
    window.addEventListener('mousemove', onMove)
    let raf
    const loop = () => {
      rx += (mx - rx) * 0.13; ry += (my - ry) * 0.13
      ring.style.left = rx - 18 + 'px'; ring.style.top = ry - 18 + 'px'
      raf = requestAnimationFrame(loop)
    }
    loop()
    const onEnter = () => { ring.classList.add('hovered'); dot.classList.add('hovered') }
    const onLeave = () => { ring.classList.remove('hovered'); dot.classList.remove('hovered') }
    const bindHover = () => {
      document.querySelectorAll('a,button,.card,.skill-card,.project-card,.filter-btn').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    bindHover()
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])
}

// ============ LOADER ============
function Loader({ done }) {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    if (done) return
    const t = setInterval(() => {
      setPct(p => {
        const next = p + Math.random() * 18 + 8
        if (next >= 100) { clearInterval(t); return 100 }
        return next
      })
    }, 120)
    return () => clearInterval(t)
  }, [done])
  return (
    <div className="cinematic-loader" style={{ display: done ? 'none' : 'flex' }}>
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 1.5rem' }}>
        <div style={{ width: 80, height: 80, borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,.1)', boxShadow: '0 0 28px rgba(0,229,255,.45)', marginBottom: 24, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, letterSpacing: 2 }}>RP</div>
        <div className="cyber-glitch-text" data-text="SYSTEM INITIALIZING">SYSTEM INITIALIZING</div>
        <div className="loader-bar-container">
          <div className="loader-bar" style={{ width: Math.round(pct) + '%' }} />
        </div>
        <div className="loader-percentage">{Math.round(pct)}%</div>
        <p style={{ fontSize: 11, letterSpacing: '.32em', color: '#71717a', marginTop: 12 }}>RISHIKESH PAL • BUILD • LEARN • GROW</p>
        <p style={{ fontSize: 10, letterSpacing: '.2em', color: '#52525b', marginTop: 32 }}>CINEMATIC PORTFOLIO • {new Date().getFullYear()}</p>
      </div>
    </div>
  )
}

// ============ NAVBAR ============
function Navbar({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])
  const closeMenu = () => setOpen(false)
  return (
    <header id="navbar" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, transition: 'all .3s', padding: scrolled ? '12px 0' : '20px 0' }}>
      <div className="container-max" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', ...(scrolled ? { background: 'rgba(22,22,22,.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(38,38,38,.8)', borderRadius: 16, padding: '14px 20px', boxShadow: '0 8px 32px rgba(0,0,0,.3)' } : {}) }}>
        <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none', color: 'inherit' }}>
          <div style={{ width: 36, height: 36, borderRadius: 12, background: '#000', border: '1px solid #262626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 13, boxShadow: '0 0 12px rgba(0,180,255,.35)' }}>RP</div>
          <span style={{ fontWeight: 600, letterSpacing: '-.02em', fontSize: 15 }}>Rishikesh Pal</span>
          <span style={{ fontSize: 11, padding: '4px 8px', borderRadius: 999, background: '#1c1c1c', border: '1px solid #262626', color: '#A1A1AA' }} className="hide-on-mobile">Available for opportunities</span>
        </a>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="desktop-nav">
          {navLinks.map(l => <a key={l.href} href={l.href} className="nav-link">{l.label}</a>)}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" style={{ width: 36, height: 36, borderRadius: 999, border: '1px solid #262626', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: 'inherit', fontSize: 13 }}>◈</a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" style={{ width: 36, height: 36, borderRadius: 999, border: '1px solid #262626', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: 'inherit', fontSize: 11 }}>in</a>
          <button onClick={toggleTheme} aria-label="toggle theme" style={{ width: 36, height: 36, borderRadius: 999, border: '1px solid #262626', background: 'transparent', color: 'inherit', cursor: 'pointer', fontSize: 16 }}>{theme === 'dark' ? '☾' : '☀'}</button>
          <button onClick={() => setOpen(o => !o)} style={{ width: 36, height: 36, borderRadius: 999, border: '1px solid #262626', background: 'transparent', color: 'inherit', cursor: 'pointer', fontSize: 16 }} className="menu-btn">{open ? '✕' : '☰'}</button>
        </div>
      </div>
      {open && (
        <div style={{ margin: '12px 24px 0', background: 'rgba(22,22,22,.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(38,38,38,.8)', borderRadius: 16, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {navLinks.map(l => <a key={l.href} href={l.href} onClick={closeMenu} style={{ color: '#A1A1AA', textDecoration: 'none', fontSize: 14 }}>{l.label}</a>)}
        </div>
      )}
      <style>{`
        .hide-on-mobile { display: none; }
        .desktop-nav { display: none; }
        .menu-btn { display: flex; }
        @media (min-width: 768px) { .hide-on-mobile { display: inline-flex; } }
        @media (min-width: 1024px) { .desktop-nav { display: flex; } .menu-btn { display: none; } }
      `}</style>
    </header>
  )
}

// ============ HERO ============
function Hero({ role }) {
  return (
    <section id="home" style={{ position: 'relative', overflow: 'hidden', padding: '112px 0 40px' }}>
      <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: .6 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,transparent,transparent,#0A0A0A)' }} />
      <div style={{ position: 'absolute', top: -128, right: -128, width: 520, height: 520, background: 'rgba(99,102,241,.2)', filter: 'blur(120px)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 160, left: -160, width: 480, height: 480, background: 'rgba(56,189,248,.1)', filter: 'blur(120px)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div className="container-max" style={{ position: 'relative' }}>
        <div className="hero-grid">
          {/* Left */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 12px', borderRadius: 999, background: '#161616', border: '1px solid #262626', fontSize: 12, color: '#A1A1AA' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              Available for opportunities <span style={{ color: '#52525b' }}>•</span> Open to internships &amp; collaborations
            </div>
            <h1 style={{ marginTop: 24, fontFamily: "'Space Grotesk',sans-serif", fontWeight: 800, letterSpacing: '-.03em', lineHeight: .95 }}>
              <span style={{ display: 'block', fontSize: 'clamp(36px,6vw,64px)' }}>Hi, I'm</span>
              <span style={{ display: 'block', fontSize: 'clamp(36px,6vw,64px)', background: 'linear-gradient(to right,#fff,#e4e4e7,#71717a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Rishikesh Pal.</span>
              <span style={{ display: 'block', marginTop: 8, fontSize: 'clamp(24px,4vw,40px)', fontWeight: 600, color: '#d4d4d8' }}>I build modern web</span>
              <span style={{ display: 'block', fontSize: 'clamp(24px,4vw,40px)', fontWeight: 600, color: '#d4d4d8' }}>experiences.</span>
            </h1>
            <div style={{ marginTop: 16, height: 28, display: 'flex', alignItems: 'center', gap: 12, fontSize: 14 }}>
              <span style={{ color: '#A1A1AA' }}>—</span>
              <span style={{ fontFamily: "'JetBrains Mono',monospace", color: '#6366F1', fontWeight: 500, letterSpacing: '.05em' }}>{role}</span>
            </div>
            <p style={{ marginTop: 16, maxWidth: 560, color: '#A1A1AA', lineHeight: 1.6, fontSize: 15 }}>
              I'm a BSE/IT student and aspiring Full-Stack Developer passionate about building scalable, interactive and real-world web applications.
            </p>
            <div style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <a href="#projects" className="btn-primary">View My Work →</a>
              <a href={RESUME_URL} target="_blank" rel="noreferrer" className="btn-outline">👁 View Resume</a>
              <a href={RESUME_URL} download="Rishikesh_Pal_Resume.pdf" className="btn-outline">↓ Download Resume</a>
            </div>
            <a href="#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 16, fontSize: 14, color: '#A1A1AA', textDecoration: 'none' }}>Let's Connect →</a>
            <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 16, fontSize: 12, color: '#A1A1AA', flexWrap: 'wrap' }}>
              <a href={GITHUB_URL} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'inherit', textDecoration: 'none' }}>◈ github.com/rishikesh-Dev01</a>
              <a href={`mailto:${EMAIL}`} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'inherit', textDecoration: 'none' }}>✉ {EMAIL}</a>
            </div>
          </div>
          {/* Terminal */}
          <div style={{ position: 'relative' }}>
            <div style={{ borderRadius: 20, background: '#161616', border: '1px solid #262626', overflow: 'hidden', boxShadow: '0 25px 50px rgba(0,0,0,.5)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #262626', background: '#101010' }}>
                <div style={{ display: 'flex', gap: 6 }}>
                  <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
                  <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#eab308', display: 'inline-block' }} />
                  <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                </div>
                <span style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: '#A1A1AA' }}>▣ rishikesh@developer — zsh</span>
                <span style={{ width: 24 }} />
              </div>
              <div style={{ padding: 20, fontFamily: "'JetBrains Mono',monospace", fontSize: 14, lineHeight: 1.6 }}>
                <div style={{ color: '#A1A1AA' }}>$ whoami</div>
                <div style={{ color: '#22C55E' }}>rishikesh@developer</div>
                <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6, color: '#A1A1AA' }}>
                  <div><span style={{ color: '#6366F1' }}>&gt;</span> Full-Stack Developer</div>
                  <div><span style={{ color: '#6366F1' }}>&gt;</span> JavaScript Enthusiast</div>
                  <div><span style={{ color: '#6366F1' }}>&gt;</span> React Developer</div>
                  <div><span style={{ color: '#6366F1' }}>&gt;</span> Backend Explorer</div>
                  <div><span style={{ color: '#38BDF8' }}>&gt;</span> Always Learning<span style={{ display: 'inline-block', width: 8, height: 16, background: 'rgba(255,255,255,.8)', marginLeft: 4, verticalAlign: 'middle', animation: 'blink 1s step-end infinite' }} /></div>
                </div>
                <div style={{ marginTop: 20, borderRadius: 12, background: '#0f0f0f', border: '1px solid #262626', padding: 12, fontSize: 12 }}>
                  <div style={{ color: '#71717a' }}>$ cat stack.json</div>
                  <pre style={{ marginTop: 8, color: '#d4d4d8', whiteSpace: 'pre-wrap', wordBreak: 'break-word', marginBottom: 0 }}>{`{
  "frontend": ["React", "Vite"],
  "backend": ["Node", "Express"],
  "db": ["MongoDB", "MySQL"]
}`}</pre>
                </div>
                <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
                  <span style={{ padding: '4px 8px', borderRadius: 999, background: 'rgba(99,102,241,.2)', color: '#6366F1', fontSize: 12 }}>● building</span>
                  <span style={{ padding: '4px 8px', borderRadius: 999, background: '#27272a', color: '#A1A1AA', fontSize: 12 }}>● learning</span>
                  <span style={{ padding: '4px 8px', borderRadius: 999, background: '#27272a', color: '#A1A1AA', fontSize: 12 }}>82% shipped</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============ STATS ============
function Stats() {
  return (
    <section style={{ background: '#0f0f0f' }}>
      <div className="container-max">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="stat-item" style={{ padding: '28px 16px', textAlign: 'center', borderRight: '1px solid #262626', borderBottom: '1px solid #262626', cursor: 'default' }}>
              <div className="stat-val" style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-.02em' }}>{s.val}</div>
              <div style={{ fontSize: 14, fontWeight: 500, marginTop: 4 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: '#A1A1AA' }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============ ABOUT ============
function About() {
  return (
    <section id="about" className="section-pad reveal">
      <div className="container-max">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
          <span style={{ width: 32, height: 1, background: '#6366F1', display: 'inline-block' }} />
          <span style={{ fontSize: 12, letterSpacing: '.2em', color: '#A1A1AA', textTransform: 'uppercase' }}>About Me</span>
        </div>
        <div className="about-grid">
          <div>
            <h2 style={{ fontSize: 'clamp(28px,4vw,36px)', fontWeight: 700, letterSpacing: '-.02em', lineHeight: 1.1 }}>
              Passionate about building<br /><span style={{ color: '#71717a' }}>real-world products.</span>
            </h2>
            <p style={{ marginTop: 16, color: '#A1A1AA', lineHeight: 1.6 }}>
              I'm Rishikesh Pal, a BSE/IT student passionate about software development and modern web technologies. I enjoy transforming ideas into interactive applications and continuously improving my understanding of frontend, backend and database technologies.
            </p>
            <div className="about-checks" style={{ marginTop: 24, display: 'grid', gap: 12 }}>
              {checks.map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'start', color: '#A1A1AA', fontSize: 14 }}>
                  <span style={{ color: '#22C55E', marginTop: 2 }}>✓</span> {c}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
              <a href="#contact" className="btn-primary" style={{ padding: '10px 20px' }}>Let's talk</a>
              <a href="#journey" className="btn-outline" style={{ padding: '10px 20px' }}>My journey</a>
            </div>
          </div>
          <div className="card" style={{ padding: 24, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: 128, height: 128, background: 'rgba(99,102,241,.1)', filter: 'blur(32px)', borderRadius: '50%' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: '#000', border: '1px solid #262626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>RP</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>Rishikesh Pal</div>
                <div style={{ fontSize: 12, color: '#A1A1AA' }}>Full-Stack Developer • India</div>
              </div>
              <span style={{ marginLeft: 'auto', width: 10, height: 10, borderRadius: '50%', background: '#22C55E', display: 'inline-block', animation: 'pulse 2s infinite' }} />
            </div>
            <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, fontSize: 14 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div><div style={{ fontSize: 11, letterSpacing: '.1em', color: '#A1A1AA', textTransform: 'uppercase' }}>Name</div><div style={{ fontWeight: 500 }}>Rishikesh Pal</div></div>
                <div><div style={{ fontSize: 11, letterSpacing: '.1em', color: '#A1A1AA', textTransform: 'uppercase' }}>Focus</div><div style={{ fontWeight: 500 }}>Full-Stack Development</div></div>
                <div><div style={{ fontSize: 11, letterSpacing: '.1em', color: '#A1A1AA', textTransform: 'uppercase' }}>Interests</div><div style={{ color: '#A1A1AA', fontSize: 12, lineHeight: 1.6 }}>Web Development<br />Software Engineering<br />UI/UX • Technology</div></div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div><div style={{ fontSize: 11, letterSpacing: '.1em', color: '#A1A1AA', textTransform: 'uppercase' }}>Education</div><div style={{ fontWeight: 500 }}>BSE / IT</div></div>
                <div><div style={{ fontSize: 11, letterSpacing: '.1em', color: '#A1A1AA', textTransform: 'uppercase' }}>Based In</div><div style={{ fontWeight: 500 }}>India</div></div>
                <div style={{ borderRadius: 12, background: '#0f0f0f', border: '1px solid #262626', padding: 12 }}>
                  <div style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", color: '#A1A1AA' }}>commit: "always learning"</div>
                  <div style={{ marginTop: 8, height: 6, background: '#27272a', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: '82%', background: '#6366F1', borderRadius: 999 }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============ SKILLS ============
function Skills() {
  return (
    <section id="skills" className="section-pad reveal" style={{ background: '#111111', borderTop: '1px solid #262626', borderBottom: '1px solid #262626' }}>
      <div className="container-max">
        <div style={{ textAlign: 'center', maxWidth: 672, margin: '0 auto' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 12px', borderRadius: 999, background: '#161616', border: '1px solid #262626', fontSize: 12, color: '#A1A1AA' }}>✦ Tech Stack</span>
          <h2 style={{ marginTop: 12, fontSize: 'clamp(28px,4vw,36px)', fontWeight: 700 }}>My Tech Stack</h2>
          <p style={{ marginTop: 8, color: '#A1A1AA', fontSize: 14 }}>Technologies I use to turn ideas into products — interactive cards, hover to see details.</p>
        </div>
        <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 32 }}>
          {skillGroups.map((g, gi) => (
            <div key={gi}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: g.color, display: 'inline-block' }} />
                <h3 style={{ fontSize: 14, fontWeight: 600, letterSpacing: '.05em' }}>{g.title}</h3>
                <span style={{ height: 1, flex: 1, background: '#262626', marginLeft: 8 }} />
              </div>
              <div className="skills-grid-inner">
                {g.items.map((s, si) => (
                  <div key={si} className="card skill-card">
                    <div style={{ width: 36, height: 36, borderRadius: 12, background: '#0f0f0f', border: '1px solid #262626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{s.icon}</div>
                    <div style={{ marginTop: 12, fontSize: 14, fontWeight: 500 }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: '#A1A1AA' }}>{s.desc}</div>
                    <div style={{ marginTop: 8, fontSize: 10, padding: '2px 6px', borderRadius: 999, background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.05)', display: 'inline-block' }}>{g.title}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="card" style={{ marginTop: 48, padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <h3 style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>📖 Currently Learning</h3>
            <span style={{ fontSize: 12, color: '#A1A1AA' }}>Editable progress — not verified claims</span>
          </div>
          <div className="learning-wrap" style={{ marginTop: 20 }}>
            {currentlyLearning.map((c, i) => (
              <div key={i} style={{ borderRadius: 12, background: '#0f0f0f', border: '1px solid #262626', padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ fontWeight: 500 }}>{c.name}</span>
                  <span style={{ color: '#A1A1AA' }}>{c.progress}%</span>
                </div>
                <div style={{ fontSize: 12, color: '#A1A1AA' }}>{c.note}</div>
                <div style={{ marginTop: 12, height: 6, background: '#27272a', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: c.progress + '%', background: '#6366F1', borderRadius: 999 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ============ PROJECTS ============
function Projects() {
  const [active, setActive] = useState('All')
  const [modal, setModal] = useState(null)
  const filtered = active === 'All' ? projects : projects.filter(p => p.filter.includes(active))

  const openModal = (p) => { setModal(p); document.body.style.overflow = 'hidden' }
  const closeModal = () => { setModal(null); document.body.style.overflow = '' }

  useEffect(() => {
    const esc = e => { if (e.key === 'Escape') closeModal() }
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [])

  return (
    <section id="projects" className="section-pad reveal">
      <div className="container-max">
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'end', justifyContent: 'space-between', gap: 16 }}>
          <div>
            <span style={{ fontSize: 12, letterSpacing: '.2em', color: '#A1A1AA', textTransform: 'uppercase' }}>Portfolio</span>
            <h2 style={{ fontSize: 'clamp(28px,4vw,36px)', fontWeight: 700, marginTop: 8 }}>Things I've Built</h2>
            <p style={{ color: '#A1A1AA', fontSize: 14, marginTop: 8, maxWidth: 600 }}>Some of the projects I've worked on while learning, experimenting and solving real-world problems.</p>
          </div>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }} className="hide-scrollbar">
            {filters.map(f => (
              <button key={f} className={`filter-btn${active === f ? ' active' : ''}`} onClick={() => setActive(f)}>{f}</button>
            ))}
          </div>
        </div>
        <div className="projects-grid" style={{ marginTop: 32 }}>
          {filtered.map(p => (
            <div key={p.id} className="card project-card">
              <div style={{ position: 'relative', height: 224, overflow: 'hidden' }}>
                <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                <div style={{ position: 'absolute', inset: 0, background: p.gradient, opacity: .2 }} />
                <div style={{ position: 'absolute', top: 12, left: 12, padding: '4px 10px', borderRadius: 999, background: 'rgba(0,0,0,.6)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,.1)', fontSize: 11 }}>{p.category}</div>
                <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 6 }}>
                  {p.technologies.slice(0, 3).map(t => <span key={t} style={{ padding: '4px 8px', borderRadius: 999, background: 'rgba(0,0,0,.6)', backdropFilter: 'blur(8px)', fontSize: 10, border: '1px solid rgba(255,255,255,.1)' }}>{t}</span>)}
                </div>
              </div>
              <div style={{ padding: 20 }}>
                <h3 style={{ fontWeight: 600 }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: '#A1A1AA', marginTop: 4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.description}</p>
                <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {p.features.slice(0, 4).map(f => <span key={f} style={{ fontSize: 11, padding: '4px 8px', borderRadius: 999, background: '#0f0f0f', border: '1px solid #262626', color: '#A1A1AA' }}>{f}</span>)}
                  {p.features.length > 4 && <span style={{ fontSize: 11, padding: '4px 8px' }}>+{p.features.length - 4} more</span>}
                </div>
                <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
                  <a href={p.github} target="_blank" rel="noreferrer" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 10, borderRadius: 12, border: '1px solid #262626', fontSize: 14, textDecoration: 'none', color: 'inherit' }}>◈ GitHub</a>
                  <a href={p.live} target="_blank" rel="noreferrer" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: 10, borderRadius: 12, background: '#fff', color: '#000', fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>▶ Live Demo</a>
                </div>
                <button onClick={() => openModal(p)} style={{ marginTop: 8, width: '100%', padding: 10, borderRadius: 12, background: '#161616', border: '1px solid #262626', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer', color: 'inherit' }}>View Details 👁</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Modal */}
      {modal && (
        <>
          <div className="modal-overlay" onClick={closeModal} />
          <div className="modal-box" onClick={e => { if (e.target === e.currentTarget) closeModal() }}>
            <div className="modal-inner">
              <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
                <img src={modal.image} alt={modal.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: modal.gradient, opacity: .4 }} />
                <button onClick={closeModal} style={{ position: 'absolute', top: 12, right: 12, width: 32, height: 32, borderRadius: '50%', background: 'rgba(0,0,0,.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', color: '#fff', cursor: 'pointer' }}>✕</button>
                <div style={{ position: 'absolute', bottom: 16, left: 16 }}>
                  <div style={{ fontSize: 12, padding: '4px 8px', borderRadius: 999, background: 'rgba(0,0,0,.6)', border: '1px solid rgba(255,255,255,.1)', display: 'inline-block' }}>{modal.category}</div>
                  <h3 style={{ fontSize: 24, fontWeight: 700, marginTop: 8 }}>{modal.title}</h3>
                </div>
              </div>
              <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div className="modal-details">
                  {[['Problem', modal.problem], ['Solution', modal.solution], ['Architecture', modal.architecture], ['Challenges', modal.challenges]].map(([k, v]) => (
                    <div key={k} style={{ borderRadius: 12, background: '#161616', border: '1px solid #262626', padding: 16 }}>
                      <div style={{ fontSize: 11, letterSpacing: '.1em', color: '#A1A1AA', textTransform: 'uppercase' }}>{k}</div>
                      <div style={{ marginTop: 4, color: '#A1A1AA', lineHeight: 1.6, fontSize: 14 }}>{v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ borderRadius: 12, background: 'rgba(99,102,241,.1)', border: '1px solid rgba(99,102,241,.2)', padding: 16 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}>💡 What I Learned</div>
                  <div style={{ fontSize: 14, color: '#A1A1AA', marginTop: 4 }}>{modal.learned}</div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {modal.technologies.map(t => <span key={t} style={{ padding: '6px 12px', borderRadius: 999, background: '#161616', border: '1px solid #262626', fontSize: 12 }}>{t}</span>)}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <a href={modal.github} target="_blank" rel="noreferrer" style={{ flex: 1, padding: 12, borderRadius: 12, border: '1px solid #262626', textAlign: 'center', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, textDecoration: 'none', color: 'inherit' }}>◈ GitHub</a>
                  <a href={modal.live} target="_blank" rel="noreferrer" style={{ flex: 1, padding: 12, borderRadius: 12, background: '#fff', color: '#000', textAlign: 'center', fontSize: 14, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, textDecoration: 'none' }}>↗ Live Demo</a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  )
}

// ============ JOURNEY ============
function Journey() {
  return (
    <section id="journey" className="section-pad reveal" style={{ background: '#111111', borderTop: '1px solid #262626', borderBottom: '1px solid #262626' }}>
      <div className="container-max">
        {/* Centered heading with decorative side lines */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 56 }}>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, #6366F1)' }} />
          <div style={{ textAlign: 'center' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 14px', borderRadius: 999, background: '#161616', border: '1px solid rgba(99,102,241,.3)', fontSize: 11, color: '#6366F1', letterSpacing: '.15em', textTransform: 'uppercase', marginBottom: 10 }}>My Journey</span>
            <h2 style={{ fontSize: 'clamp(26px,4vw,36px)', fontWeight: 700, whiteSpace: 'nowrap' }}>My Development Journey</h2>
            <p style={{ color: '#A1A1AA', fontSize: 13, marginTop: 6 }}>How I learned — step by step.</p>
          </div>
          <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, #38BDF8, transparent)' }} />
        </div>

        {/* Timeline */}
        <div className="timeline-wrap" style={{ marginTop: 0 }}>
          {/* Vertical center line */}
          <div className="timeline-line" />

          {journeySteps.map((s, i) => (
            <div key={i} className="timeline-step">
              {/* Mobile: left-aligned card, Desktop: alternates */}
              <div className="timeline-card-col">
                <div
                  className="card journey-card"
                  style={{
                    padding: 20,
                    ...(i === journeySteps.length - 1
                      ? { borderColor: 'rgba(99,102,241,.45)', background: 'rgba(99,102,241,.06)' }
                      : {})
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: 8,
                      background: i === journeySteps.length - 1 ? 'rgba(99,102,241,.2)' : '#0f0f0f',
                      border: `1px solid ${i === journeySteps.length - 1 ? 'rgba(99,102,241,.5)' : '#262626'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12
                    }}>◈</div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{s.title}</div>
                    <span style={{
                      marginLeft: 'auto', fontSize: 10, padding: '3px 7px', borderRadius: 999,
                      background: i === journeySteps.length - 1 ? 'rgba(99,102,241,.2)' : 'rgba(255,255,255,.05)',
                      border: `1px solid ${i === journeySteps.length - 1 ? 'rgba(99,102,241,.4)' : 'rgba(255,255,255,.05)'}`,
                      color: i === journeySteps.length - 1 ? '#a5b4fc' : 'inherit'
                    }}>0{i + 1}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#A1A1AA', marginTop: 6 }}>{s.desc}</div>
                  <div className="timeline-tags" style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {s.items.map(it => (
                      <span key={it} style={{
                        fontSize: 11, padding: '3px 8px', borderRadius: 999,
                        background: '#0f0f0f', border: '1px solid #262626'
                      }}>{it}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Center dot column (visible on desktop) */}
              <div className="timeline-dot-col">
                <div className="timeline-dot" />
              </div>

              {/* Empty side (desktop layout spacer) */}
              <div className="timeline-empty" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============ DEBUG SECTION ============
function DebugSection() {
  return (
    <section className="section-pad reveal">
      <div className="container-max debug-grid">
        <div>
          <span style={{ fontSize: 12, letterSpacing: '.2em', color: '#A1A1AA', textTransform: 'uppercase' }}>Mindset</span>
          <h2 style={{ fontSize: 'clamp(28px,4vw,36px)', fontWeight: 700, marginTop: 8 }}>I Don't Just Build —<br />I Debug.</h2>
          <p style={{ color: '#A1A1AA', fontSize: 14, marginTop: 12 }}>Development is iterative: understand → debug → experiment → fix → improve.</p>
          <div style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, fontSize: 12 }}>
            {debugSteps.map((k, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ padding: '6px 12px', borderRadius: 999, border: `1px solid ${i === 2 ? '#6366F1' : '#262626'}`, background: i === 2 ? '#6366F1' : '#161616', color: i === 2 ? '#fff' : 'inherit' }}>{k}</span>
                {i < 5 && <span style={{ color: '#A1A1AA' }}>›</span>}
              </span>
            ))}
          </div>
          <div className="debug-tags" style={{ marginTop: 24, display: 'grid', gap: 8, fontSize: 12 }}>
            {debugTags.map(t => <span key={t} style={{ padding: '8px 12px', borderRadius: 12, background: '#161616', border: '1px solid #262626', color: '#A1A1AA' }}>{t}</span>)}
          </div>
        </div>
        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #262626', background: '#0f0f0f' }}>
            <span style={{ fontSize: 12, fontFamily: "'JetBrains Mono',monospace", display: 'flex', alignItems: 'center', gap: 8 }}>🐛 debug_session.log</span>
            <span style={{ fontSize: 12, padding: '4px 8px', borderRadius: 999, background: 'rgba(34,197,94,.2)', color: '#22C55E' }}>● debugging</span>
          </div>
          <div style={{ padding: 20, fontFamily: "'JetBrains Mono',monospace", fontSize: 12, lineHeight: 1.6, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ color: '#f87171' }}>✗ Error: Cannot read property 'data' of undefined</div>
            <div style={{ color: '#A1A1AA' }}>→ console.log(req.body) // undefined</div>
            <div style={{ color: '#facc15' }}>⚠ Fix: Added express.json() middleware</div>
            <div style={{ color: '#22C55E' }}>✓ Resolved in 12m 34s</div>
            <div style={{ marginTop: 12, padding: 12, borderRadius: 12, background: '#0f0f0f', border: '1px solid #262626' }}>
              <div style={{ color: '#71717a' }}>$ git diff</div>
              <div style={{ color: '#4ade80' }}>+ app.use(express.json())</div>
              <div style={{ color: '#4ade80' }}>+ app.use(cors())</div>
            </div>
            <div style={{ display: 'flex', gap: 8, paddingTop: 8 }}>
              <span style={{ padding: '4px 8px', borderRadius: 999, background: '#fff', color: '#000', fontSize: 12 }}>Retry</span>
              <span style={{ padding: '4px 8px', borderRadius: 999, border: '1px solid #262626', fontSize: 12 }}>Explain</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============ PHILOSOPHY ============
function Philosophy() {
  return (
    <section className="section-pad reveal" style={{ background: '#111111', borderTop: '1px solid #262626', borderBottom: '1px solid #262626' }}>
      <div className="container-max">
        <h2 style={{ fontSize: 30, fontWeight: 700, textAlign: 'center' }}>How I Build</h2>
        <div className="philosophy-wrap" style={{ marginTop: 32 }}>
          {philosophy.map((c, i) => (
            <div key={i} className="card" style={{ padding: 24 }}>
              <div className="phil-icon" style={{ color: c.color, fontSize: 24 }}>◈</div>
              <h3 style={{ fontWeight: 600, marginTop: 12 }}>{c.title}</h3>
              <p style={{ fontSize: 14, color: '#A1A1AA', marginTop: 4 }}>{c.desc}</p>
              <div style={{ marginTop: 16, height: 4, background: '#27272a', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '66%', background: `linear-gradient(90deg, ${c.color}, rgba(255,255,255,.1))`, borderRadius: 999 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============ EXPLORING ============
function Exploring() {
  return (
    <section className="section-pad reveal">
      <div className="container-max">
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <h2 style={{ fontSize: 30, fontWeight: 700 }}>Currently Exploring</h2>
            <p style={{ color: '#A1A1AA', fontSize: 14, marginTop: 4 }}>A futuristic learning dashboard — editable progress indicators.</p>
          </div>
          <span style={{ fontSize: 12, padding: '6px 12px', borderRadius: 999, background: '#161616', border: '1px solid #262626' }}>8 active tracks</span>
        </div>
        <div className="exploring-wrap" style={{ marginTop: 32 }}>
          {exploring.map((it, i) => (
            <div key={i} className="card" style={{ padding: 20 }}>
              <div className="skill-icon" style={{ width: 40, height: 40, borderRadius: 12, background: '#0f0f0f', border: '1px solid #262626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{it.icon}</div>
              <div style={{ fontWeight: 500, fontSize: 14, marginTop: 12 }}>{it.name}</div>
              <div style={{ fontSize: 12, color: '#A1A1AA' }}>{it.desc}</div>
              <div style={{ marginTop: 12, display: 'flex', gap: 4 }}>
                {[0, 1, 2, 3].map(j => (
                  <div key={j} className={j < 3 ? 'exp-bar-active' : ''} style={{ height: 4, flex: 1, borderRadius: 999, background: j < 3 ? '#6366F1' : '#27272a', position: 'relative', overflow: 'hidden' }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============ EXPERIENCE ============
function Experience() {
  return (
    <section id="experience" className="section-pad reveal" style={{ background: '#111111', borderTop: '1px solid #262626', borderBottom: '1px solid #262626' }}>
      <div className="container-max">
        <h2 style={{ fontSize: 30, fontWeight: 700 }}>Development Experience</h2>
        <p style={{ color: '#A1A1AA', fontSize: 14, marginTop: 8 }}>No fake employment — real practice, real projects, real learning.</p>
        <div className="exp-wrap" style={{ marginTop: 32 }}>
          {experiences.map((e, i) => (
            <div key={i} className="card" style={{ padding: 24 }}>
              <div style={{ color: '#6366F1', fontSize: 18 }}>◈</div>
              <h3 style={{ fontWeight: 600, marginTop: 12, fontSize: 14 }}>{e.title}</h3>
              <p style={{ fontSize: 12, color: '#A1A1AA', marginTop: 4, lineHeight: 1.6 }}>{e.desc}</p>
            </div>
          ))}
          <div className="card" style={{ padding: 24, background: '#6366F1', color: '#fff', borderColor: '#6366F1' }}>
            <div style={{ fontSize: 18 }}>🧠</div>
            <h3 style={{ fontWeight: 600, marginTop: 12, fontSize: 14 }}>Academic + Self Learning</h3>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,.8)', marginTop: 4 }}>BSE/IT studies + continuous self-driven experimentation.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============ ACHIEVEMENTS / CERTIFICATES ============
function Achievements() {
  return (
    <section id="achievements" className="section-pad reveal" style={{ background: '#111111', borderTop: '1px solid #262626', borderBottom: '1px solid #262626' }}>
      <div className="container-max">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <span style={{ width: 32, height: 1, background: '#6366F1', display: 'inline-block' }} />
          <span style={{ fontSize: 12, letterSpacing: '.2em', color: '#A1A1AA', textTransform: 'uppercase' }}>Achievements</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'end', justifyContent: 'space-between', gap: 16, marginBottom: 32 }}>
          <div>
            <h2 style={{ fontSize: 'clamp(28px,4vw,36px)', fontWeight: 700 }}>Certificates & Achievements</h2>
            <p style={{ color: '#A1A1AA', fontSize: 14, marginTop: 8, maxWidth: 600 }}>Verified certificates from <code style={{ background: '#161616', border: '1px solid #262626', padding: '2px 6px', borderRadius: 6, fontSize: 12 }}>public/</code> — click View to open in new tab, Download to save.</p>
          </div>
          <span style={{ fontSize: 12, padding: '6px 12px', borderRadius: 999, background: '#161616', border: '1px solid #262626', color: '#A1A1AA' }}>{certificates.length} certificates</span>
        </div>
        <div className="achievements-grid">
          {certificates.map((c, i) => (
            <div key={i} className="card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: 190, overflow: 'hidden', background: '#0f0f0f' }}>
                <img src={c.image} alt={c.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} loading="lazy" />
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${c.color}33, transparent)` }} />
                <div style={{ position: 'absolute', top: 12, left: 12, padding: '4px 10px', borderRadius: 999, background: 'rgba(0,0,0,.65)', border: '1px solid rgba(255,255,255,.12)', fontSize: 11, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: c.color, display: 'inline-block' }} />{c.issuer}
                </div>
                <div style={{ position: 'absolute', bottom: 12, left: 12, right: 12, background: 'rgba(0,0,0,.55)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 12, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>🎓</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.title}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,.7)' }}>PDF • Verified</div>
                  </div>
                </div>
              </div>
              <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 600 }}>{c.title}</h3>
                  <p style={{ fontSize: 13, color: '#A1A1AA', marginTop: 4, lineHeight: 1.5 }}>{c.desc}</p>
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
                  <a href={c.file} target="_blank" rel="noreferrer" className="btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '10px 14px', fontSize: 13 }}>👁 View</a>
                  <a href={c.file} download={c.file.split('/').pop()} className="btn-outline" style={{ flex: 1, justifyContent: 'center', padding: '10px 14px', fontSize: 13 }}>↓ Download</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============ RESUME CTA ============
function ResumeCTA() {
  return (
    <section className="section-pad reveal" style={{ background: '#111111', borderTop: '1px solid #262626', borderBottom: '1px solid #262626' }}>
      <div className="container-max">
        <div className="card" style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 24, background: 'linear-gradient(to bottom right,#161616,#1a1a1a)' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(20px,3vw,30px)', fontWeight: 700 }}>Want to know more about my journey?</h2>
            <p style={{ color: '#A1A1AA', fontSize: 14, marginTop: 8, maxWidth: 600 }}>Take a closer look at my education, technical skills, projects and development experience — resume available as PDF.</p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href={RESUME_URL} target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: '12px 24px' }}>👁 View Resume</a>
            <a href={RESUME_URL} download="Rishikesh_Pal_Resume.pdf" className="btn-outline" style={{ padding: '12px 24px' }}>↓ Download</a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============ CONTACT ============
function Contact({ toast }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)

  const validate = () => {
    const e = {}
    if (!name.trim()) e.name = 'Name required'
    if (!/^\S+@\S+\.\S+$/.test(email)) e.email = 'Valid email required'
    if (!subject.trim()) e.subject = 'Subject required'
    if (message.length < 10) e.message = 'At least 10 characters'
    return e
  }

  const submit = e => {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length) return
    setSending(true)
    setTimeout(() => {
      setSending(false)
      toast("Message sent — I'll get back soon! (mailto fallback)")
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('From: ' + name + ' <' + email + '>\n\n' + message)}`
      setName(''); setEmail(''); setSubject(''); setMessage(''); setErrors({})
    }, 600)
  }

  return (
    <section id="contact" className="section-pad reveal">
      <div className="container-max">
        <div className="contact-grid">
          <div>
            <span style={{ fontSize: 12, letterSpacing: '.2em', color: '#A1A1AA', textTransform: 'uppercase' }}>Contact</span>
            <h2 style={{ fontSize: 'clamp(28px,4vw,36px)', fontWeight: 700, marginTop: 8 }}>Let's Build Something<br />Together</h2>
            <p style={{ color: '#A1A1AA', fontSize: 14, marginTop: 12 }}>Have an idea, project or opportunity? I'd love to hear about it.</p>
            <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14 }}>
              <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="card" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', textDecoration: 'none', color: 'inherit' }}>◈ github.com/rishikesh-Dev01</a>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="card" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', textDecoration: 'none', color: 'inherit' }}>in linkedin.com/in/rishikesh-pal-0508b5398</a>
              <a href={`mailto:${EMAIL}`} className="card" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', textDecoration: 'none', color: 'inherit' }}>✉ {EMAIL}</a>
            </div>
            <div style={{ marginTop: 24, borderRadius: 16, background: '#0f0f0f', border: '1px solid #262626', padding: 16, fontFamily: "'JetBrains Mono',monospace", fontSize: 12 }}>
              <div style={{ color: '#A1A1AA' }}>&gt; connection.request()</div>
              <div style={{ color: '#22C55E', marginTop: 4 }}>status: waiting...</div>
              <div style={{ color: '#fff', marginTop: 8 }}>&gt; Let's build something great.</div>
              <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#eab308', display: 'inline-block' }} />
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
              </div>
            </div>
          </div>
          <form className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }} onSubmit={submit}>
            <div className="form-top-grid">
              <div>
                <label style={{ fontSize: 12, color: '#A1A1AA' }}>Name</label>
                <input id="fName" className="form-input" placeholder="Rishikesh Pal" value={name} onChange={e => setName(e.target.value)} />
                {errors.name && <div style={{ fontSize: 12, color: '#f87171', marginTop: 4 }}>{errors.name}</div>}
              </div>
              <div>
                <label style={{ fontSize: 12, color: '#A1A1AA' }}>Email</label>
                <input id="fEmail" className="form-input" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                {errors.email && <div style={{ fontSize: 12, color: '#f87171', marginTop: 4 }}>{errors.email}</div>}
              </div>
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#A1A1AA' }}>Subject</label>
              <input id="fSubject" className="form-input" placeholder="Project inquiry" value={subject} onChange={e => setSubject(e.target.value)} />
              {errors.subject && <div style={{ fontSize: 12, color: '#f87171', marginTop: 4 }}>{errors.subject}</div>}
            </div>
            <div>
              <label style={{ fontSize: 12, color: '#A1A1AA' }}>Message</label>
              <textarea id="fMessage" className="form-input" rows="4" placeholder="Tell me about your idea..." value={message} onChange={e => setMessage(e.target.value)} style={{ resize: 'none' }} />
              {errors.message && <div style={{ fontSize: 12, color: '#f87171', marginTop: 4 }}>{errors.message}</div>}
            </div>
            <button type="submit" id="sendBtn" disabled={sending} style={{ width: '100%', padding: 12, borderRadius: 12, background: '#fff', color: '#000', fontWeight: 500, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, border: 'none', cursor: 'pointer', opacity: sending ? .7 : 1 }}>
              {sending ? 'Sending...' : 'Send Message ✈'}
            </button>
            <p style={{ fontSize: 12, color: '#A1A1AA', textAlign: 'center' }}>Avg response time: ~24h • No spam</p>
          </form>
        </div>
      </div>
    </section>
  )
}

// ============ FOOTER ============
function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #262626', padding: '32px 0', position: 'relative', zIndex: 5 }}>
      <div className="container-max" style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', justifyContent: 'space-between', fontSize: 14 }}>
        <span style={{ color: '#A1A1AA' }}>© {new Date().getFullYear()} Rishikesh Pal</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#A1A1AA' }}>Built with <span style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: 4 }}>◈ React</span> • Vite • Vanilla CSS</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#000', border: '1px solid #262626', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12 }}>RP</div>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="footer-link">◈</a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="footer-link" style={{ fontSize: 11 }}>in</a>
          <a href={`mailto:${EMAIL}`} className="footer-link">✉</a>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ marginLeft: 8, padding: '8px 16px', borderRadius: 999, border: '1px solid #262626', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4, background: 'transparent', color: 'inherit', cursor: 'pointer' }}>Back to top ↑</button>
        </div>
      </div>
    </footer>
  )
}

// ============ SCROLL PROGRESS ============
function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const h = () => {
      const el = document.documentElement
      setProgress(el.scrollTop / (el.scrollHeight - el.clientHeight))
    }
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])
  return (
    <div className="scroll-progress-container">
      <div className="scroll-progress-bar" style={{ transform: `scaleX(${progress})` }} />
    </div>
  )
}

// ============ TOAST ============
function Toast({ msg, show }) {
  return (
    <div className={`toast${show ? ' show' : ''}`}>✓ {msg}</div>
  )
}

// ============ APP ============
export default function App() {
  const [theme, setTheme] = useState('dark')
  const [loaderDone, setLoaderDone] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const [toastShow, setToastShow] = useState(false)
  const role = useRole()
  useReveal()
  useCursor()

  // Loader timing
  useEffect(() => {
    const t = setTimeout(() => setLoaderDone(true), 2000)
    return () => clearTimeout(t)
  }, [])

  const toggleTheme = () => {
    setTheme(t => {
      const next = t === 'dark' ? 'light' : 'dark'
      document.documentElement.classList.toggle('light', next === 'light')
      document.documentElement.classList.toggle('dark', next === 'dark')
      document.body.style.background = next === 'dark' ? '#050508' : '#fafafa'
      document.body.style.color = next === 'dark' ? '#fff' : '#09090b'
      return next
    })
  }

  const showToast = (msg) => {
    setToastMsg(msg); setToastShow(true)
    setTimeout(() => setToastShow(false), 2500)
  }

  return (
    <>
      {/* Custom cursor */}
      <div id="cursorDot" className="cursor-dot" />
      <div id="cursorRing" className="cursor-ring" />
      {/* HUD Scanline overlay */}
      <div className="hud-overlay" />
      {/* WebGL-style background */}
      <div className="webgl-bg" />
      {/* Loader */}
      <Loader done={loaderDone} />
      {/* Scroll progress bar */}
      <ScrollProgress />
      {/* Toast */}
      <Toast msg={toastMsg} show={toastShow} />
      {/* Navbar */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main style={{ position: 'relative', zIndex: 5, overflowX: 'hidden' }}>
        <Hero role={role} />
        <div className="section-gap" />
        <Stats />
        <div className="section-gap" />
        <About />
        <div className="section-gap" />
        <Skills />
        <div className="section-gap" />
        <Projects />
        <div className="section-gap" />
        <Journey />
        <div className="section-gap" />
        <DebugSection />
        <div className="section-gap" />
        <Philosophy />
        <div className="section-gap" />
        <Exploring />
        <div className="section-gap" />
        <Achievements />
        <div className="section-gap" />
        <Experience />
        <div className="section-gap" />
        <ResumeCTA />
        <div className="section-gap" />
        <Contact toast={showToast} />
      </main>
      <Footer />
    </>
  )
}
