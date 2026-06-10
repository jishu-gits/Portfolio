import { AboutSection } from "@/components/sections/about-section";
import { CertificationsSection } from "@/components/sections/certifications-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ResearchSection } from "@/components/sections/research-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { TimelineSection } from "@/components/sections/timeline-section";
import { PageTransition } from "@/components/layout/page-transition";
import { portfolioContent } from "@/lib/content";

export default function Home() {
  const {
    profile,
    skills,
    experience,
    projects,
    research,
    certifications,
    timeline
  } = portfolioContent;

  const heroStats = {
    projects: projects.length,
    internships: experience.length,
    certifications: certifications.length,
    researchInterests: research.interests.length
  };

  return (
    <PageTransition>
      <HeroSection profile={profile} stats={heroStats} />
      <AboutSection profile={profile} />
      <SkillsSection skills={skills} />
      <ExperienceSection experience={experience} />
      <ProjectsSection projects={projects} />
      <ResearchSection research={research} />
      <CertificationsSection certifications={certifications} />
      <TimelineSection timeline={timeline} />
      <ContactSection profile={profile} />
    </PageTransition>
  );
}
