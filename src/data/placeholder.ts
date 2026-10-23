import type { Resume } from '../lib/types';

/**
 * What the page shows before anyone uploads a CV: the full design, filled with
 * neutral placeholder text. Uploading a CV replaces every field below.
 */
export const placeholder: Resume = {
  name: 'Your Name',
  headline: 'Your Role | Your Focus',
  tagline: 'One sentence about the work you do and the impact you want it to have.',
  email: 'you@example.com',
  location: 'Your City, Country',
  links: {
    linkedin: 'https://www.linkedin.com/',
    github: 'https://github.com/',
  },
  summary:
    'Two or three sentences about who you are, the problems you like to work on and what you are looking for next. Upload a CV and this is replaced by the profile section.',
  motto: 'A more capable tomorrow.',

  experience: [
    {
      role: 'Your Current Role',
      company: 'Company Name',
      period: '2023 – Present',
      current: true,
      months: 0,
      bullets: ['What you are responsible for.', 'A result you are proud of.'],
    },
    {
      role: 'Previous Role',
      company: 'Company Name',
      period: '2020 – 2023',
      current: false,
      months: 0,
      bullets: ['What you delivered there.'],
    },
  ],

  education: [{ degree: 'Your Degree in Your Subject', short: 'M.Sc.', field: 'Your Subject', institution: 'Your University', year: '2020', rank: 4 }],

  skills: ['Skill One', 'Skill Two', 'Skill Three', 'Skill Four', 'Skill Five', 'Skill Six', 'Skill Seven', 'Skill Eight'],

  projects: [
    { title: 'Project One', meta: 'Category · Tools', description: 'One line on the problem and the result.', tags: [] },
    { title: 'Project Two', meta: 'Category · Tools', description: 'One line on the problem and the result.', tags: [] },
    { title: 'Project Three', meta: 'Category · Tools', description: 'One line on the problem and the result.', tags: [] },
    { title: 'Project Four', meta: 'Category · Tools', description: 'One line on the problem and the result.', tags: [] },
  ],

  achievements: ['An award or recognition', 'A milestone you reached'],
  certifications: ['A certification you hold'],

  goals: [
    { label: 'Goal', value: 'Your next milestone', note: 'a measurable target' },
    { label: 'Next Step', value: 'What you are working on now' },
  ],

  interests: [],
  languages: [],

  stats: { years: 5, yearsPlus: true, projects: 12, projectsPlus: true, skills: 8 },
};
