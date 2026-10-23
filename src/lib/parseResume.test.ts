import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { findDateRange, mergedMonths } from './dates';
import { parseResume } from './parseResume';

const TODAY = new Date(2026, 9, 23); // 23 Oct 2026

describe('dates', () => {
  it('reads month-year ranges with an open end', () => {
    const r = findDateRange('Designer | Jan 2024 – Present', TODAY)!;
    expect(r.label).toBe('Jan 2024 – Present');
    expect(r.current).toBe(true);
  });

  it('reads numeric and year-only ranges', () => {
    expect(findDateRange('03/2021 - 06/2023')!.label).toBe('Mar 2021 – Jun 2023');
    expect(findDateRange('2018 to 2020')!.label).toBe('2018 – 2020');
  });

  it('counts overlapping jobs once', () => {
    const a = findDateRange('Jan 2020 - Jan 2022')!;
    const b = findDateRange('Jan 2021 - Jan 2023')!;
    expect(mergedMonths([a, b])).toBe(36);
  });
});

describe('parseResume — sample CV', () => {
  const cv = parseResume(readFileSync('src/data/sample-cv.txt', 'utf8'), TODAY);

  it('pulls the header', () => {
    expect(cv.name).toBe('Alex Morgan');
    expect(cv.headline).toBe('Data Analyst | Applied AI');
    expect(cv.tagline).toMatch(/^Turning messy data/);
    expect(cv.email).toBe('alex.morgan@example.com');
    expect(cv.phone).toBe('+1 415 555 0142');
    expect(cv.location).toBe('Bengaluru, India');
    expect(cv.links.website).toBeUndefined(); // the e-mail domain is not a website
    expect(cv.links.github).toContain('github.com/alex-morgan-example');
  });

  it('builds experience and stats', () => {
    expect(cv.experience).toHaveLength(3);
    expect(cv.experience[0]).toMatchObject({ role: 'Senior Data Analyst', company: 'Northwind Analytics', current: true });
    expect(cv.stats.years).toBe(5);
    expect(cv.stats.yearsPlus).toBe(true);
  });

  it('keeps one-line degrees apart and finds the highest', () => {
    expect(cv.education).toHaveLength(2);
    expect(cv.education[0]).toMatchObject({ short: 'M.Sc.', field: 'Data Science', year: '2021' });
    expect(cv.education[1]).toMatchObject({ year: '2019' });
  });

  it('reads skills, projects, goals and the rest', () => {
    expect(cv.skills).toHaveLength(10);
    expect(cv.projects.map((p) => p.title)).toEqual(['Demand Forecasting Engine', 'Churn Early-Warning Model', 'Ops Command Dashboard', 'Sensor Anomaly Detector']);
    expect(cv.projects[0].tags).toEqual(['Python', 'Prophet', 'dbt']);
    expect(cv.goals[0]).toEqual({ label: 'Goal', value: 'Lead an applied ML team', note: 'within two years' });
    expect(cv.certifications).toHaveLength(2);
    expect(cv.motto).toBe('Sense the data. Think it through. Act on it.');
  });
});

describe('parseResume — other layouts', () => {
  it('handles "Role at Company" and two-line headers', () => {
    const cv = parseResume(
      `Jane Doe
Senior Product Designer
jane@doe.design · +1 415 555 0101 · San Francisco
EXPERIENCE
Senior Product Designer at Figma
Mar 2021 - Present
- Led the design system
Acme Corp
UX Designer, 2017 - 2021
- Shipped mobile app
Education
Bachelor of Design (B.Des) - National Institute of Design, 2017
Skills
Design tools: Figma, Framer, Protopie
Research: Usability testing, Interviews`,
      TODAY,
    );
    expect(cv.name).toBe('Jane Doe');
    expect(cv.headline).toBe('Senior Product Designer');
    expect(cv.location).toBe('San Francisco');
    expect(cv.phone).toBe('+1 415 555 0101');
    expect(cv.experience).toHaveLength(2);
    expect(cv.experience[0]).toMatchObject({ role: 'Senior Product Designer', company: 'Figma' });
    expect(cv.experience[1]).toMatchObject({ role: 'UX Designer', company: 'Acme Corp' });
    expect(cv.stats.years).toBe(9);
    expect(cv.education[0].rank).toBe(3);
    expect(cv.skills).toEqual(['Figma', 'Framer', 'Protopie', 'Usability testing', 'Interviews']);
  });
});
