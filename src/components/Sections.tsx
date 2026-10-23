import { useEffect, useMemo, useState } from 'react';
import earth from '../assets/photos/earth.jpg';
import exploded from '../assets/photos/module-exploded.jpg';
import smoke from '../assets/photos/modules-smoke.jpg';
import precision from '../assets/photos/precision.jpg';
import p1 from '../assets/photos/product-1.jpg';
import p2 from '../assets/photos/product-2.jpg';
import p3 from '../assets/photos/product-3.jpg';
import p4 from '../assets/photos/product-4.jpg';
import { useCountUp } from '../hooks/useCountUp';
import { useInView } from '../hooks/useInView';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useScramble } from '../hooks/useScramble';
import type { Resume } from '../lib/types';
import { GlowCard } from './GlowCard';
import { Icon } from './Icon';
import { Reveal } from './Reveal';

const PRODUCT_PHOTOS = [p1, p2, p3, p4];

/* ================= stat strip ================= */

function Stat({ value, suffix = '', label, index, run }: { value: number | string; suffix?: string; label: string; index: number; run: boolean }) {
  const numeric = typeof value === 'number';
  const count = useCountUp(numeric ? value : 0, run, { duration: 1800 + index * 200, delay: index * 140 });
  const text = useScramble(numeric ? '' : value, run && !numeric, { delay: index * 140 });
  const done = numeric ? count >= value * 0.98 : text === value;
  return (
    <div className="stat">
      <span className="label">{`0${index + 1}`}</span>
      <b className="stat__value" aria-label={`${value}${suffix}`}>
        <span aria-hidden>
          {numeric ? String(Math.round(count)).padStart(2, '0') : text || ' '}
          {suffix && <i className={done ? 'is-on' : ''}>{suffix}</i>}
        </span>
      </b>
      <span className="stat__label">{label}</span>
    </div>
  );
}

export function StatStrip({ resume }: { resume: Resume }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.35);
  const { stats } = resume;
  const edu = resume.education[0];
  return (
    <div className="wrap" ref={ref}>
      <GlowCard className="stats" speed={11} tilt={false}>
        <Stat index={0} run={inView} value={stats.years} suffix={stats.yearsPlus ? '+' : ''} label="Years of experience" />
        <Stat index={1} run={inView} value={stats.projects} suffix={stats.projectsPlus ? '+' : ''} label="Projects delivered" />
        <Stat index={2} run={inView} value={stats.skills} label="Core skills" />
        <Stat index={3} run={inView} value={edu?.short || '—'} label={edu?.field ? `Education · ${edu.field}` : 'Education'} />
      </GlowCard>
    </div>
  );
}

/* ================= profile ("More than AI. Real-world capability.") ================= */

export function ProfileSection({ resume, onDownloadCv }: { resume: Resume; onDownloadCv: () => void }) {
  const now = resume.experience[0];
  const edu = resume.education[0];
  const callouts = [
    now && { title: now.current ? 'Current role' : 'Latest role', text: [now.role, now.company].filter(Boolean).join(' · ') },
    edu && { title: 'Education', text: [edu.degree, edu.year].filter(Boolean).join(' · ') },
    resume.skills.length > 0 && { title: 'Core stack', text: resume.skills.slice(0, 3).join(', ') },
  ].filter(Boolean) as { title: string; text: string }[];

  return (
    <section id="profile" className="section" aria-labelledby="profile-title">
      <div className="wrap tech">
        <Reveal className="tech__copy">
          <span className="label">Candidate profile</span>
          <h2 id="profile-title" className="title">
            More
            <br />
            Than a CV.
            <br />
            Real-World
            <br />
            Capability.
          </h2>
          <p className="tech__body">{resume.summary || resume.tagline}</p>
          {resume.skills.length > 0 && (
            <ul className="tech__skills" aria-label="Skills">
              {resume.skills.map((s) => (
                <li key={s} className="chip">
                  {s}
                </li>
              ))}
            </ul>
          )}
          <button className="text-link" onClick={onDownloadCv}>
            Download CV <Icon name="arrowUpRight" size={15} />
          </button>
        </Reveal>

        <div className="tech__figure">
          <img src={exploded} alt="" className="tech__module" />
          <ul className="tech__callouts">
            {callouts.map((c, i) => (
              <Reveal as="li" key={c.title} delay={200 + i * 160}>
                <span className="tech__wire" aria-hidden />
                <span>
                  <b className="label label--bright">{c.title}</b>
                  <small>{c.text}</small>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>

        <GlowCard className="tech__aside ticks" speed={9} phase={0.4} tilt={false}>
          <img src={precision} alt="" />
          <p className="label label--bright">{(resume.motto || 'Precision in every detail.').toUpperCase()}</p>
          <span className="round">
            <Icon name="arrowUpRight" size={12} />
          </span>
        </GlowCard>
      </div>
    </section>
  );
}

/* ================= project lineup ================= */

export function ProjectsSection({ resume }: { resume: Resume }) {
  const awards = [...resume.achievements, ...resume.certifications];
  return (
    <section id="projects" className="section section--line" aria-labelledby="projects-title">
      <div className="wrap lineup">
        <div className="lineup__main">
          <span id="projects-title" className="label">
            Project lineup
          </span>
          {resume.projects.length ? (
            <ul className="lineup__grid">
              {resume.projects.map((p, i) => (
                <Reveal as="li" key={p.title + i} delay={(i % 4) * 110}>
                  <GlowCard as="article" className="product ticks" phase={i * 0.23} speed={7.5}>
                    <header>
                      <h3>{p.title}</h3>
                      <p>{p.meta || p.tags.join(' · ') || 'Project'}</p>
                    </header>
                    <img src={PRODUCT_PHOTOS[i % PRODUCT_PHOTOS.length]} alt="" loading="lazy" />
                    {p.description && <p className="product__desc">{p.description}</p>}
                    <span className="round product__go" aria-hidden>
                      <Icon name="arrowUpRight" size={12} />
                    </span>
                  </GlowCard>
                </Reveal>
              ))}
            </ul>
          ) : (
            <p className="empty">No projects section was found in the CV.</p>
          )}
        </div>

        <GlowCard id="achievements" className="lineup__aside" speed={10} phase={0.6} tilt={false}>
          <img src={smoke} alt="" />
          <div>
            <p className="label label--bright">
              Small wins.
              <br />
              Bigger
              <br />
              possibilities.
            </p>
            {awards.length > 0 && (
              <ul>
                {awards.slice(0, 4).map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            )}
          </div>
        </GlowCard>
      </div>
    </section>
  );
}

/* ================= career path ("From research to reality") ================= */

interface Step {
  title: string;
  text: string;
  tag: string;
}

function buildSteps(r: Resume): Step[] {
  const edu = [...r.education].sort((a, b) => +(a.year ?? 0) - +(b.year ?? 0)).map((e) => ({ title: e.short || e.degree, text: [e.field || e.degree, e.year].filter(Boolean).join(', '), tag: 'Learn' }));
  const work = [...r.experience].reverse().map((e) => ({ title: e.role, text: [e.company, e.period].filter(Boolean).join(' · '), tag: e.current ? 'Now' : 'Build' }));
  const next = r.goals.map((g) => ({ title: g.value, text: g.note || g.label, tag: 'Next' }));
  const steps = [...edu.slice(-1), ...work.slice(-2), ...next.slice(0, 1)];
  // always four beats, like the design
  return steps.length >= 4 ? steps.slice(0, 4) : [...edu.slice(0, -1), ...steps, ...work.slice(0, -2)].slice(0, 4);
}

export function ProcessSection({ resume }: { resume: Resume }) {
  const steps = useMemo(() => buildSteps(resume), [resume]);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduced || paused || steps.length < 2) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % steps.length), 2600);
    return () => clearInterval(t);
  }, [reduced, paused, steps.length]);

  if (!steps.length) return null;

  return (
    <section id="experience" className="section process" aria-labelledby="process-title">
      <div className="process__earth" aria-hidden>
        <img src={earth} alt="" />
        <span className="process__lights" />
        {/* sunrise over the horizon: the disc climbs out from behind the planet, then the rim and flare light up */}
        <span className="sunrise">
          <span className="sunrise__clip">
            <span className="sunrise__disc" />
          </span>
          <span className="sunrise__rim" />
          <span className="sunrise__flare" />
          <span className="sunrise__rays" />
        </span>
      </div>

      <div className="wrap process__grid">
        <Reveal>
          <span className="label">Career path</span>
          <h2 id="process-title" className="title process__title">
            From Learning
            <br />
            to Leading.
          </h2>
        </Reveal>

        <ol className="process__steps" style={{ ['--n' as string]: steps.length }} onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title + i} delay={i * 120} className={`step ${i === active ? 'is-active' : ''} ${i < active ? 'is-past' : ''}`} onPointerEnter={() => setActive(i)}>
              <div className="step__head">
                <span className="step__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="step__line" aria-hidden>
                  <span />
                </span>
              </div>
              <span className="label step__tag">{s.tag}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>

      <div id="contact" className="process__cta">
        <p className="label label--bright">{resume.goals[0] ? `Next: ${resume.goals[0].value}` : 'A more capable tomorrow.'}</p>
        <a className="pill pill--sm" href={resume.email ? `mailto:${resume.email}` : '#home'}>
          Start a conversation <Icon name="arrowUpRight" size={14} />
        </a>
      </div>
    </section>
  );
}

/* ================= footer ================= */

export function Footer({ resume }: { resume: Resume }) {
  const { links } = resume;
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <span className="wordmark">{resume.name.toLowerCase().replace(/\s+/g, '-')}</span>
        <span className="footer__copy">
          © {new Date().getFullYear()} {resume.name}. Generated from a CV.
        </span>
        <nav className="footer__links" aria-label="Profiles">
          {links.linkedin && (
            <a href={links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          )}
          {links.github && (
            <a href={links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          )}
          {resume.email && <a href={`mailto:${resume.email}`}>Email</a>}
        </nav>
        <span className="footer__slashes" aria-hidden>
          ////
        </span>
      </div>
    </footer>
  );
}
