import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';

export const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'profile', label: 'Profile' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Career' },
];

interface Props {
  name: string;
  headline: string;
  email?: string;
  active: string;
  onUploadNew: () => void;
  onEdit: () => void;
  onDownloadCv: () => void;
  onReset: () => void;
}

export function NavBar({ name, headline, email, active, onUploadNew, onEdit, onDownloadCv, onReset }: Props) {
  const [menu, setMenu] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setMenu(false);
        setMobile(false);
      }
    };
    document.addEventListener('pointerdown', onDown);
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('pointerdown', onDown);
    };
  }, []);

  const actions = [
    { label: 'Upload another CV', icon: 'upload' as const, fn: onUploadNew },
    { label: 'Edit details', icon: 'edit' as const, fn: onEdit },
    { label: 'Download CV', icon: 'download' as const, fn: onDownloadCv },
    { label: 'Start over', icon: 'refresh' as const, fn: onReset },
  ];

  return (
    <header ref={ref} className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="wrap nav__inner">
        <a className="nav__brand" href="#home">
          <span className="wordmark">{name.toLowerCase().replace(/\s+/g, '-')}</span>
          <span className="nav__tag label" aria-hidden>
            {headline}
          </span>
        </a>

        <nav className={`nav__links ${mobile ? 'is-open' : ''}`} aria-label="Sections">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className={active === n.id ? 'is-active' : ''} aria-current={active === n.id ? 'location' : undefined} onClick={() => setMobile(false)}>
              {n.label}
            </a>
          ))}
        </nav>

        <div className="nav__end">
          <div className="nav__pop">
            <button className="icon-btn" aria-label="Manage dashboard" aria-expanded={menu} onClick={() => setMenu((m) => !m)}>
              <Icon name="cog" size={16} />
            </button>
            {menu && (
              <ul className="popover" role="menu">
                {actions.map((a) => (
                  <li key={a.label}>
                    <button
                      role="menuitem"
                      onClick={() => {
                        setMenu(false);
                        a.fn();
                      }}
                    >
                      <Icon name={a.icon} size={15} /> {a.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <a className="pill pill--sm nav__cta" href={email ? `mailto:${email}` : '#contact'}>
            Get in touch <Icon name="arrowUpRight" size={14} />
          </a>
          <button className="icon-btn nav__burger" aria-label="Open menu" aria-expanded={mobile} onClick={() => setMobile((m) => !m)}>
            <Icon name={mobile ? 'close' : 'menu'} size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
