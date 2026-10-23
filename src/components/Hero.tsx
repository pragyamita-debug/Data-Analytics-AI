import { useRef } from 'react';
import heroPhoto from '../assets/photos/hero-arm.jpg';
import { useCountUp } from '../hooks/useCountUp';
import { useInView } from '../hooks/useInView';
import type { Resume } from '../lib/types';
import { Icon } from './Icon';
import { WaveField } from './WaveField';
import './Hero.css';

/** "Data Analyst | Applied AI" → ["Data Analyst", "Applied AI"] */
const splitHeadline = (h: string) => h.split(/\s*[|•·,–—]\s*/).filter(Boolean);

/** break a phrase into ~3 short lines for the stacked uppercase labels */
function stack(text: string, lines = 3) {
  const words = text.replace(/[.]+$/, '').split(/\s+/);
  const per = Math.ceil(words.length / lines);
  return Array.from({ length: Math.ceil(words.length / per) }, (_, i) => words.slice(i * per, (i + 1) * per).join(' '));
}

interface Props {
  resume: Resume;
  onDownloadCv: () => void;
  isExample?: boolean;
  onUpload?: () => void;
}

export function Hero({ resume, onDownloadCv, isExample = false, onUpload }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [countRef, counting] = useInView<HTMLDivElement>(0.4);
  const years = useCountUp(resume.stats.years, counting, { duration: 2200, delay: 500 });

  const [first, ...rest] = resume.name.split(/\s+/);
  const [role, focus] = splitHeadline(resume.headline);
  const intro = resume.tagline || resume.summary.split(/(?<=[.!?])\s/)[0];
  const sideSkills = resume.skills.slice(0, 4);
  const motto = resume.motto ? stack(resume.motto) : ['A more', 'capable', 'tomorrow'];
  const where = resume.location ? stack(resume.location, 2) : ['Open to', 'opportunities'];

  const onPointerMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType === 'touch') return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--px', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    el.style.setProperty('--py', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };

  return (
    <section id="home" className="hero" ref={ref} onPointerMove={onPointerMove} aria-label="Introduction">
      <div className="hero__visual" aria-hidden>
        <img src={heroPhoto} alt="" />
        <span className="hero__beam" />
        <span className="hero__scan" />
      </div>

      <div className="wrap hero__grid">
        <div className="hero__main">
          {isExample && (
            <button className="hero__example" onClick={onUpload}>
              <span className="hero__example-dot" aria-hidden />
              Example dashboard — upload a CV to make it yours
              <Icon name="arrowUpRight" size={13} />
            </button>
          )}
          <p className="label hero__where">
            {where.map((w) => (
              <span key={w}>{w}</span>
            ))}
            <span className="hero__rule" aria-hidden />
          </p>

          <h1 className="display hero__title">
            <span className="hero__line">{first}</span>
            {rest.length > 0 && <span className="hero__line">{rest.join(' ')}</span>}
            {role && (
              <span className="hero__line dim">
                <span className="shimmer">{role}.</span>
              </span>
            )}
          </h1>

          {intro && <p className="hero__intro">{intro}</p>}

          <div className="hero__actions">
            <a className="pill" href="#projects">
              Explore Projects <Icon name="arrowUpRight" size={15} />
            </a>
            {isExample ? (
              <button className="text-link" onClick={onUpload}>
                Upload your CV <Icon name="upload" size={15} />
              </button>
            ) : (
              <button className="text-link" onClick={onDownloadCv}>
                Download CV <Icon name="download" size={15} />
              </button>
            )}
          </div>

          <div className="hero__counter" ref={countRef}>
            <span className="hero__dot" aria-hidden />
            <b aria-label={`${resume.stats.years}${resume.stats.yearsPlus ? '+' : ''} years of experience`}>
              <span aria-hidden>
                {String(Math.round(years)).padStart(2, '0')}
                {resume.stats.yearsPlus && <i className={years >= resume.stats.years * 0.98 ? 'is-on' : ''}>+</i>}
              </span>
            </b>
            <span className="hero__counter-line" aria-hidden />
            <span className="label">
              Years
              <br />
              of
              <br />
              experience
            </span>
          </div>
        </div>

        <aside className="hero__side">
          {sideSkills.length > 0 && (
            <ul className="label label--bright hero__list">
              {sideSkills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          )}
          <p className="label label--bright hero__motto">
            {motto.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </p>

          <div className="hero__wave ticks">
            <WaveField className="hero__wave-canvas" />
            <span className="label label--bright">
              {(focus || 'Real-world').toUpperCase()}
              <br />
              {focus ? 'in practice' : 'impact'}
            </span>
            <span className="hero__wave-slash" aria-hidden>
              /
            </span>
          </div>
        </aside>
      </div>
    </section>
  );
}
