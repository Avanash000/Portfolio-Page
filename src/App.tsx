import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  ExternalLink,
  ChevronDown,
  Code2,
  Brain,
  Layers,
  Menu,
  X,
  MapPin,
  Briefcase,
  GraduationCap,
  Terminal,
  Sparkles,
  ArrowUpRight,
  Heart,
} from 'lucide-react';

// ── Scroll Reveal Hook ──────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

// ── Typewriter Hook ─────────────────────────────────────────────────────────
function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setDisplay(current.slice(0, charIdx + 1));
          if (charIdx + 1 === current.length) {
            setTimeout(() => setDeleting(true), pause);
          } else {
            setCharIdx((c) => c + 1);
          }
        } else {
          setDisplay(current.slice(0, charIdx - 1));
          if (charIdx - 1 === 0) {
            setDeleting(false);
            setWordIdx((w) => (w + 1) % words.length);
            setCharIdx(0);
          } else {
            setCharIdx((c) => c - 1);
          }
        }
      },
      deleting ? speed / 2 : speed
    );
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}

// ── Active Section Hook ─────────────────────────────────────────────────────
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [ids]);

  return active;
}

// ── Data ────────────────────────────────────────────────────────────────────
const NAV_LINKS = ['About', 'Skills', 'Projects', 'Experience', 'Contact'];

const TECH_SKILLS = [
  { name: 'Python / Automation', level: 80, icon: '🐍' },
  { name: 'Machine Learning', level: 72, icon: '🧠' },
  { name: 'C / C++', level: 70, icon: '⚙️' },
  { name: 'NumPy / Pandas / Matplotlib', level: 75, icon: '📊' },
  { name: 'HTML / Web', level: 65, icon: '🌐' },
  { name: 'Figma / UI Design', level: 68, icon: '🎨' },
];

const SOFT_SKILLS = [
  { name: 'Problem Solving', icon: '🔍' },
  { name: 'Analytical Thinking', icon: '📐' },
  { name: 'Team Collaboration', icon: '🤝' },
  { name: 'Communication', icon: '💬' },
  { name: 'Adaptability', icon: '🔄' },
  { name: 'Continuous Learning', icon: '📚' },
];

const PROJECTS = [
  {
    title: 'Heart Disease AI',
    subtitle: 'ML / Vision Transformer',
    description:
      'ECG image analysis for heart disease detection using Vision Transformers. A deep-learning pipeline that interprets electrocardiogram images to assist in cardiac diagnostics.',
    tags: ['Python', 'Vision Transformer', 'Deep Learning', 'NumPy', 'ML'],
    link: 'https://github.com/Avanash000/Heart-Disease-AI',
    icon: <Heart size={22} />,
    highlight: true,
  },
  {
    title: 'This Portfolio',
    subtitle: 'Vibe Coding',
    description:
      'Built with React, TypeScript, and Tailwind CSS. A fully interactive, animated personal portfolio designed and developed from scratch — this very page you are viewing.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    link: '#',
    icon: <Code2 size={22} />,
    highlight: false,
  },
  {
    title: 'Python Mini Projects',
    subtitle: 'Python Development',
    description:
      'A collection of Python mini-projects including: Snake Water Gun Game, Health Management Tool, Faulty Calculator, Guessing Game, and Library Management System.',
    tags: ['Python', 'OOP', 'CLI', 'Automation'],
    link: 'https://github.com/Avanash000',
    icon: <Terminal size={22} />,
    highlight: false,
  },
];

// ── Particle Background ─────────────────────────────────────────────────────
function ParticleField() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 6,
    duration: 6 + Math.random() * 6,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full opacity-20"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            background: 'radial-gradient(circle, #06b6d4, transparent)',
            animation: `float ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

// ── Grid Lines ──────────────────────────────────────────────────────────────
function GridLines() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.03]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(6,182,212,1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(6,182,212,1) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    />
  );
}

// ── Skill Bar ───────────────────────────────────────────────────────────────
function SkillBar({ name, level, icon, index }: { name: string; level: number; icon: string; index: number }) {
  const barRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    const fill = fillRef.current;
    if (!bar || !fill) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            fill.style.setProperty('--target-width', `${level}%`);
            fill.classList.add('animated');
          }, index * 100);
          observer.unobserve(bar);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(bar);
    return () => observer.disconnect();
  }, [level, index]);

  return (
    <div ref={barRef} className="group">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-base">{icon}</span>
          <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
            {name}
          </span>
        </div>
        <span className="text-xs font-semibold text-cyan-400">{level}%</span>
      </div>
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div
          ref={fillRef}
          className="skill-bar-fill"
          style={{ '--target-width': '0%' } as React.CSSProperties}
        />
      </div>
    </div>
  );
}

// ── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const typewriter = useTypewriter(
    ['AI/ML Engineer', 'CS Student at NIT Hamirpur', 'Python Developer', 'Problem Solver'],
    85,
    2200
  );
  const activeSection = useActiveSection(['hero', 'about', 'skills', 'projects', 'experience', 'contact']);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    setMenuOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Reveal refs
  const aboutRef = useReveal();
  const skillsRef = useReveal();
  const projectsRef = useReveal();
  const expRef = useReveal();
  const contactRef = useReveal();

  return (
    <div className="mesh-bg min-h-screen text-slate-100 font-body overflow-x-hidden">
      {/* ── Navbar ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-navy-900/95 backdrop-blur-md border-b border-slate-800/60 shadow-xl shadow-black/20' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo('hero')}
            className="font-heading font-bold text-lg tracking-tight hover:opacity-80 transition-opacity"
          >
            <span className="text-gradient">PM</span>
            <span className="text-slate-400 text-sm font-normal ml-1 hidden sm:inline">/ Prince Meena</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link.toLowerCase())}
                className={`nav-link pb-0.5 ${activeSection === link.toLowerCase() ? 'active' : ''}`}
              >
                {link}
              </button>
            ))}
            <a
              href="mailto:maddynastic.oooai@hotmail.com"
              className="btn-primary text-sm px-4 py-2"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-slate-300 hover:text-white transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-slate-900/98 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link.toLowerCase())}
                className="text-left text-slate-300 hover:text-cyan-400 font-medium transition-colors py-1"
              >
                {link}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      >
        <GridLines />
        <ParticleField />

        {/* Glow blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-xs font-medium mb-6">
              <Sparkles size={12} />
              Open to Opportunities
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.1] mb-4">
              Hi, I'm{' '}
              <span className="text-gradient block">Prince Meena</span>
            </h1>

            <div className="text-xl md:text-2xl text-slate-400 mb-6 h-8 font-heading">
              <span className="text-slate-200">{typewriter}</span>
              <span className="inline-block w-0.5 h-6 bg-cyan-400 ml-1 animate-blink align-middle" />
            </div>

            <p className="text-slate-400 leading-relaxed mb-8 max-w-lg text-base">
              CS student at{' '}
              <span className="text-cyan-400 font-medium">NIT Hamirpur</span>{' '}
              passionate about AI, Machine Learning, and building impactful software that solves real-world problems.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <button onClick={() => scrollTo('projects')} className="btn-primary">
                View Projects <ArrowUpRight size={16} />
              </button>
              <button onClick={() => scrollTo('contact')} className="btn-outline">
                Get in Touch
              </button>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://github.com/Avanash000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-500/60 hover:bg-cyan-500/5 transition-all"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/prince-meena-3b1b81382/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/60 hover:bg-blue-500/5 transition-all"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:maddynastic.oooai@hotmail.com"
                className="w-10 h-10 rounded-xl border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-500/60 hover:bg-cyan-500/5 transition-all"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Profile photo */}
          <div className="flex justify-center md:justify-end">
            <div className="relative animate-float">
              {/* Outer glow ring */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-xl" />

              {/* Gradient border ring */}
              <div className="photo-ring relative w-64 h-64 md:w-80 md:h-80">
                <img
                  src="/images/WhatsApp_Image_2026-06-17_at_11.12.51.jpeg"
                  alt="Prince Meena"
                  className="w-full h-full rounded-full object-cover object-center"
                />
              </div>

              {/* Badge — NIT Hamirpur */}
              <div className="absolute -bottom-3 -left-4 bg-slate-900 border border-slate-700 rounded-2xl px-4 py-2 flex items-center gap-2 shadow-xl">
                <GraduationCap size={16} className="text-cyan-400" />
                <div>
                  <p className="text-xs font-semibold text-white leading-none">NIT Hamirpur</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">CSE Student</p>
                </div>
              </div>

              {/* Badge — AI/ML */}
              <div className="absolute -top-3 -right-4 bg-slate-900 border border-slate-700 rounded-2xl px-4 py-2 flex items-center gap-2 shadow-xl">
                <Brain size={16} className="text-blue-400" />
                <div>
                  <p className="text-xs font-semibold text-white leading-none">AI / ML</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Enthusiast</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => scrollTo('about')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-cyan-400 transition-colors animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown size={26} />
        </button>
      </section>

      {/* ── About ── */}
      <section id="about" className="py-24 px-6">
        <div ref={aboutRef} className="reveal max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-heading">About Me</h2>
            <p className="section-subheading mx-auto">
              A glimpse into who I am, what drives me, and where I'm headed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Bio */}
            <div className="md:col-span-2 card">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  <Sparkles size={18} className="text-cyan-400" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-white">My Story</h3>
              </div>
              <div className="space-y-4 text-slate-400 leading-relaxed text-sm">
                <p>
                  Hi, I'm{' '}
                  <span className="text-white font-medium">Prince Meena</span>, a Computer Science
                  student at{' '}
                  <span className="text-cyan-400 font-medium">
                    National Institute of Technology Hamirpur
                  </span>{' '}
                  with a strong interest in Artificial Intelligence, Machine Learning, and software
                  development.
                </p>
                <p>
                  I enjoy turning ideas into real-world projects and continuously improving my
                  technical skills. My learning journey has included Python, C, NumPy, machine
                  learning fundamentals, and UI/UX design using Figma. I have also worked on
                  AI-based projects such as{' '}
                  <span className="text-white font-medium">
                    ECG image analysis for heart disease detection
                  </span>{' '}
                  using Vision Transformers.
                </p>
                <p>
                  Beyond academics, I enjoy playing{' '}
                  <span className="text-white font-medium">badminton</span>, gardening, listening
                  to music, drawing, exploring space science and photography, and creating digital
                  products that solve practical problems.
                </p>
                <p>
                  My goal is to become a skilled{' '}
                  <span className="text-cyan-400 font-medium">
                    AI engineer and software developer
                  </span>{' '}
                  who builds impactful solutions through technology.
                </p>
              </div>
            </div>

            {/* Quick facts */}
            <div className="space-y-4">
              <div className="card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <MapPin size={15} className="text-blue-400" />
                  </div>
                  <h3 className="font-heading font-semibold text-white text-sm">Location</h3>
                </div>
                <p className="text-slate-400 text-sm">India</p>
                <p className="text-slate-500 text-xs mt-1">NIT Hamirpur, Himachal Pradesh</p>
              </div>

              <div className="card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    <GraduationCap size={15} className="text-cyan-400" />
                  </div>
                  <h3 className="font-heading font-semibold text-white text-sm">Education</h3>
                </div>
                <p className="text-slate-300 text-sm font-medium">B.Tech — Computer Science</p>
                <p className="text-slate-500 text-xs mt-1">NIT Hamirpur</p>
              </div>

              <div className="card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                    <Heart size={15} className="text-pink-400" />
                  </div>
                  <h3 className="font-heading font-semibold text-white text-sm">Interests</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['AI/ML', 'Space Science', 'Photography', 'Badminton', 'Gardening', 'Music', 'Drawing', 'Open Source'].map((i) => (
                    <span key={i} className="tag text-[10px]">{i}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="py-24 px-6 bg-slate-900/30">
        <div ref={skillsRef} className="reveal max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-heading">Skills</h2>
            <p className="section-subheading mx-auto">
              Technologies I work with and strengths I bring to every project.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Technical skills */}
            <div className="card">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  <Code2 size={18} className="text-cyan-400" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-white">Technical Skills</h3>
              </div>
              <div className="space-y-6">
                {TECH_SKILLS.map((skill, i) => (
                  <SkillBar key={skill.name} {...skill} index={i} />
                ))}
              </div>
            </div>

            {/* Soft skills */}
            <div className="card">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <Brain size={18} className="text-blue-400" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-white">Soft Skills</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {SOFT_SKILLS.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-3 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/30 hover:bg-slate-800 transition-all group"
                  >
                    <span className="text-xl">{skill.icon}</span>
                    <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors leading-tight">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Currently learning */}
              <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-cyan-500/5 to-blue-500/5 border border-cyan-500/20">
                <p className="text-xs font-semibold text-cyan-400 mb-3 uppercase tracking-wider">Currently Exploring</p>
                <div className="flex flex-wrap gap-2">
                  {['Vision Transformers', 'Deep Learning', 'PyTorch', 'LLMs', 'Vibe Coding'].map((t) => (
                    <span key={t} className="tag text-xs">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section id="projects" className="py-24 px-6">
        <div ref={projectsRef} className="reveal max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-heading">Projects</h2>
            <p className="section-subheading mx-auto">
              Things I've built — from AI research to creative coding experiments.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PROJECTS.map((project, i) => (
              <div
                key={project.title}
                className={`card group flex flex-col h-full ${
                  project.highlight
                    ? 'border-cyan-500/30 bg-gradient-to-b from-cyan-500/5 to-transparent'
                    : ''
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {project.highlight && (
                  <div className="flex items-center gap-1.5 mb-4">
                    <Sparkles size={12} className="text-cyan-400" />
                    <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                      Featured
                    </span>
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                      project.highlight
                        ? 'bg-cyan-500/15 border border-cyan-500/30 text-cyan-400'
                        : 'bg-slate-800 border border-slate-700 text-slate-400'
                    }`}
                  >
                    {project.icon}
                  </div>
                  <a
                    href={project.link}
                    target={project.link !== '#' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg border border-slate-700 flex items-center justify-center text-slate-500 hover:text-white hover:border-cyan-500/50 transition-all"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>

                <h3 className="font-heading font-bold text-white text-lg mb-1 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs font-medium text-slate-500 mb-3">{project.subtitle}</p>
                <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-5">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="https://github.com/Avanash000"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline inline-flex"
            >
              <Github size={16} />
              View All on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ── Experience ── */}
      <section id="experience" className="py-24 px-6 bg-slate-900/30">
        <div ref={expRef} className="reveal max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-heading">Experience</h2>
            <p className="section-subheading mx-auto">
              My professional journey so far — learning through real-world application.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Timeline item */}
            <div className="relative pl-8 border-l-2 border-slate-800">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/30" />

              <div className="card ml-4 mb-2">
                <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-500/10 border border-green-500/30 text-green-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        Ongoing
                      </span>
                    </div>
                    <h3 className="text-xl font-heading font-bold text-white mt-2">
                      Machine Learning Intern
                    </h3>
                    <p className="text-cyan-400 font-medium text-sm mt-0.5">EduoExpo</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                      <Briefcase size={13} />
                      <span>ML Internship</span>
                    </div>
                  </div>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-5">
                  Currently interning at EduoExpo as a Machine Learning intern, gaining hands-on
                  experience in AI/ML workflows, model training, and real-world data pipelines.
                  Certificate will be uploaded upon completion.
                </p>

                <div className="flex flex-wrap gap-2">
                  {['Machine Learning', 'Python', 'Data Analysis', 'AI Workflows'].map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Education item */}
            <div className="relative pl-8 border-l-2 border-slate-800 mt-8">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30" />

              <div className="card ml-4">
                <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/30 text-blue-400">
                        <GraduationCap size={11} />
                        Academic
                      </span>
                    </div>
                    <h3 className="text-xl font-heading font-bold text-white mt-2">
                      B.Tech — Computer Science &amp; Engineering
                    </h3>
                    <p className="text-blue-400 font-medium text-sm mt-0.5">
                      National Institute of Technology Hamirpur
                    </p>
                  </div>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-5">
                  Pursuing a Bachelor's degree in Computer Science &amp; Engineering at one of
                  India's premier technical institutions. Focused on AI/ML research, software
                  development, and building practical projects alongside coursework.
                </p>

                <div className="flex flex-wrap gap-2">
                  {['Algorithms', 'Data Structures', 'AI/ML', 'Software Engineering'].map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-24 px-6">
        <div ref={contactRef} className="reveal max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-heading">Get In Touch</h2>
            <p className="section-subheading mx-auto">
              Have a project in mind, want to collaborate, or just want to say hi? I'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {/* Contact info */}
            <div className="space-y-5">
              <div className="card group hover:border-cyan-500/40">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/15 transition-colors">
                    <Mail size={20} className="text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1 font-medium uppercase tracking-wider">Email</p>
                    <a
                      href="mailto:maddynastic.oooai@hotmail.com"
                      className="text-slate-200 hover:text-cyan-400 transition-colors text-sm font-medium"
                    >
                      maddynastic.oooai@hotmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="card group hover:border-cyan-500/40">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/15 transition-colors">
                    <Phone size={20} className="text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1 font-medium uppercase tracking-wider">Phone</p>
                    <a
                      href="tel:+919205881557"
                      className="text-slate-200 hover:text-cyan-400 transition-colors text-sm font-medium"
                    >
                      +91 9205881557
                    </a>
                  </div>
                </div>
              </div>

              <div className="card group hover:border-blue-500/40">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/15 transition-colors">
                    <Linkedin size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1 font-medium uppercase tracking-wider">LinkedIn</p>
                    <a
                      href="https://www.linkedin.com/in/prince-meena-3b1b81382/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-200 hover:text-blue-400 transition-colors text-sm font-medium inline-flex items-center gap-1"
                    >
                      prince-meena-3b1b81382
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="card group hover:border-slate-600">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-700/50 border border-slate-700 flex items-center justify-center group-hover:bg-slate-700 transition-colors">
                    <Github size={20} className="text-slate-300" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1 font-medium uppercase tracking-wider">GitHub</p>
                    <a
                      href="https://github.com/Avanash000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-200 hover:text-white transition-colors text-sm font-medium inline-flex items-center gap-1"
                    >
                      Avanash000
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA card */}
            <div className="card flex flex-col justify-center items-center text-center p-10 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 border-cyan-500/20">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-6 shadow-2xl shadow-cyan-500/30">
                <Layers size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-3">
                Let's Build Together
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Whether it's an AI/ML project, a web application, or a collaboration opportunity — I'm always excited to work on meaningful projects.
              </p>
              <a href="mailto:maddynastic.oooai@hotmail.com" className="btn-primary w-full justify-center">
                <Mail size={16} />
                Send Me an Email
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-800/60 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-gradient">Prince Meena</span>
            <span className="text-slate-600 text-sm">— CS Student &amp; AI/ML Developer</span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/Avanash000"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-white transition-colors"
            >
              <Github size={17} />
            </a>
            <a
              href="https://www.linkedin.com/in/prince-meena-3b1b81382/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-blue-400 transition-colors"
            >
              <Linkedin size={17} />
            </a>
            <a
              href="mailto:maddynastic.oooai@hotmail.com"
              className="text-slate-500 hover:text-cyan-400 transition-colors"
            >
              <Mail size={17} />
            </a>
          </div>
          <p className="text-slate-600 text-xs">
            &copy; {new Date().getFullYear()} Prince Meena. Built with React &amp; Tailwind.
          </p>
        </div>
      </footer>
    </div>
  );
}
