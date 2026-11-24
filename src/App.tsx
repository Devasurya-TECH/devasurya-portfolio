import { CSSProperties, FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Copy,
  FileCode2,
  Mail,
  Menu,
  Monitor,
  Moon,
  Send,
  Sun,
  X,
} from 'lucide-react'
import Cursor from './Cursor'
import { usePointerEffects } from './effects'
import { interests, profile, Project, projects, skillColumns, socials, timeline, training } from './data'

/* ------------------------------------------------------------------ */
/* Theme: follows the system until the visitor picks one explicitly.   */
/* ------------------------------------------------------------------ */

type ThemePref = 'system' | 'light' | 'dark'
const DARK_QUERY = '(prefers-color-scheme: dark)'

function readStoredTheme(): ThemePref {
  try {
    const value = localStorage.getItem('theme')
    return value === 'light' || value === 'dark' ? value : 'system'
  } catch {
    return 'system'
  }
}

function useTheme() {
  const [pref, setPref] = useState<ThemePref>(readStoredTheme)
  const [systemDark, setSystemDark] = useState(() => window.matchMedia(DARK_QUERY).matches)

  useEffect(() => {
    const media = window.matchMedia(DARK_QUERY)
    const onChange = (event: MediaQueryListEvent) => setSystemDark(event.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const resolved: 'light' | 'dark' = pref === 'system' ? (systemDark ? 'dark' : 'light') : pref

  useEffect(() => {
    const root = document.documentElement
    root.dataset.theme = resolved
    root.style.colorScheme = resolved
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', resolved === 'dark' ? '#161616' : '#f7f4f0')
  }, [resolved])

  useEffect(() => {
    try {
      if (pref === 'system') localStorage.removeItem('theme')
      else localStorage.setItem('theme', pref)
    } catch {
      /* storage unavailable: theme still works for this visit */
    }
  }, [pref])

  return { pref, resolved, setPref }
}

/* ------------------------------------------------------------------ */
/* Scroll helpers                                                      */
/* ------------------------------------------------------------------ */

function useReveal() {
  useEffect(() => {
    const root = document.documentElement
    const items = document.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!('IntersectionObserver' in window)) return
    root.classList.add('reveal-ready')
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // A data attribute, not a class: React rewrites className on re-render and would wipe it.
          (entry.target as HTMLElement).dataset.revealed = 'true'
          observer.unobserve(entry.target)
        }
      }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])
}

const sections = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'journey', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

function useActiveSection() {
  const [active, setActive] = useState('')
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
      const line = window.innerHeight * 0.35
      let current = ''
      for (const { id } of sections) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      setActive(window.scrollY < 120 ? '' : current)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])
  return { active, progress }
}

function useCopy() {
  const [copied, setCopied] = useState<string | null>(null)
  const copy = useCallback(async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(key)
      window.setTimeout(() => setCopied((value) => (value === key ? null : value)), 1800)
    } catch {
      window.prompt('Copy this:', text)
    }
  }, [])
  return { copied, copy }
}

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

function Nav({ theme }: { theme: ReturnType<typeof useTheme> }) {
  const [open, setOpen] = useState(false)
  const { active, progress } = useActiveSection()
  const ref = useRef<HTMLElement>(null)
  const activeLabel = sections.find((s) => s.id === active)?.label

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false) }
    const onClick = (event: MouseEvent) => { if (!ref.current?.contains(event.target as Node)) setOpen(false) }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [open])

  const close = () => setOpen(false)
  const options: { value: ThemePref; label: string; icon: typeof Sun }[] = [
    { value: 'system', label: 'System', icon: Monitor },
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
  ]

  return (
    <header className="topbar" ref={ref}>
      <a className="brand" href="#top" aria-label="Back to top">
        Devaah.
        <span className={activeLabel ? 'brand-section is-visible' : 'brand-section'} aria-hidden="true">{activeLabel ?? ''}</span>
      </a>
      <div className="top-actions">
        <button
          className="icon-button"
          type="button"
          onClick={() => theme.setPref(theme.resolved === 'dark' ? 'light' : 'dark')}
          aria-label={theme.resolved === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {theme.resolved === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="site-menu" aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
      <span className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />

      <nav id="site-menu" className={open ? 'site-menu is-open' : 'site-menu'} aria-label="Main navigation" hidden={!open}>
        {sections.map((section, index) => (
          <a key={section.id} href={`#${section.id}`} onClick={close} aria-current={active === section.id ? 'true' : undefined}>
            <span>0{index + 1}</span>{section.label}<ArrowUpRight size={17} />
          </a>
        ))}
        <a href={profile.github} target="_blank" rel="noreferrer" onClick={close}>
          <span>06</span>GitHub<ArrowUpRight size={17} />
        </a>
        <div className="theme-switch" role="radiogroup" aria-label="Colour theme">
          {options.map(({ value, label, icon: Icon }) => (
            <button key={value} type="button" role="radio" aria-checked={theme.pref === value} className={theme.pref === value ? 'is-active' : ''} onClick={() => theme.setPref(value)}>
              <Icon size={14} />{label}
            </button>
          ))}
        </div>
      </nav>
    </header>
  )
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function Letters({ text, start = 0 }: { text: string; start?: number }) {
  return <>{text.split('').map((char, i) => <span className="ch" key={i} style={{ '--i': start + i } as CSSProperties}>{char}</span>)}</>
}

function Hero() {
  return (
    <section id="top" className="hero section" aria-label="Introduction">
      <h1 className="hero-headline" aria-label="ML Engineer">
        <span className="hero-line" aria-hidden="true"><span className="bracket bracket-open">&lt;</span><Letters text="ML" start={1} /></span>
        <span className="hero-line" aria-hidden="true"><Letters text="ENGINEER" start={3} /><span className="bracket bracket-close">/&gt;</span></span>
      </h1>
      <div className="hero-stage">
        <div className="hero-meta hero-year">©2026</div>
        <figure className="hero-card" data-cursor="Hi there!" data-tilt>
          <img className="portrait-image" src={`${import.meta.env.BASE_URL}images/devasurya-portrait.png`} alt="Portrait of Devasurya M" fetchPriority="high" />
          <div className="portrait-scan" aria-hidden="true" />
          <figcaption className="portrait-copy"><span>{profile.location}</span><strong>learning<br />by building</strong></figcaption>
        </figure>
        <div className="hero-meta hero-tag">{'{{ /AI + ML/ }}'}</div>
      </div>
      <a className="scroll-cue" href="#about" aria-label="Scroll to about"><span /></a>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="about-copy" data-reveal>
        <span className="section-index">01 / About</span>
        <h2 id="about-title">Hi, I’m<br />Devaah.</h2>
        <p className="about-role">Aspiring ML Engineer<br />& AI Developer.</p>
        <div className="now-card" data-spot>
          <span className="now-dot" aria-hidden="true" />
          <small>Currently</small>
          <div className="now-row">
            <strong>Chief Technology Officer</strong>
            <span><a href={profile.reboundLabs} target="_blank" rel="noreferrer">Rebound Labs</a> · Part-time · Founding team</span>
          </div>
          <div className="now-row">
            <strong>AI/ML Engineering Program</strong>
            <span>Brototype · {profile.location}</span>
          </div>
        </div>
        <p className="about-lede">
          I’m studying AI/ML and <mark>sharpening my skills by building</mark> — from predictive HR models to a deep-learning OCR pipeline — while leading the technical side of a small product studio.
        </p>
        <dl className="stats">
          <div><dt>Featured builds</dt><dd>3</dd></div>
          <div><dt>Team coordinated</dt><dd>5–6</dd></div>
          <div><dt>Week AI/ML program</dt><dd>52</dd></div>
        </dl>
        <div className="about-actions">
          <a className="solid-link" href="#work" data-magnetic="0.35">Explore projects <ArrowDownRight size={18} /></a>
          <a className="under-link" href="#contact">Get in touch <ArrowUpRight size={16} /></a>
        </div>
      </div>
      <figure className="about-photo" data-reveal>
        <img src={`${import.meta.env.BASE_URL}images/devasurya-portrait.png`} alt="" loading="lazy" />
        <figcaption><span>{profile.name}</span><span>Est. Kerala</span></figcaption>
      </figure>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

function Skills() {
  return (
    <section id="skills" className="section skills" aria-labelledby="skills-title">
      <div className="section-heading" data-reveal>
        <div><span className="section-index">02 / Tech stack</span><h2 id="skills-title">Tech<br />Stack</h2></div>
        <p>The tools behind<br />my work.</p>
      </div>
      <div className="skill-grid">
        {skillColumns.map((column, colIndex) => (
          <article className={`skill-column skill-column-${colIndex + 1}`} key={column.title} data-reveal>
            <div className="rule" />
            <h3>{column.title}</h3>
            <p>{column.description}</p>
            <ul className="chips">
              {column.core.map((item) => <li className="chip chip-dark" key={item}>{item}</li>)}
              {column.items.map((item) => <li className="chip" key={item}>{item}</li>)}
            </ul>
          </article>
        ))}
      </div>
      <p className="skills-legend" data-reveal><span><i className="chip chip-dark" aria-hidden="true" />Used hands-on in featured projects</span><span><i className="chip" aria-hidden="true" />Working knowledge from training</span></p>
    </section>
  )
}

function Interests() {
  const row = [...interests, ...interests]
  return (
    <div className="ticker" aria-label={`Interests: ${interests.join(', ')}`}>
      <div className="ticker-track" aria-hidden="true">
        {row.map((item, i) => <span key={i}>{item}<i>✦</i></span>)}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Work: folders that open into a detail panel                         */
/* ------------------------------------------------------------------ */

function Folder({ project, open, onToggle }: { project: Project; open: boolean; onToggle: () => void }) {
  return (
    <div className={`project-wrap project-${project.accent}${open ? ' is-open' : ''}`} data-reveal>
      <button className="folder" type="button" onClick={onToggle} aria-expanded={open} aria-controls="project-detail" data-cursor={open ? 'Close' : 'Open'}>
        <span className="folder-back" aria-hidden="true" />
        <span className="folder-paper paper-1" aria-hidden="true" />
        <span className="folder-paper paper-2" aria-hidden="true"><FileCode2 size={14} /></span>
        <span className="folder-front" data-spot>
          <span className="folder-title">{project.title}</span>
          <span className="folder-arrow" aria-hidden="true">{open ? <X size={17} /> : <ArrowUpRight size={17} />}</span>
        </span>
      </button>
      <div className="project-caption">
        <span>{project.tag}</span>
        <span>{open ? 'Close' : 'Open'} · {project.kind}</span>
      </div>
    </div>
  )
}

function ProjectDetail({ project, onClose }: { project: Project; onClose: () => void }) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const top = el.getBoundingClientRect().top
    if (top > window.innerHeight * 0.7 || top < 0) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    el.focus({ preventScroll: true })
  }, [project.id])

  return (
    <article id="project-detail" className="project-detail" ref={ref} tabIndex={-1} aria-label={`${project.title} details`} key={project.id}>
      <div className="detail-head">
        <span>Project details</span>
        <button className="round-button" type="button" onClick={onClose} aria-label="Close project details"><X size={17} /></button>
      </div>
      <div className="detail-body">
        <div className="spec-window" aria-label={`${project.title} at a glance`}>
          <div className="spec-bar"><i /><i /><i /><span>{project.id}.spec</span></div>
          <dl>
            {project.spec.map(([key, value], i) => (
              <div key={key} style={{ '--i': i } as CSSProperties}><dt>{key}</dt><dd>{value}</dd></div>
            ))}
          </dl>
          <span className="spec-cursor" aria-hidden="true">▍</span>
        </div>
        <div className="detail-copy">
          <p className="detail-tag">{project.tag}</p>
          <h3>{project.title}</h3>
          <p className="detail-summary">{project.summary}</p>
          <ul className="detail-highlights">
            {project.highlights.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <p className="detail-stack">{project.stack.join('  /  ')}</p>
          {project.note && <p className="detail-note">{project.note}</p>}
          <div className="detail-links">
            {project.links.map((link) => {
              const external = link.href.startsWith('http')
              return (
                <a key={link.href} className="pill-link" data-magnetic="0.3" href={link.href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
                  {link.label} <ArrowUpRight size={15} />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </article>
  )
}

function Work() {
  const [openId, setOpenId] = useState<string | null>(null)
  const openProject = projects.find((p) => p.id === openId)

  useEffect(() => {
    if (!openId) return
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpenId(null) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [openId])

  return (
    <section id="work" className="section work" aria-labelledby="work-title">
      <div className="work-title-row" data-reveal>
        <div><span className="section-index">03 / Projects</span><h2 id="work-title">Featured<br />Projects</h2></div>
        <a className="under-link" href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={16} /></a>
      </div>
      <p className="work-lede" data-reveal>Machine learning, deep learning and full-stack builds. Open a folder to see how each one works.</p>
      <div className="project-grid">
        {projects.map((project) => (
          <Folder key={project.id} project={project} open={openId === project.id} onToggle={() => setOpenId(openId === project.id ? null : project.id)} />
        ))}
      </div>
      {openProject && <ProjectDetail project={openProject} onClose={() => setOpenId(null)} />}
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Journey: timeline + learning map                                    */
/* ------------------------------------------------------------------ */

function Journey() {
  return (
    <section id="journey" className="section journey" aria-labelledby="journey-title">
      <div className="section-heading" data-reveal>
        <div><span className="section-index">04 / Experience</span><h2 id="journey-title">Experience.</h2></div>
        <p>Leading builds today.<br />Training for what’s next.</p>
      </div>

      <ol className="timeline" data-reveal>
        {timeline.map((item, i) => (
          <li key={item.title} className={[item.current && 'is-current', item.muted && 'is-muted'].filter(Boolean).join(' ')} style={{ '--i': i } as CSSProperties}>
            <span className="node" aria-hidden="true" />
            <span className="when">{item.current ? <b>Current</b> : null}{item.when}</span>
            <h3>{item.title}</h3>
            <p className="place">
              {item.placeHref ? <a href={item.placeHref} target="_blank" rel="noreferrer">{item.place} <ArrowUpRight size={13} /></a> : item.place}
            </p>
            {item.meta && <p className="meta">{item.meta}</p>}
            <p>{item.detail}</p>
            {item.points && <ul className="points">{item.points.map((point) => <li key={point}>{point}</li>)}</ul>}
          </li>
        ))}
      </ol>

      <div className="learning-head" data-reveal>
        <div>
          <h3>Training map</h3>
          <p>{training.program}</p>
        </div>
        <span className="learning-status"><span className="now-dot" aria-hidden="true" />Currently pursuing</span>
      </div>
      <div className="map-grid" data-reveal>
        {training.modules.map(([number, title, detail]) => (
          <article className="map-card" key={number} data-spot>
            <span className="map-number">{number}</span>
            <div><h4>{title}</h4><p>{detail}</p></div>
          </article>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

function LocalTime() {
  const format = () => new Intl.DateTimeFormat('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit', hour12: true }).format(new Date())
  const [time, setTime] = useState(format)
  useEffect(() => {
    const id = window.setInterval(() => setTime(format()), 15000)
    return () => window.clearInterval(id)
  }, [])
  return <p className="local-time"><span className="now-dot" aria-hidden="true" />Kochi, India · <time>{time.toUpperCase()}</time> IST</p>
}

function Contact() {
  const { copied, copy } = useCopy()
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const direct = Boolean(profile.formspreeId)

  const draftEmail = (name: string, email: string, note: string) => {
    const subject = encodeURIComponent(`Portfolio enquiry from ${name || 'a visitor'}`)
    const body = encodeURIComponent(`${note}\n\n— ${name}\n${email}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formEl = event.currentTarget
    const form = new FormData(formEl)
    const name = String(form.get('name') || '').trim()
    const email = String(form.get('email') || '').trim()
    const note = String(form.get('message') || '').trim()

    if (!direct) return draftEmail(name, email, note)

    setStatus('sending')
    form.set('_subject', `Portfolio message from ${name || 'a visitor'}`)
    try {
      const response = await fetch(`https://formspree.io/f/${profile.formspreeId}`, {
        method: 'POST',
        body: form,
        headers: { Accept: 'application/json' },
      })
      if (!response.ok) throw new Error(`Formspree responded ${response.status}`)
      formEl.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="contact-intro" data-reveal>
        <span className="section-index">05 / Contact</span>
        <h2 id="contact-title">Let’s talk<br />about <i>AI.</i></h2>
        <p>Want to talk machine learning, swap ideas, or build something together? My inbox is open.</p>
        <div className="email-row">
          <a href={`mailto:${profile.email}`}><Mail size={18} />{profile.email}</a>
          <button type="button" className="round-button" onClick={() => copy('email', profile.email)} aria-label="Copy email address">
            {copied === 'email' ? <Check size={16} /> : <Copy size={16} />}
          </button>
          <span className="copy-toast" role="status">{copied === 'email' ? 'Copied' : ''}</span>
        </div>
        <LocalTime />
        <ul className="social-list">
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer"><span>{s.label}</span><span>{s.handle}</span><ArrowUpRight size={16} /></a>
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit} className="contact-form" data-spot data-reveal aria-busy={status === 'sending'}>
        {status === 'sent' ? (
          <div className="form-success" role="status">
            <span className="form-success-icon"><Check size={22} /></span>
            <h3>Message sent.</h3>
            <p>Thanks for reaching out — I’ll get back to you soon.</p>
            <button type="button" className="under-link" onClick={() => setStatus('idle')}>Send another <ArrowUpRight size={15} /></button>
          </div>
        ) : (
          <>
            <label>Your name<input name="name" required autoComplete="name" placeholder="What should I call you?" /></label>
            <label>Email address<input name="email" required type="email" autoComplete="email" placeholder="you@company.com" /></label>
            <label>What do you have in mind?<textarea name="message" required rows={4} placeholder="An idea, a question, or just a hello…" /></label>
            {/* Spam trap: hidden from people, bots fill it in and Formspree drops the message. */}
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="honeypot" aria-hidden="true" />
            <button className="submit-button" type="submit" data-magnetic="0.3" disabled={status === 'sending'}>
              {direct ? (status === 'sending' ? 'Sending…' : 'Send message') : 'Create email draft'} <Send size={17} />
            </button>
            {status === 'error' ? (
              <small className="form-note form-error" role="alert">
                Couldn’t send right now. Please email me at <a href={`mailto:${profile.email}`}>{profile.email}</a>.
              </small>
            ) : (
              <small className="form-note">{direct ? 'Goes straight to my inbox.' : 'Opens your email app with the message ready to send.'}</small>
            )}
          </>
        )}
      </form>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <div className="footer-word">Devaah.</div>
        <p>Aspiring ML Engineer<br />& AI Developer.</p>
      </div>
      <nav className="footer-nav" aria-label="Footer">
        <span>Explore</span>
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#work">Work</a>
        <a href="#journey">Learning</a>
        <a href="#contact">Contact</a>
      </nav>
      <div className="footer-bottom">
        <span>© 2026 {profile.name} · Kerala, India</span>
        <a href="#top">Back to top <ArrowUpRight size={15} /></a>
      </div>
    </footer>
  )
}

export default function App() {
  const theme = useTheme()
  useReveal()
  usePointerEffects()
  return (
    <>
      <a className="skip-link" href="#about">Skip to content</a>
      <Cursor />
      <Nav theme={theme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Interests />
        <Work />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
