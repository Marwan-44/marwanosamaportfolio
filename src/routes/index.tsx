import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronRight,
  Code2,
  Github,
  GraduationCap,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";

import portraitAsset from "@/assets/marwan-osama-portrait.png.asset.json";

const navigation = ["Home", "About", "Skills", "Services", "Projects", "Education", "Contact"];

const technicalSkills = [
  { name: "Flutter", note: "Currently learning" },
  { name: "Dart" }, { name: "Kotlin" }, { name: "C++" },
  { name: "Object-Oriented Programming" }, { name: "Data Structures" },
  { name: "Algorithms" }, { name: "Git" }, { name: "GitHub" },
];

const softSkills = ["Teamwork", "Communication", "Adaptability", "Self-Learning", "Agility", "Attention to Detail"];

const projects = [
  { number: "01", title: "Student Grade Management System", tech: "Kotlin", kind: "grades", description: "A CLI system for student records, grade statistics, and letter-grade conversion using mutable maps and conditional logic.", repo: "https://github.com/Marwan-44/Student_Grade_Management_System" },
  { number: "02", title: "Expense Tracker", tech: "Kotlin", kind: "expense", description: "A personal expense manager with add, view, search, and remove operations, backed by data classes and careful input validation.", repo: "https://github.com/Marwan-44/Expense_Tracker" },
  { number: "03", title: "Ball Animation Tool", tech: "Java / Swing", kind: "ball", description: "An event-driven desktop tool for animating a bouncing ball with controls for shape and animation delay." },
  { number: "04", title: "Arduino Smart Car", tech: "Arduino / Embedded", kind: "car", description: "An obstacle-aware smart car using ultrasonic sensing within approximately 20 cm and microcontroller-based motor control." },
  { number: "05", title: "Bank Management System", tech: "C++", kind: "bank", description: "An OOP banking simulation with branch and account-holder management, CRUD operations, linked lists, and trees." },
];

const certifications = [
  { date: "July 2026", title: "Summer Training Program", org: "QNB Egypt · IT Division" },
  { date: "June 2026", title: "McKinsey.org Forward", org: "McKinsey & Company" },
  { date: "April 2026", title: "Principles of UX/UI Design", org: "Meta · Coursera" },
  { date: "February 2026", title: "Programming Fundamentals in Kotlin", org: "Meta · Coursera" },
  { date: "January 2026", title: "Introduction to Android Mobile Application Development", org: "Meta · Coursera" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Marwan Osama | Flutter Mobile Developer" },
      { name: "description", content: "Portfolio of Marwan Osama Zolfakar, a Flutter mobile developer and Computer Science student in Cairo." },
      { property: "og:title", content: "Marwan Osama | Flutter Mobile Developer" },
      { property: "og:description", content: "Flutter, Dart, and practical software projects by Marwan Osama Zolfakar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Portfolio,
});

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => entry?.isIntersecting && setVisible(true), { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}>{children}</div>;
}

function SectionIntro({ eyebrow, title, copy, light = false }: { eyebrow: string; title: string; copy?: string; light?: boolean }) {
  return <div className="section-intro"><p className={`eyebrow ${light ? "eyebrow-light" : ""}`}><span />{eyebrow}</p><h2 className={light ? "text-primary-foreground" : ""}>{title}</h2>{copy && <p className={light ? "text-primary-foreground/70" : "text-muted-foreground"}>{copy}</p>}</div>;
}

function ProjectArt({ kind }: { kind: string }) {
  if (kind === "grades") return <div className="project-art art-grades"><div className="code-window"><span /><span /><span /><code>averageOf(scores)</code><b>92.4</b></div><div className="grade-chip">A+</div></div>;
  if (kind === "expense") return <div className="project-art art-expense"><div className="mini-phone"><span>Balance</span><b>4,280</b><i /><i /><i /></div><div className="coin">$</div></div>;
  if (kind === "ball") return <div className="project-art art-ball"><div className="track"><span /></div><div className="controls"><i /><i /><i /></div></div>;
  if (kind === "car") return <div className="project-art art-car"><div className="radar"><i /><i /><i /></div><div className="car"><span /><b /><b /></div></div>;
  return <div className="project-art art-bank"><div className="bank"><i /><i /><i /><i /></div><div className="branch-lines"><span /><span /><span /></div></div>;
}

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const match = navigation.find((item) => item.toLowerCase() === entry.target.id);
            if (match) setActive(match);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    navigation.forEach((item) => {
      const el = document.getElementById(item.toLowerCase());
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  function handleNavClick(item: string) {
    setActive(item);
    setMenuOpen(false);
  }

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const element = event.currentTarget;
    const form = new FormData(element);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const nextErrors: Record<string, string> = {};
    if (name.length < 2) nextErrors["name"] = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors["email"] = "Please enter a valid email.";
    if (message.length < 10) nextErrors["message"] = "Please write at least 10 characters.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setSending(true);
    try {
      const response = await fetch("https://formsubmit.co/ajax/marwanosama413@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, message, _subject: `New Portfolio Contact Message from ${name}` }),
      });
      if (!response.ok) throw new Error("Send failed");
      setSent(true);
      element.reset();
      toast.success("Message sent!", { description: "Thanks for reaching out — Marwan will get back to you soon." });
    } catch {
      toast.error("Message couldn't be sent", { description: "Please try again, or email marwanosama413@gmail.com directly." });
    } finally {
      setSending(false);
    }
  }

  return (
    <main>
      <header className={`site-header ${scrolled ? "header-scrolled" : ""}`}>
        <nav className="nav-wrap" aria-label="Main navigation">
          <a href="#home" className="brand" aria-label="Marwan Osama home"><span>MO</span><b>Marwan Osama</b></a>
          <div className="desktop-nav">{navigation.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => handleNavClick(item)} className={active === item ? "nav-active" : ""}>{item}</a>)}</div>
          <a href="#contact" className="nav-cta" onClick={() => handleNavClick("Contact")}>Let’s talk <ArrowUpRight size={16} /></a>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
        </nav>
        {menuOpen && <div className="mobile-nav">{navigation.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => handleNavClick(item)} className={active === item ? "nav-active" : ""}>{item}<ChevronRight size={16} /></a>)}</div>}
      </header>

      <section id="home" className="hero">
        <div className="hero-word" aria-hidden="true">FLUTTER</div>
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="hero-kicker"><span />Hello, I’m Marwan</p>
            <h1>Flutter Mobile<br />Developer<span>.</span></h1>
            <p className="hero-subtitle">Computer Science Student <i /> Flutter & Dart <i /> Mobile App Development</p>
            <p className="hero-text">I build modern, user-friendly mobile applications with Flutter and Dart, turning ideas into practical digital experiences.</p>
            <div className="hero-actions"><a href="#projects" className="button button-primary">View my projects <ArrowDownRight size={18} /></a><a href="#contact" className="button button-ghost">Contact me <ArrowUpRight size={18} /></a></div>
            <div className="social-row"><span>Find me online</span><a href="https://www.github.com/Marwan-44" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a><a href="https://www.linkedin.com/in/marwan-osama413" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a><a href="mailto:marwanosama413@gmail.com" aria-label="Email"><Mail size={18} /></a></div>
          </div>
          <div className="portrait-stage">
            <div className="portrait-arch"><img src={portraitAsset.url} alt="Marwan Osama Zolfakar, Flutter mobile developer" /></div>
            <div className="float-card float-code"><Code2 size={17} /><div><small>Building with</small><b>Flutter + Dart</b></div></div>
            <div className="float-card float-location"><MapPin size={17} /><div><small>Based in</small><b>Cairo, Egypt</b></div></div>
            <div className="flutter-mark" aria-hidden="true"><span /><span /></div>
          </div>
        </div>
        <a href="#about" className="scroll-cue">Scroll to explore <ArrowDownRight size={16} /></a>
      </section>

      <section id="about" className="section light-section">
        <Reveal>
          <SectionIntro eyebrow="About me" title="Building the foundations for thoughtful mobile products." />
          <div className="about-layout">
            <div className="about-photo"><img src={portraitAsset.url} alt="Portrait of Marwan Osama" loading="lazy" /><span>Open to opportunities</span></div>
            <div className="about-content">
              <p className="about-tagline">Turning ideas into meaningful mobile experiences.</p>
              <p className="about-lead">My journey into mobile development started with a simple curiosity: how can an idea become something people can actually use?</p>
              <p>As a Computer Science student and aspiring Flutter Mobile Developer, I’ve been building my skills by turning that curiosity into real applications. Along the way, I’ve learned that good development isn’t just about writing code — it’s about understanding a problem, simplifying it, and creating an experience that feels natural to the user.</p>
              <p>I’m passionate about building clean, practical, and user-focused mobile applications with Flutter. I’m continuously improving my development and problem-solving skills, with the goal of creating products that turn ideas into useful digital experiences.</p>
              <div className="info-grid">
                <div><small>Role</small><b>Flutter Mobile Developer</b></div><div><small>Education</small><b>Bachelor of Computer Science</b></div>
                <div><small>University</small><b>October 6 University</b></div><div><small>Graduation</small><b>Expected 2027</b></div>
                <div><small>GPA</small><b>3.26 / 4.0</b></div><div><small>Location</small><b>Cairo, Egypt</b></div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section id="skills" className="section skills-section">
        <Reveal><SectionIntro eyebrow="My toolkit" title="Skills shaped by curiosity, practice, and strong fundamentals." /></Reveal>
        <div className="skills-layout">
          <Reveal className="skill-panel technical-panel"><div className="panel-heading"><Code2 /><div><small>01 / Technical</small><h3>Engineering toolkit</h3></div></div><div className="skill-cloud">{technicalSkills.map((skill) => <div className={`skill-chip ${skill.note ? "learning" : ""}`} key={skill.name}><span>{skill.name}</span>{skill.note && <small>{skill.note}</small>}</div>)}</div></Reveal>
          <Reveal className="skill-panel soft-panel"><div className="panel-heading"><Sparkles /><div><small>02 / Human</small><h3>How I work</h3></div></div><div className="soft-list">{softSkills.map((skill, index) => <div key={skill}><span>0{index + 1}</span><b>{skill}</b><ArrowUpRight size={17} /></div>)}</div></Reveal>
        </div>
      </section>

      <section id="services" className="section dark-section">
        <Reveal><SectionIntro eyebrow="What I do" title="Mobile experiences built with care." light /></Reveal>
        <Reveal className="service-feature">
          <div className="service-number">01</div><div className="service-icon"><Layers3 /></div>
          <div className="service-copy"><p>Focused service</p><h3>Flutter App Development</h3><p>Development of modern mobile applications using Flutter and Dart, with a focus on clean interfaces, responsive layouts, usability, and maintainable code.</p><a href="#contact" className="button button-surface">Let’s work together <ArrowUpRight size={18} /></a></div>
          <div className="phone-art" aria-hidden="true"><div className="phone-shell"><span /><div className="app-top" /><div className="app-card" /><div className="app-lines"><i /><i /><i /></div><div className="app-nav" /></div><div className="orbit orbit-one" /><div className="orbit orbit-two" /></div>
        </Reveal>
      </section>

      <section id="projects" className="section projects-section">
        <Reveal><SectionIntro eyebrow="Selected projects" title="Programming foundations, applied." copy="A selection of academic and personal projects that show how I approach logic, structure, interaction, and real-world problems." /></Reveal>
        <div className="project-grid">{projects.map((project, index) => <Reveal key={project.title} className={`project-card project-${index + 1}`}><div className="project-meta"><span>{project.number}</span><b>{project.tech}</b></div><ProjectArt kind={project.kind} /><div className="project-copy"><h3>{project.title}</h3><p>{project.description}</p>{project.repo ? <a className="project-link" href={project.repo} target="_blank" rel="noopener noreferrer"><span>View on GitHub <Github size={16} /></span><ArrowUpRight size={16} /></a> : <span className="project-link">Foundation project <ArrowUpRight size={16} /></span>}</div></Reveal>)}</div>
      </section>

      <section id="education" className="section education-section">
        <Reveal><SectionIntro eyebrow="Education" title="Learning with direction." /></Reveal>
        <Reveal className="education-feature"><div className="edu-icon"><GraduationCap /></div><div className="edu-main"><span>2024 — 2027</span><h3>Bachelor of Computer Science</h3><p>October 6 University · Cairo, Egypt</p></div><div className="edu-stat"><small>GPA</small><strong>3.26</strong><span>out of 4.0 · Very Good</span></div></Reveal>
        <Reveal className="cert-wrap"><div className="cert-title"><p className="eyebrow"><span />Certifications & training</p><h3>Always moving forward.</h3></div><div className="timeline">{certifications.map((cert, index) => <div className="timeline-item" key={cert.title}><span className="timeline-index">0{index + 1}</span><div><small>{cert.date}</small><h4>{cert.title}</h4><p>{cert.org}</p></div></div>)}</div></Reveal>
      </section>

      <section id="contact" className="section contact-section">
        <Reveal className="contact-grid">
          <div className="contact-copy"><p className="eyebrow eyebrow-light"><span />Get in touch</p><h2>Let’s build something together<span>.</span></h2><p>Have an idea for a mobile application or need help bringing your app concept to life? Feel free to get in touch.</p><div className="contact-links"><a href="mailto:marwanosama413@gmail.com"><Mail /><span><small>Email</small>marwanosama413@gmail.com</span></a><a href="tel:+201004467499"><Phone /><span><small>Phone</small>01004467499</span></a><a href="https://www.linkedin.com/in/marwan-osama413" target="_blank" rel="noreferrer"><Linkedin /><span><small>LinkedIn</small>/in/marwan-osama413</span></a><a href="https://www.github.com/Marwan-44" target="_blank" rel="noreferrer"><Github /><span><small>GitHub</small>/Marwan-44</span></a></div></div>
          <form className="contact-form" onSubmit={submitContact} noValidate><div className="form-heading"><MessageCircle /><div><small>Start a conversation</small><h3>Tell me about your idea.</h3></div></div><label>Name<input name="name" maxLength={100} placeholder="Your name" aria-invalid={Boolean(errors["name"])} />{errors["name"] && <span>{errors["name"]}</span>}</label><label>Email<input name="email" type="email" maxLength={255} placeholder="you@example.com" aria-invalid={Boolean(errors["email"])} />{errors["email"] && <span>{errors["email"]}</span>}</label><label>Message<textarea name="message" maxLength={1000} rows={5} placeholder="What would you like to build?" aria-invalid={Boolean(errors["message"])} />{errors["message"] && <span>{errors["message"]}</span>}</label><button className="button button-primary form-button" type="submit" disabled={sending}>{sending ? "Sending…" : "Send message"} {!sending && <Send size={17} />}</button>{sent && <p className="form-note form-note-success">Your message has been sent successfully — thank you for reaching out.</p>}<p className="form-note">Note: the very first message may send a one-time activation email to Marwan's inbox to enable delivery.</p></form>
        </Reveal>
      </section>

      <footer><div className="footer-top"><div className="brand footer-brand"><span>MO</span><b>Marwan Osama</b></div><p>Flutter Mobile Developer<br />Cairo, Egypt</p><a href="#home" className="back-top">Back to top <ArrowUpRight size={17} /></a></div><div className="footer-bottom"><span>Designed & developed for Marwan Osama Zolfakar.</span><span>Flutter · Dart · Mobile</span></div></footer>
    </main>
  );
}