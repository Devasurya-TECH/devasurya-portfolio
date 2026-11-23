import { FormEvent, useEffect, useState } from 'react'
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Code2,
  Copy,
  FileCode2,
  Folder,
  GitFork,
  Menu,
  Moon,
  Send,
  Sun,
  X,
} from 'lucide-react'

type SkillColumn = { title: string; description: string; items: string[] }

const skillColumns: SkillColumn[] = [
  {
    title: 'Programming & Data',
    description: 'Python is my primary language for machine learning and data science.',
    items: ['Python', 'C', 'Java', 'SQL', 'NumPy', 'Pandas', 'Matplotlib', 'Git', 'GitHub', 'VS Code', 'Jupyter Notebook', 'Google Colab', 'Anaconda', 'Conda', 'Linux', 'Ubuntu', 'PostgreSQL', 'Render'],
  },
  {
    title: 'Machine Learning',
    description: 'Classical algorithms, practical evaluation, and data-driven iteration.',
    items: ['Scikit-learn', 'Linear Regression', 'Ridge Regression', 'Logistic Regression', 'Decision Trees', 'Random Forest', 'Gradient Boosting', 'XGBoost', 'K-Means', 'Hierarchical Clustering', 'DBSCAN', 'PCA', 't-SNE', 'SVD', 'Gradient Descent', 'Feature Engineering', 'Data Preprocessing', 'Model Evaluation'],
  },
  {
    title: 'Deep Learning & Vision',
    description: 'Neural networks, computer vision, and continuing practical experiments.',
    items: ['TensorFlow', 'Keras', 'PyTorch', 'Artificial Neural Networks', 'CNNs', 'RNNs', 'LSTM', 'GRU', 'Transformers', 'VAEs', 'GANs', 'Image Classification', 'CNN Architecture', 'Transfer Learning', 'Feature Extraction', 'Fine-Tuning', 'MobileNetV2', 'VGG', 'ResNet', 'Inception', 'U-Net', 'SegNet', 'Image Preprocessing'],
  },
]

const learningMap = [
  ['01', 'Programming Foundations', 'C, Java, OOP, Python & problem solving'],
  ['02', 'Math for ML', 'Linear algebra, calculus, probability & statistics'],
  ['03', 'Data Science', 'NumPy, Pandas, Matplotlib & exploratory analysis'],
  ['04', 'Classical ML', 'Regression, classification, clustering & evaluation'],
  ['05', 'Deep Learning', 'Networks, backpropagation, TensorFlow, Keras & PyTorch'],
  ['06', 'Computer Vision', 'CNNs, transfer learning, U-Net & SegNet experiments'],
  ['07', 'Advanced AI', 'RNNs, LSTMs, GRUs, NLP, GANs, VAEs & generative AI'],
  ['08', 'Engineering Practice', 'Projects, technical revision & interview preparation'],
]

const projects = [
  {
    title: 'TalentIQ',
    tag: 'AI-powered employee analytics',
    detail: 'An ML project using IBM HR Analytics data (1,470 records, 31 features) for regression and classification workflows.',
    link: 'https://github.com/Devasurya-TECH/TalentIQ-AI-Powered-Employee-Analytics',
    accent: 'dark',
  },
  {
    title: 'Vision Experiments',
    tag: 'Computer vision · Learning work',
    detail: 'Hands-on experiments with Fashion MNIST, Sign Language MNIST, CNN architectures, transfer learning, and segmentation models.',
    link: '#learning-map',
    accent: 'violet',
  },
  {
    title: 'Mehfilly',
    tag: 'Product concept · In discovery',
    detail: 'A conceptual social music-listening platform centred on shared rooms and listening experiences. Not presented as deployed work.',
    link: '#skills',
    accent: 'sage',
  },
]

function Nav({ dark, onTheme }: { dark: boolean; onTheme: () => void }) {
  const [open, setOpen] = useState(false)
  const links = ['About', 'Skills', 'Work', 'Learning', 'Contact']

  const closeNav = () => setOpen(false)
  return (
    <header className="topbar">
      <a className="brand" href="#about" aria-label="Devasurya home">Dev.</a>
      <div className="top-actions">
        <button className="icon-button" type="button" onClick={onTheme} aria-label="Toggle colour theme">
          {dark ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <button className="menu-button" type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="site-menu">
          {open ? <X size={19} /> : <Menu size={20} />}<span className="sr-only">Open navigation</span>
        </button>
      </div>
      <nav id="site-menu" className={open ? 'site-menu is-open' : 'site-menu'} aria-label="Main navigation">
        {links.map((link, index) => (
          <a key={link} href={`#${link === 'Learning' ? 'learning-map' : link === 'Work' ? 'work' : link.toLowerCase()}`} onClick={closeNav}>
            <span>0{index + 1}</span>{link}<ArrowUpRight size={18} />
          </a>
        ))}
        <a href="https://github.com/Devasurya-TECH" target="_blank" rel="noreferrer" onClick={closeNav}>
          <span>06</span>GitHub<ArrowUpRight size={18} />
        </a>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section id="about" className="hero section" aria-labelledby="hero-title">
      <h1 id="hero-title" className="hero-headline"><span>&lt;</span> ML <br /><em>ENGINEER</em><span>/&gt;</span></h1>
      <div className="hero-meta top">©2026</div>
      <div className="hero-meta bottom">{`{ /AI + ML/ }`}</div>
      <div className="hero-card" aria-label="Portrait of Devasurya M">
        <img className="portrait-image" src={`${import.meta.env.BASE_URL}images/devasurya-portrait.png`} alt="Devasurya M" />
        <div className="portrait-scan" />
        <Code2 className="portrait-mark" size={64} strokeWidth={1.25} />
        <div className="portrait-copy"><span>Kerala, India</span><strong>learning<br />by building</strong></div>
      </div>
      <div className="intro-grid">
        <p className="eyebrow">Hello, I’m <b>Devasurya M</b> — Deva.</p>
        <p className="intro-copy">An aspiring Machine Learning Engineer building intuition from the mathematics and internals of AI through practical experiments.</p>
        <a className="solid-link" href="#work">Explore projects <ArrowDownRight size={18} /></a>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="section skills" aria-labelledby="skills-title">
      <div className="section-heading"><h2 id="skills-title">Technical<br />Stack</h2><p>Implemented tools, practical<br />exposure, and ongoing learning.</p></div>
      <div className="skill-grid">
        {skillColumns.map((column, colIndex) => (
          <article className={`skill-column skill-column-${colIndex + 1}`} key={column.title}>
            <div className="rule" />
            <h3>{column.title}</h3>
            <p>{column.description}</p>
            <div className="chips">
              {column.items.map((item, index) => <span className={index % 4 === 0 ? 'chip chip-dark' : 'chip'} key={item}>{item}</span>)}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function ProjectFolder({ project, index }: { project: typeof projects[number]; index: number }) {
  return <a className={`project-wrap project-${project.accent}`} href={project.link} target={project.link.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
    <div className="folder-stack" aria-hidden="true"><span /><span /><span /></div>
    <article className="folder-card">
      <div className="folder-icon"><FileCode2 size={17} /></div>
      <h3>{project.title}</h3>
      <span className="folder-arrow"><ArrowUpRight size={18} /></span>
    </article>
    <div className="project-caption"><span>{project.tag}</span><span>{index === 0 ? 'GitHub' : index === 1 ? 'Learning work' : 'Concept'} <ArrowUpRight size={15} /></span></div>
    <p>{project.detail}</p>
  </a>
}

function Work() {
  return (
    <section id="work" className="section work" aria-labelledby="work-title">
      <div className="work-title-row"><h2 id="work-title">Selected<br />Work</h2><a className="github-link" href="https://github.com/Devasurya-TECH" target="_blank" rel="noreferrer"><GitFork size={18} /> GitHub <ArrowUpRight size={16} /></a></div>
      <p className="work-lede">A mix of completed project work, structured technical experiments, and an early product concept—described without unverified claims.</p>
      <div className="project-grid">{projects.map((project, index) => <ProjectFolder key={project.title} project={project} index={index} />)}</div>
    </section>
  )
}

function LearningMap() {
  return <section id="learning-map" className="section learning" aria-labelledby="learning-title">
    <div className="section-heading"><h2 id="learning-title">Learning<br />Journey</h2><p>Brototype · 52-week AI/ML program.<br />Approx. Module 28 complete; 21 modules/reviews remain.<br />Snapshot: 19 Nov 2026.</p></div>
    <div className="map-grid">
      {learningMap.map(([number, title, detail]) => <article className="map-card" key={number}>
      <span className="map-number">{number}</span><div><h3>{title}</h3><p>{detail}</p></div><ArrowUpRight size={18} />
      </article>)}
    </div>
  </section>
}

function Contact() {
  const [copied, setCopied] = useState(false)
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') || '')
    const email = String(form.get('email') || '')
    const note = String(form.get('note') || '')
    const subject = encodeURIComponent(`Portfolio enquiry from ${name || 'a visitor'}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${note}`)
    window.location.href = `mailto:?subject=${subject}&body=${body}`
  }
  const copyGithub = async () => {
    await navigator.clipboard.writeText('https://github.com/Devasurya-TECH')
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }
  return <section id="contact" className="section contact" aria-labelledby="contact-title">
    <div><h2 id="contact-title">Let’s talk<br />about <i>AI.</i></h2><p>I’m focused on growing into a Machine Learning Engineering role through hands-on projects, technical depth, and continuous learning.</p>
      <div className="contact-actions"><a className="under-link" href="https://github.com/Devasurya-TECH" target="_blank" rel="noreferrer">Visit GitHub <ArrowUpRight size={16} /></a><button className="under-link" onClick={copyGithub} type="button">{copied ? <><Check size={16} /> Copied</> : <><Copy size={16} /> Copy GitHub link</>}</button></div>
    </div>
    <form onSubmit={handleSubmit} className="contact-form">
      <label>Your name<input name="name" required placeholder="What should I call you?" /></label>
      <label>Email address<input name="email" required type="email" placeholder="you@example.com" /></label>
      <label>What do you have in mind?<textarea name="note" required rows={4} placeholder="A few words about your idea…" /></label>
      <button className="submit-button" type="submit">Create email draft <Send size={17} /></button>
    </form>
  </section>
}

const crowdPeople = [
  ['short', 'curly', 'light'], ['tall', 'cap', 'dark'], ['mid', 'bob', 'light'], ['tall', 'wavy', 'dark'],
  ['short', 'bun', 'light'], ['mid', 'straight', 'dark'], ['tall', 'curly', 'light'], ['mid', 'cap', 'dark'],
  ['short', 'wavy', 'dark'], ['tall', 'bob', 'light'], ['mid', 'bun', 'dark'], ['short', 'straight', 'light'],
] as const

function CrowdPerson({ person, foreground, index }: { person: readonly string[]; foreground: boolean; index: number }) {
  const [height, hair, outfit] = person
  return <div className={`crowd-person ${height} ${hair} ${outfit} ${foreground ? 'foreground-person' : 'background-person'}`} style={{ '--delay': `${index * -0.9}s` } as React.CSSProperties} aria-hidden="true">
    <i className="person-hair" /><i className="person-head" /><i className="person-neck" /><i className="person-body" /><i className="person-arm arm-left" /><i className="person-arm arm-right" /><i className="person-bag" />
  </div>
}

function CrowdFooter() {
  const [paused, setPaused] = useState(false)
  const toggleCrowd = () => setPaused((value) => !value)
  return <section className={`crowd-footer ${paused ? 'is-paused' : ''}`} aria-label="Devasurya’s animated crowd footer">
    <div className="crowd-top">
      <div><div className="crowd-word">Deva.</div><p>Aspiring ML Engineer<br />& AI Developer.</p></div>
      <div className="crowd-nav"><span>Explore</span><a href="#about">About</a><a href="#skills">Skills</a><a href="#work">Work</a><a href="#learning-map">Learning</a><a href="#contact">Contact</a></div>
      <div className="crowd-contact"><span>Get in touch</span><a href="https://github.com/Devasurya-TECH" target="_blank" rel="noreferrer">github.com/Devasurya-TECH <ArrowUpRight size={15} /></a><small>© 2026 Devasurya M</small></div>
      <a className="crowd-back" href="#about">Back to top <ArrowUpRight size={15} /></a>
    </div>
    <button className="crowd-scene" type="button" onClick={toggleCrowd} aria-pressed={paused} aria-label={paused ? 'Resume crowd animation' : 'Pause crowd animation'}>
      <span className="crowd-name" aria-hidden="true">DEVA.</span>
      <div className="crowd-track crowd-track-back">
        {[...crowdPeople, ...crowdPeople].map((person, index) => <CrowdPerson key={`back-${index}`} person={person} foreground={false} index={index} />)}
      </div>
      <div className="deva-character"><div className="deva-photo-frame"><img src={`${import.meta.env.BASE_URL}images/devasurya-portrait.png`} alt="Devasurya M" /></div><i className="deva-body" /><i className="deva-leg left" /><i className="deva-leg right" /><i className="deva-shoe left" /><i className="deva-shoe right" /></div>
      <div className="crowd-track crowd-track-front">
        {[...crowdPeople.slice().reverse(), ...crowdPeople.slice().reverse()].map((person, index) => <CrowdPerson key={`front-${index}`} person={person} foreground index={index} />)}
      </div>
      <span className="crowd-hint">{paused ? 'Paused · click to resume' : 'Click the crowd to pause'}</span>
    </button>
    <div className="crowd-caption"><span>Finally, some motion on my website.</span><span aria-hidden="true">{paused ? 'PLAY' : 'PAUSE'} · 01</span></div>
  </section>
}

function Footer() {
  return <footer><CrowdFooter /></footer>
}

export default function App() {
  const [dark, setDark] = useState(false)
  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light' }, [dark])
  return <><Nav dark={dark} onTheme={() => setDark(!dark)} /><main><Hero /><Skills /><Work /><LearningMap /><Contact /></main><Footer /></>
}
