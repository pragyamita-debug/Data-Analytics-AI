import { useScrollSpy } from '../hooks/useScrollSpy';
import type { StoredProfile } from '../lib/types';
import { Hero } from './Hero';
import { NAV, NavBar } from './NavBar';
import { Footer, ProcessSection, ProfileSection, ProjectsSection, StatStrip } from './Sections';
import './Dashboard.css';

const IDS = NAV.map((n) => n.id);

interface Props {
  profile: StoredProfile;
  onUploadNew: () => void;
  onEdit: () => void;
  onReset: () => void;
  onDownloadCv: () => void;
}

export function Dashboard({ profile, onUploadNew, onEdit, onReset, onDownloadCv }: Props) {
  const { resume } = profile;
  const active = useScrollSpy(IDS, 160);

  return (
    <>
      <NavBar
        name={resume.name}
        headline={resume.headline}
        email={resume.email}
        active={active}
        onUploadNew={onUploadNew}
        onEdit={onEdit}
        onDownloadCv={onDownloadCv}
        onReset={onReset}
      />
      <main>
        <Hero resume={resume} onDownloadCv={onDownloadCv} />
        <StatStrip resume={resume} />
        <ProfileSection resume={resume} onDownloadCv={onDownloadCv} />
        <ProjectsSection resume={resume} />
        <ProcessSection resume={resume} />
      </main>
      <Footer resume={resume} />
    </>
  );
}
