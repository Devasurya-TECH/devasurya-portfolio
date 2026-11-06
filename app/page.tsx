"use client";

import { useEffect, useState } from "react";
import { profile, skillGroups, journey } from "../data/portfolio";

const sections = ["overview", "skills", "work", "journey", "github", "contact"];
const portraitSrc = "/devasurya-portfolio/assets/devasurya-portrait.png";
const lenses = [
  ["01", "Data understanding", "Looking closely at the information a system must learn from."],
  ["02", "Feature exploration", "Examining useful signals that can help shape a model."],
  ["03", "Model experimentation", "Trying, evaluating, and refining learning approaches."],
  ["04", "Insight delivery", "Turning model outputs into clearer, useful perspectives."],
] as const;

function SignalField() {
  return (
    <svg className="signal-field" viewBox="0 0 580 580" fill="none" aria-hidden="true">
      <defs><linearGradient id="beam" x1="40" x2="530" y1="40" y2="530"><stop stopColor="#63e6ff" stopOpacity=".1"/><stop offset=".55" stopColor="#63e6ff"/><stop offset="1" stopColor="#8576ff" stopOpacity=".2"/></linearGradient><filter id="glow"><feGaussianBlur stdDeviation="5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
      <g className="signal-grid"><path d="M70 85H510M70 165H510M70 245H510M70 325H510M70 405H510M70 485H510M90 55V525M170 55V525M250 55V525M330 55V525M410 55V525M490 55V525"/></g>
      <g className="signal-lines" filter="url(#glow)"><path d="M100 420 194 310 270 365 350 175 468 260"/><path d="M100 420 212 470 270 365 410 448 468 260"/><path d="M194 310 300 200 350 175 460 95"/></g>
      {[[100,420],[194,310],[270,365],[350,175],[468,260],[212,470],[410,448],[300,200],[460,95]].map(([cx,cy], i) => <g key={i} className="signal-node"><circle cx={cx} cy={cy} r="15"/><circle cx={cx} cy={cy} r="4"/></g>)}
      <text x="72" y="32">NEURAL SYSTEM / 01</text><text x="387" y="553">SIGNAL FLOW →</text>
    </svg>
  );
}

function SectionTitle({ tag, title, body }: { tag: string; title: string; body?: string }) {
  return <header className="section-title reveal"><p className="eyebrow">{tag}</p><h2>{title}</h2>{body && <p className="section-copy">{body}</p>}</header>;
}

export default function Home() {
  const [active, setActive] = useState("overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const [lens, setLens] = useState(0);

  useEffect(() => {
    const nodes = sections.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: "-40% 0px -45%" });
    nodes.forEach((node) => observer.observe(node));
    const reveal = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((node) => reveal.observe(node));
    return () => { observer.disconnect(); reveal.disconnect(); };
  }, []);

  return <main>
    <div className="page-grid" aria-hidden="true" />
    <nav className="nav-wrap" aria-label="Main navigation">
      <div className="nav-dock"><a href="#overview" className="monogram" aria-label="Devasurya M, overview">DM</a>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>{sections.map((id) => <a key={id} href={`#${id}`} className={active === id ? "active" : ""} onClick={() => setMenuOpen(false)}>{id === "overview" ? "Overview" : id[0].toUpperCase() + id.slice(1)}</a>)}</div>
        <span className="nav-status"><i /> <span>OPEN TO LEARN</span></span>
        <button className="menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
      </div>
    </nav>

    <section id="overview" className="hero section-shell">
      <p className="hero-wordmark" aria-hidden="true">DEVASURYA</p>
      <div className="hero-copy reveal"><p className="hero-script">Hello, I&apos;m</p><h1>DEVASURYA<span>.</span></h1><p className="hero-role"><i /> ASPIRING AI/ML ENGINEER</p><p className="hero-description">Exploring practical intelligent systems through <strong>machine learning, deep learning,</strong> and computer vision—one build at a time.</p><div className="actions"><a className="button primary" href="#work">EXPLORE ARCHITECTURE <b>↘</b></a><a className="button" href={profile.github} target="_blank" rel="noreferrer">VIEW GITHUB <b>↗</b></a></div></div>
      <div className="hero-visual reveal"><SignalField /><span className="portrait-backplate"/><div className="portrait-frame"><img src={portraitSrc} alt="Devasurya M" /></div><div className="portrait-status"><i /> LEARNING SYSTEM ACTIVE</div></div>
      <aside className="hero-hud reveal" aria-label="Portfolio highlights"><article><div><span>01. LEARNING</span><b>FOUNDATIONS</b></div><h2>Software & Data</h2><p>Python, SQL, Django, and database-backed application development.</p></article><article><div><span>02. BUILDING</span><b>FEATURED</b></div><h2>TalentIQ</h2><p>AI-powered HR analytics for salary recommendations and attrition risk assessment.</p></article><article><div><span>03. EXPLORING</span><b>DEEP LEARNING</b></div><h2>Neural Systems</h2><p>TensorFlow, Keras, PyTorch, and computer-vision concepts.</p></article></aside>
      <div className="hero-stats reveal"><div><span>FOCUS</span><strong>AI / ML / CV</strong></div><div><span>CORE LANGUAGE</span><strong>Python</strong></div><div><span>BUILDING WITH</span><strong>TensorFlow + Scikit-learn</strong></div></div>
    </section>

    <section className="section-shell profile" aria-labelledby="profile-heading"><SectionTitle tag="01. PROFILE" title="Learning by Building Intelligent Systems" /><div className="profile-layout reveal"><p>Based in Kochi, Devasurya is developing AI/ML, deep learning, data tooling, and computer-vision skills through hands-on, project-based learning. The focus is on understanding how data, models, and thoughtful iteration come together in useful software.</p><ol>{[["Learn by implementation","Turn concepts into working experiments."],["Understand the data","Start with the signals behind each problem."],["Iterate with intent","Use each build to ask sharper questions."]].map(([title, copy],i) => <li key={title}><span>0{i + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></li>)}</ol></div></section>

    <section id="skills" className="section-shell" aria-labelledby="skills-heading"><SectionTitle tag="// 02.00 SEC_STACK     INDEX [02 / 05]" title="The Systems Matrix" body="A growing toolkit for understanding, training, and communicating with intelligent systems." /><div className="skill-grid">{skillGroups.map((group) => <article className="skill-card reveal" key={group.id}><span className="card-index">SYS-{group.id}</span><h3>{group.title}</h3><div className="pills">{group.items.map((item) => <span key={item}>{item}</span>)}</div></article>)}</div></section>

    <section id="work" className="section-shell work" aria-labelledby="work-heading"><SectionTitle tag="03. FEATURED BUILD" title="TalentIQ" body="AI-Powered Employee Analytics Platform" /><article className="talentiq reveal"><div className="project-info"><p className="project-kicker">// FEATURED REPOSITORY</p><h3>TalentIQ — AI-Powered Employee Analytics Platform</h3><p>A Django HR analytics platform for salary recommendations and employee attrition risk assessment using Lasso Regression and Random Forest.</p><div className="pills"><span>PYTHON</span><span>DJANGO</span><span>SCIKIT-LEARN</span><span>RANDOM FOREST</span></div><a className="button primary" href={profile.talentIq} target="_blank" rel="noreferrer">VIEW REPOSITORY <b>↗</b></a></div><div className="analytics-panel" aria-label="Decorative analytics visual"><span className="panel-label">CONCEPTUAL SIGNAL MAP</span><div className="bar-chart"><i/><i/><i/><i/><i/><i/></div><svg viewBox="0 0 300 128" fill="none"><path d="M6 100C44 100 49 58 85 66s35 35 66 8 43-65 72-35 39 17 71-28"/><circle cx="85" cy="66" r="4"/><circle cx="151" cy="74" r="4"/><circle cx="223" cy="39" r="4"/></svg><p>Decorative visualization · no live metrics</p></div></article>
      <div className="lens reveal"><div><p className="eyebrow">ARCHITECTURE LENS</p><h3>A conceptual learning lens.</h3><p>These layers describe a general way to think about an AI analytics workflow; they do not claim specific project implementation details.</p></div><div className="lens-content"><div role="tablist" aria-label="Architecture lens">{lenses.map(([id, title], i) => <button key={id} role="tab" aria-selected={lens === i} aria-controls="lens-panel" id={`lens-tab-${i}`} onClick={() => setLens(i)}>{id} <span>{title}</span></button>)}</div><div id="lens-panel" role="tabpanel" aria-labelledby={`lens-tab-${lens}`}><span>{lenses[lens][0]}</span><h4>{lenses[lens][1]}</h4><p>{lenses[lens][2]}</p></div></div></div>
    </section>

    <section id="journey" className="section-shell" aria-labelledby="journey-heading"><SectionTitle tag="04. LEARNING JOURNEY" title="A Technical Roadmap" /><ol className="timeline">{journey.map(([title, copy], i) => <li className="reveal" key={title}><span>{String(i + 1).padStart(2,"0")}</span><div><h3>{title}</h3><p>{copy}</p></div><i /></li>)}</ol></section>

    <section id="github" className="section-shell" aria-labelledby="github-heading"><SectionTitle tag="05. PROFILES & WORK" title="Follow the Build Process" body="Find Devasurya&apos;s professional profile, current work, and the TalentIQ project." /><div className="link-grid"><a className="github-card reveal" href={profile.github} target="_blank" rel="noreferrer"><span>01 / PROFILE</span><h3>GitHub Profile</h3><p>github.com/Devasurya-TECH</p><b>OPEN PROFILE ↗</b></a><a className="github-card reveal" href={profile.linkedIn} target="_blank" rel="noreferrer"><span>02 / PROFESSIONAL</span><h3>LinkedIn</h3><p>linkedin.com/in/devasurya-m-489934361</p><b>CONNECT ON LINKEDIN ↗</b></a><a className="github-card reveal" href={profile.talentIq} target="_blank" rel="noreferrer"><span>03 / PROJECT</span><h3>TalentIQ Repository</h3><p>AI-powered employee analytics platform</p><b>OPEN REPOSITORY ↗</b></a></div></section>

    <section id="contact" className="section-shell contact"><div className="contact-glow"/><div className="reveal"><p className="eyebrow">// NEXT CONNECTION</p><h2>Let&apos;s Build<br/><em>Intelligent Ideas.</em></h2><p>Open to AI/ML, Python, backend, and software-engineering opportunities, internships, and thoughtful collaborations.</p><div className="contact-actions"><a className="button primary" href={`mailto:${profile.email}`}>EMAIL ME <b>↗</b></a><a className="button" href={profile.linkedIn} target="_blank" rel="noreferrer">LINKEDIN <b>↗</b></a></div></div></section>
    <footer><span>© {new Date().getFullYear()} DEVASURYA M</span><span>Built around curiosity, data, and intelligent systems.</span><span className="footer-links"><a href={profile.github} target="_blank" rel="noreferrer">GITHUB ↗</a><a href={profile.leetCode} target="_blank" rel="noreferrer">LEETCODE ↗</a><a href={profile.instagram} target="_blank" rel="noreferrer">INSTAGRAM ↗</a></span></footer>
  </main>;
}
