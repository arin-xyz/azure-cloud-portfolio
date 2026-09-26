import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight, CheckCircle2, ChevronDown, Download, ExternalLink,
  Github, Linkedin, Mail, Menu, Moon, Server, ShieldCheck,
  Sun, Terminal, X, CloudCog, Cpu, Database, Workflow
} from "lucide-react";
import { portfolio } from "./data/portfolio";

const sectionIds = ["home", "about", "experience", "skills", "projects", "education", "contact"];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem("theme") !== "light");
  const [active, setActive] = useState("home");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
  const handleScroll = () => {
    const scrollPosition = window.scrollY + 150;

    let currentSection = "home";

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);

      if (element && element.offsetTop <= scrollPosition) {
        currentSection = id;
      }
    });

    setActive(currentSection);
  };

  handleScroll();

  window.addEventListener("scroll", handleScroll, { passive: true });

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  const nav = sectionIds.map((id) => ({ id, label: id[0].toUpperCase() + id.slice(1) }));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-sky-400/30 selection:text-white dark:bg-slate-950">
      <Navbar
        active={active}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        dark={dark}
        setDark={setDark}
        nav={nav}
      />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Navbar({ active, menuOpen, setMenuOpen, dark, setDark, nav }: any) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-3 shadow-2xl backdrop-blur-xl dark:bg-slate-950/75">
        <a href="#home" className="flex items-center gap-2 font-semibold tracking-tight" aria-label="Home">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-sky-400/20 bg-sky-400/10 text-sky-300">
            <CloudCog size={18} />
          </span>
          <span className="hidden sm:block">Arin Kumar</span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {nav.map((item: any) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link ${active === item.id ? "nav-active" : ""}`}
            >
              {item.label}
            </a>
          ))}
          <a
  href={portfolio.links.resume}
  download="Arin-Kumar-Resume.pdf"
  className="ml-2 inline-flex items-center gap-2 rounded-xl bg-white px-3.5 py-2 text-sm font-semibold text-slate-900"
>
  <Download size={15} /> Resume
</a>
          <button className="icon-button" onClick={() => setDark((v: boolean) => !v)} aria-label="Toggle theme">
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button className="icon-button" onClick={() => setDark((v: boolean) => !v)} aria-label="Toggle theme">
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button className="icon-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-auto mt-2 max-w-6xl rounded-2xl border border-white/10 bg-slate-950/95 p-3 shadow-2xl backdrop-blur-xl lg:hidden"
          >
            {nav.map((item: any) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMenuOpen(false)}
                className={`block rounded-xl px-4 py-3 text-sm ${active === item.id ? "bg-white/10 text-sky-300" : "text-slate-300"}`}
              >
                {item.label}
              </a>
            ))}
            <a href={portfolio.links.resume} className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-950">
              <Download size={15} /> Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden">
      <div className="hero-grid absolute inset-0 -z-10 opacity-70" />
      <div className="hero-orb absolute left-[55%] top-24 -z-10 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="mx-auto grid min-h-[760px] max-w-6xl items-center gap-14 px-5 pb-20 pt-36 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
        <Reveal>
          <div>
            <p className="eyebrow">{portfolio.eyebrow}</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Hi, I'm <span className="text-gradient">Arin Kumar</span>
            </h1>
            <p className="mt-7 max-w-2xl text-xl font-medium text-slate-200 sm:text-2xl">
              {portfolio.headline}
            </p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
              {portfolio.heroDescription}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="primary-button" href="#projects">View My Work <ArrowUpRight size={17} /></a>
              <a className="secondary-button" href="#contact">Contact Me <Mail size={17} /></a>
              <a className="secondary-button" href={portfolio.links.resume}><Download size={17} /> Resume</a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Social href={portfolio.links.linkedin} label="LinkedIn" icon={<Linkedin size={17} />} />
              <Social href={portfolio.links.github} label="GitHub" icon={<Github size={17} />} />
              <Social href={portfolio.links.email} label="Email" icon={<Mail size={17} />} />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="relative">
            <div className="terminal-card">
              <div className="terminal-top">
                <span /><span /><span />
                <div className="ml-auto font-mono text-[10px] text-slate-600">cloud-ops</div>
              </div>
              <div className="p-6 font-mono text-sm leading-7 sm:p-8">
                <div className="text-slate-500">$ whoami</div>
                <div className="mt-1 text-sky-300">azure-cloud-operator</div>
                <div className="mt-5 text-slate-500">$ focus --current</div>
                <div className="mt-1 grid gap-1 text-slate-300">
                  <span><b className="text-cyan-300">01</b> Azure infrastructure</span>
                  <span><b className="text-cyan-300">02</b> Identity & endpoint</span>
                  <span><b className="text-cyan-300">03</b> PowerShell automation</span>
                  <span><b className="text-cyan-300">04</b> Cloud operations</span>
                </div>
                <div className="mt-5 text-slate-500">$ status</div>
                <div className="mt-1 flex items-center gap-2 text-emerald-300"><span className="status-dot" /> operational mindset</div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-white/10 bg-slate-900/90 px-4 py-3 shadow-xl backdrop-blur md:block">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-sky-300" size={20} />
                <div>
                  <p className="text-xs text-slate-500">Core discipline</p>
                  <p className="text-sm font-medium">Reliable operations</p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section-shell">
      <div className="section-wrap grid gap-12 lg:grid-cols-[.9fr_1.1fr]">
        <Reveal>
          <SectionHeading eyebrow="ABOUT" title="Infrastructure first. Automation where it helps." />
        </Reveal>
        <Reveal delay={0.08}>
          <div>
            <p className="prose-copy">{portfolio.about}</p>
            <p className="prose-copy mt-5">{portfolio.aboutSecondary}</p>
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs font-semibold uppercase tracking-[.18em] text-slate-500">Core focus</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {portfolio.coreFocus.map((x) => <span className="chip" key={x}>{x}</span>)}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="section-shell">
      <div className="section-wrap">
        <Reveal><SectionHeading eyebrow="EXPERIENCE" title="Operational experience across cloud and endpoints." /></Reveal>
        <div className="mt-12 space-y-8">
          {portfolio.experience.map((item, i) => (
            <Reveal key={item.company} delay={i * 0.05}>
              <article className="timeline-item">
                <div className="timeline-dot" />
                <div className="grid gap-5 rounded-3xl border border-white/10 bg-white/[0.025] p-6 sm:p-8 lg:grid-cols-[.35fr_1fr]">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[.18em] text-sky-300">{item.type}</p>
                    <h3 className="mt-2 text-xl font-semibold">{item.company}</h3>
                    <p className="mt-1 text-sm text-slate-400">{item.role}</p>
                    <p className="mt-4 inline-flex rounded-full border border-white/10 px-3 py-1 text-xs text-slate-500">{item.period}</p>
                  </div>
                  <ul className="grid gap-3">
                    {item.bullets.map((b) => <li key={b} className="flex gap-3 text-sm leading-6 text-slate-300"><CheckCircle2 size={17} className="mt-1 shrink-0 text-sky-400" />{b}</li>)}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const icons: Record<string, React.ReactNode> = {
    Cloud: <CloudCog size={18} />,
    "Identity & Endpoint": <ShieldCheck size={18} />,
    "Automation / Scripting": <Terminal size={18} />,
    Operations: <Workflow size={18} />,
    "Operating Systems": <Server size={18} />,
    Other: <Database size={18} />,
  };
  return (
    <section id="skills" className="section-shell">
      <div className="section-wrap">
        <Reveal><SectionHeading eyebrow="SKILLS" title="A practical cloud-operations toolkit." /></Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Object.entries(portfolio.skills).map(([category, skills], i) => (
            <Reveal key={category} delay={i * 0.035}>
              <div className="skill-card">
                <div className="flex items-center gap-3">
                  <span className="skill-icon">{icons[category]}</span>
                  <h3 className="font-semibold">{category}</h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {skills.map((skill) => <span className="skill-chip" key={skill}>{skill}</span>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section-shell">
      <div className="section-wrap">
        <Reveal><SectionHeading eyebrow="SELECTED WORK" title="Projects and case studies." /></Reveal>
        <div className="mt-12 space-y-5">
          {portfolio.projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.04}>
              <article className={`project-card ${project.featured ? "featured-project" : ""}`}>
                <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="project-number">{project.number}</span>
                      <span className="text-xs font-medium uppercase tracking-[.16em] text-slate-500">{project.kind}</span>
                    </div>
                    <h3 className="mt-7 text-2xl font-semibold tracking-tight sm:text-3xl">{project.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-slate-400">{project.description}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.stack.map((s) => <span className="chip" key={s}>{s}</span>)}
                    </div>
                    <div className="mt-7 flex gap-3">
                      <ProjectLink href={project.github} label="GitHub" icon={<Github size={15} />} />
                      <ProjectLink href={project.docs} label="Documentation" icon={<ExternalLink size={15} />} />
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-5 sm:p-7">
                    <p className="text-xs font-semibold uppercase tracking-[.18em] text-slate-500">Key capabilities</p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {project.highlights.map((h) => <div className="flex gap-3 text-sm leading-6 text-slate-300" key={h}><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />{h}</div>)}
                    </div>
                    <div className="mt-7 border-t border-white/10 pt-5">
                      <p className="text-xs font-semibold uppercase tracking-[.18em] text-slate-500">Implementation overview</p>
                      <p className="mt-3 text-sm leading-6 text-slate-400">{project.architecture}</p>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="section-shell">
      <div className="section-wrap grid gap-12 lg:grid-cols-2">
        <Reveal>
          <SectionHeading eyebrow="EDUCATION" title="Software engineering foundation." />
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.025] p-7">
            <p className="text-sm text-sky-300">Education</p>
            <h3 className="mt-2 text-2xl font-semibold">{portfolio.education[0].institution}</h3>
            <p className="mt-2 text-slate-300">{portfolio.education[0].program}</p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-500">
              <span className="rounded-full border border-white/10 px-3 py-1">{portfolio.education[0].period}</span>
              <span className="rounded-full border border-white/10 px-3 py-1">{portfolio.education[0].detail}</span>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <SectionHeading eyebrow="CERTIFICATION" title="Validated Azure administration skills." />
          {portfolio.certifications.map((cert) => (
            <div className="mt-8 rounded-3xl border border-sky-400/15 bg-sky-400/[0.035] p-7" key={cert.code}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[.18em] text-sky-300">{cert.issuer}</p>
                  <h3 className="mt-2 text-xl font-semibold">{cert.name}</h3>
                </div>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">{cert.code}</span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-500">
                <span className="rounded-full border border-white/10 px-3 py-1">Year: {cert.year}</span>
                <a className="rounded-full border border-white/10 px-3 py-1 hover:text-white" href={cert.credential} target="_blank" rel="noreferrer">Credential</a>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="section-shell pb-28">
      <div className="section-wrap">
        <Reveal>
          <div className="contact-panel">
            <div>
              <p className="eyebrow">CONTACT</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Let's Connect</h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-400">
                Interested in cloud infrastructure, Azure, identity management or automation? Feel free to connect with me.
              </p>
              <div className="mt-8 grid gap-3">
                <ContactLink href={portfolio.links.email} icon={<Mail size={18} />} label={portfolio.links.emailAddress} />
                <ContactLink href={portfolio.links.linkedin} icon={<Linkedin size={18} />} label="LinkedIn" />
                <ContactLink href={portfolio.links.github} icon={<Github size={18} />} label="GitHub" />
              </div>
            </div>

            <form
              className="rounded-2xl border border-white/10 bg-slate-950/50 p-5 sm:p-6"
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            >
              <div className="grid gap-4">
                <label className="field"><span>Name</span><input required name="name" autoComplete="name" placeholder="Arin Kumar" /></label>
                <label className="field"><span>Email</span><input required type="email" name="email" autoComplete="email" placeholder="you@example.com" /></label>
                <label className="field"><span>Message</span><textarea required name="message" rows={5} placeholder="Tell me what you'd like to discuss." /></label>
                <button className="primary-button w-full justify-center" type="submit">{sent ? "Message Prepared" : "Send Message"} <ArrowUpRight size={17} /></button>
              </div>
              <p className="mt-3 text-xs leading-5 text-slate-500">
                Frontend-only form. Configure Formspree, Resend, or another backend in this component before treating it as a live mail form.
              </p>
              {sent && <p className="mt-3 text-xs text-emerald-300">Form validation passed. Connect a form endpoint to actually deliver submissions.</p>}
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-7 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div>
          <p className="text-slate-300">© 2026 Arin Kumar</p>
          <p className="mt-1">Azure Cloud • Identity • Endpoint Management</p>
        </div>
        <div className="flex items-center gap-4">
          <a href={portfolio.links.github} className="hover:text-white">GitHub</a>
          <a href={portfolio.links.linkedin} className="hover:text-white">LinkedIn</a>
          <a href={portfolio.links.email} className="hover:text-white">Email</a>
          <a href="#home" className="icon-button" aria-label="Back to top"><ChevronDown className="rotate-180" size={17} /></a>
        </div>
      </div>
    </footer>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
    </div>
  );
}

function Social({ href, label, icon }: any) {
  return <a className="social-pill" href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer">{icon}<span>{label}</span></a>;
}
function ProjectLink({ href, label, icon }: any) {
  const disabled = href === "#";
  return <a href={disabled ? undefined : href} onClick={disabled ? (e: React.MouseEvent) => e.preventDefault() : undefined} className={`inline-flex items-center gap-2 rounded-xl border border-white/10 px-3.5 py-2 text-xs font-medium transition ${disabled ? "cursor-not-allowed opacity-45" : "hover:-translate-y-0.5 hover:border-sky-400/30 hover:text-sky-300"}`}>{icon}{label}</a>;
}
function ContactLink({ href, icon, label }: any) {
  return <a href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer" className="flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-300 transition hover:border-sky-400/30 hover:bg-white/[0.03] hover:text-white">{icon}{label}</a>;
}

export default App;
