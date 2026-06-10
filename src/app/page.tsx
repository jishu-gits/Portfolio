import dynamic from "next/dynamic";
import { PageTransition } from "@/components/layout/page-transition";
import { portfolioContent } from "@/lib/content";

const Experience = dynamic(() => import("@/components/3d/Experience"), {
  ssr: false,
});

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
