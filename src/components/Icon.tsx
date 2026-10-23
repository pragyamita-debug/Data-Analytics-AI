import type { SVGProps } from 'react';

/** Stroke icons (24×24 grid, 1.75 stroke). Kept local to avoid an icon-font dependency. */
const PATHS = {
  home: 'M3 10.5 12 3l9 7.5M5 9v11h5v-6h4v6h5V9',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-8 9a8 8 0 0 1 16 0',
  briefcase: 'M3 8h18v12H3zM8 8V5h8v3M3 13h18M11 12h2v2h-2z',
  skills: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z',
  folder: 'M3 6a1 1 0 0 1 1-1h5l2 2h9a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z',
  graduation: 'M2 9.5 12 5l10 4.5-10 4.5zM6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5M22 9.5V15',
  star: 'm12 3 2.8 5.8 6.2.9-4.5 4.4 1 6.3L12 17.5 6.5 20.4l1-6.3L3 9.7l6.2-.9z',
  mail: 'M3 6h18v12H3zm0 0 9 7 9-7',
  download: 'M12 4v11m0 0-4-4m4 4 4-4M5 20h14',
  upload: 'M12 16V5m0 0-4 4m4-4 4 4M5 20h14',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm9 3-4-4',
  bell: 'M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 20a2 2 0 0 0 4 0',
  chevronDown: 'm6 9 6 6 6-6',
  chevronRight: 'm9 6 6 6-6 6',
  arrowRight: 'M5 12h14m-5-5 5 5-5 5',
  arrowUpRight: 'M7 17 17 7M8 7h9v9',
  cpu: 'M8 8h8v8H8zM4 9h2m-2 6h2m12-6h2m-2 6h2M9 4v2m6-2v2M9 18v2m6-2v2M5 5h14v14H5z',
  arrowLeft: 'M19 12H5m5-5-5 5 5 5',
  pin: 'M12 21s-7-6.2-7-11.5a7 7 0 1 1 14 0C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  target: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-4a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-4a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm3-4 5-5m-2 0h2v2',
  calendar: 'M4 6h16v14H4zM4 10h16M8 3v4m8-4v4M8 14h2m3 0h2m-7 3h2m3 0h2',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v4l3 2',
  link: 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1',
  book: 'M3 5h6a3 3 0 0 1 3 3v12a2 2 0 0 0-2-2H3zm18 0h-6a3 3 0 0 0-3 3v12a2 2 0 0 1 2-2h7z',
  bulb: 'M9 18h6m-5 3h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Z',
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-9-9h18M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9Z',
  award: 'M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm-3.5 4.5L9 21l3-1.5 3 1.5-.5-6.5',
  check: 'm5 12 5 5 9-10',
  file: 'M6 3h8l4 4v14H6zM14 3v4h4M9 12h6m-6 4h6',
  edit: 'M4 20h4L19 9l-4-4L4 16zm9-13 4 4',
  refresh: 'M20 11a8 8 0 0 0-14.9-3M4 4v4h4m-4 5a8 8 0 0 0 14.9 3M20 20v-4h-4',
  camera: 'M4 8h3l2-3h6l2 3h3v11H4zm8 9a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
  sparkle: 'M12 3c.5 4.5 2 6.5 6 7.5-4 1-5.5 3-6 7.5-.5-4.5-2-6.5-6-7.5 4-1 5.5-3 6-7.5Z',
  quote: 'M7 7h4v4c0 3-1.5 5-4 6m6-10h4v4c0 3-1.5 5-4 6',
  layers: 'm12 3 9 5-9 5-9-5zm-9 9 9 5 9-5m-18 4 9 5 9-5',
  rocket: 'M5 15c-1.5 1.5-2 4-2 6 2 0 4.5-.5 6-2m-1-4 4 4m-6-2c0-5 4-11 13-12-1 9-7 13-12 13zM15 9a1 1 0 1 0 0-.01',
  menu: 'M4 6h16M4 12h16M4 18h16',
  close: 'M6 6l12 12M18 6 6 18',
  sun: 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0-14v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.3-1.4M17.7 6.3l1.4-1.4',
  leaf: 'M5 19c8 0 14-5 14-15C9 4 5 9 5 15v4Zm0 0c2-4 5-7 9-9',
  logout: 'M9 4H5v16h4m7-4 4-4-4-4m4 4H9',
  wind: 'M12 11v10m-3 0h6M12 11 9.5 3.5M12 11l7.2 3.4M12 11l-7 4.6M12 11h.01',
  droplet: 'M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11Z',
  sprout: 'M12 21v-8m0 0c0-4 3-6.5 7-6.5 0 4-3 6.5-7 6.5Zm0-2.5C12 7 9 5 5 5c0 4 3 6 7 5.5',
  monitor: 'M3 4h18v12H3zM8 20h8M12 16v4',
  gauge: 'M4 16a8 8 0 1 1 16 0M12 16l4-5M8 16h.01M16 16h.01',
  shield: 'M12 3 5 6v6c0 4.5 3 7.7 7 9 4-1.3 7-4.5 7-9V6zm-3 9 2 2 4-4',
  headset: 'M4 15v-3a8 8 0 0 1 16 0v3M4 15h3v5H5a1 1 0 0 1-1-1zm16 0h-3v5h2a1 1 0 0 0 1-1z',
  cog: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7-3 2-1-1.5-3-2.2.4-1.6-1.3L15 4h-3.5l-.7 2.1-1.6 1.3-2.2-.4L5.5 10l2 1v2l-2 1L7 17l2.2-.4 1.6 1.3.7 2.1H15l.7-2.1 1.6-1.3 2.2.4 1.5-3-2-1Z',
} as const;

export type IconName = keyof typeof PATHS | 'linkedin' | 'github' | 'x';

export function Icon({ name, size = 20, ...rest }: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  if (name === 'linkedin')
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden {...rest}>
        <rect x="2" y="2" width="20" height="20" rx="3" fill="#0a66c2" />
        <path fill="#fff" d="M6.5 9.5h2.6V18H6.5zM7.8 5.6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM10.6 9.5h2.5v1.2c.4-.7 1.3-1.4 2.6-1.4 2.7 0 3.2 1.8 3.2 4.1V18h-2.6v-4c0-1 0-2.2-1.4-2.2s-1.6 1-1.6 2.1V18h-2.6z" />
      </svg>
    );
  if (name === 'github')
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden fill="currentColor" {...rest}>
        <path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5a3.9 3.9 0 0 1 1-2.7c-.1-.3-.5-1.3.1-2.7 0 0 .9-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .6 1.4.2 2.4.1 2.7a3.9 3.9 0 0 1 1 2.7c0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.8V21c0 .3.2.6.7.5A10 10 0 0 0 12 2Z" />
      </svg>
    );
  if (name === 'x')
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden fill="currentColor" {...rest}>
        <path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8zm-1.1 16.2h1.7L7.4 4.7H5.6z" />
      </svg>
    );

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...rest}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
