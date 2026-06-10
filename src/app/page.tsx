import { PageTransition } from "@/components/layout/page-transition";
import { portfolioContent } from "@/lib/content";
import Experience from "@/components/3d/ExperienceWrapper";

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
      <main className="h-[100dvh] w-full overflow-hidden bg-[#050505]">
        <Experience 
          profile={profile}
          stats={heroStats}
          skills={skills}
          experience={experience}
          projects={projects}
          research={research}
          certifications={certifications}
          timeline={timeline}
        />
      </main>
    </PageTransition>
  );
}
