"use client";

import { Badge } from "@/components/ui/badge";
import type { Profile, Project, Research, SkillGroup, TimelineItem, Experience, Certification } from "@/lib/content-schema";

type DomOverlayProps = {
  profile: Profile;
  stats: {
    projects: number;
    internships: number;
    certifications: number;
    researchInterests: number;
  };
  projects: Project[];
  research: Research;
  skills: SkillGroup[];
  timeline: TimelineItem[];
  experience: Experience[];
  certifications: Certification[];
};

export function DomOverlay({ profile, stats, projects, research, skills, timeline, experience, certifications }: DomOverlayProps) {
  const dungeonProject = projects.find((p) => p.title.toLowerCase().includes("dungeon")) || projects[0];
  const verterraProject = projects.find((p) => p.title.toLowerCase().includes("verterra")) || projects[1] || projects[0];

  return (
    <div className="w-screen flex flex-col pointer-events-none">
      {/* 1. Hero Scene (z = 0) */}
      <section className="w-screen h-screen flex items-center justify-center snap-center">
        <div className="flex flex-col items-center text-center max-w-4xl px-4 pointer-events-auto">
          <Badge variant="accent" className="mb-6">
            {profile.availability}
          </Badge>
          <h1 className="text-5xl font-semibold leading-[1.02] text-white sm:text-7xl lg:text-8xl drop-shadow-2xl">
            {profile.name}
          </h1>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {["Computer Science Engineer", "Unity Developer", "XR Developer", "Procedural Generation", "Graphics Systems"].map((role) => (
              <Badge key={role} variant="secondary" className="bg-black/50 backdrop-blur-md border-white/20 text-sm">
                {role}
              </Badge>
            ))}
          </div>
          <p className="mt-8 text-xl font-mono text-primary max-w-2xl mx-auto drop-shadow-md">
            Building systems, graphics applications, XR experiences, and rendering technology.
          </p>
        </div>
      </section>

      {/* 2. Dungeon Scene (z = -12) */}
      <section className="w-screen h-screen flex items-center justify-end px-12 md:px-24 snap-center">
        <div className="technical-panel glassmorphism rounded-xl p-6 border border-white/10 bg-black/60 backdrop-blur-md pointer-events-auto w-[400px]">
          <div className="flex justify-between items-center mb-4">
            <Badge variant="accent">Procedural Generation</Badge>
            <span className="text-xs text-primary animate-pulse flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-primary" /> Active</span>
          </div>
          <h2 className="text-2xl font-semibold text-white mb-2">{dungeonProject?.title || "Procedural Dungeon"}</h2>
          <p className="text-sm text-neutral-300 font-mono mb-4 leading-relaxed">
            {dungeonProject?.description || "Simulating dungeon connectivity paths and room generation in real-time."}
          </p>

          {/* Conditional Media Render */}
          {dungeonProject?.videos && dungeonProject.videos.length > 0 && (
            <div className="mb-4 rounded-lg overflow-hidden border border-white/10">
              {dungeonProject.videos[0].url.endsWith('.mp4') ? (
                <video src={dungeonProject.videos[0].url} autoPlay loop muted playsInline className="w-full h-auto" />
              ) : (
                <img src={dungeonProject.videos[0].url} alt={dungeonProject.videos[0].label} className="w-full h-auto" />
              )}
            </div>
          )}
          {dungeonProject?.images && dungeonProject.images.length > 0 && (!dungeonProject.videos || dungeonProject.videos.length === 0) && (
            <div className="mb-4 rounded-lg overflow-hidden border border-white/10">
              <img src={dungeonProject.images[0].src} alt={dungeonProject.images[0].alt} className="w-full h-auto" />
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {dungeonProject?.technologies?.map((tech: string) => (
              <Badge key={tech} variant="secondary" className="text-xs bg-white/5 border-white/10">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Research Scene (z = -24) */}
      <section className="w-screen h-screen flex items-center justify-start px-12 md:px-24 snap-center">
        <div className="technical-panel glassmorphism rounded-xl p-6 border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl pointer-events-auto shadow-[0_0_50px_rgba(45,212,191,0.1)] w-[480px]">
          <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
            <h2 className="text-xl font-bold text-white tracking-widest uppercase">Adaptive Runtime</h2>
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs text-red-500 font-mono font-bold">REC</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-black/50 border border-white/5 rounded-lg p-3">
              <p className="text-[10px] text-neutral-400 font-mono uppercase mb-1">Target FPS</p>
              <p className="text-2xl text-primary font-mono font-bold">120.0</p>
            </div>
            <div className="bg-black/50 border border-white/5 rounded-lg p-3">
              <p className="text-[10px] text-neutral-400 font-mono uppercase mb-1">VRAM Usage</p>
              <p className="text-2xl text-accent font-mono font-bold">4.2 GB</p>
            </div>
          </div>

          <p className="text-sm text-neutral-300 font-mono mb-4 leading-relaxed line-clamp-3">
            {research?.statement || "Exploring adaptive level-of-detail and dynamic shader complexity for VR rendering."}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {research?.interests?.slice(0, 3).map((interest: string) => (
              <Badge key={interest} variant="outline" className="text-xs border-primary/30 text-primary">
                {interest}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Verterra Scene (z = -36) */}
      <section className="w-screen h-screen flex items-center justify-end px-12 md:px-24 snap-center">
        <div className="technical-panel glassmorphism rounded-xl p-6 border border-white/10 bg-black/60 backdrop-blur-md pointer-events-auto w-[350px]">
          <Badge variant="accent" className="mb-4">Interactive Simulation</Badge>
          <h2 className="text-2xl font-semibold text-white mb-2">{verterraProject?.title || "Verterra"}</h2>
          <p className="text-sm text-neutral-300 font-mono mb-4 leading-relaxed">
            {verterraProject?.description || "A dynamic globe visualizing environmental data and ecosystem transitions."}
          </p>

          {/* Conditional Media Render */}
          {verterraProject?.videos && verterraProject.videos.length > 0 && (
            <div className="mb-4 rounded-lg overflow-hidden border border-white/10">
              {verterraProject.videos[0].url.endsWith('.mp4') ? (
                <video src={verterraProject.videos[0].url} autoPlay loop muted playsInline className="w-full h-auto" />
              ) : (
                <img src={verterraProject.videos[0].url} alt={verterraProject.videos[0].label} className="w-full h-auto" />
              )}
            </div>
          )}
          {verterraProject?.images && verterraProject.images.length > 0 && (!verterraProject.videos || verterraProject.videos.length === 0) && (
            <div className="mb-4 rounded-lg overflow-hidden border border-white/10">
              <img src={verterraProject.images[0].src} alt={verterraProject.images[0].alt} className="w-full h-auto" />
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {verterraProject?.technologies?.map((tech: string) => (
              <Badge key={tech} variant="secondary" className="text-xs bg-white/5 border-white/10">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Skills Scene (z = -48) */}
      <section className="w-screen h-screen flex flex-col items-center justify-center px-12 md:px-24 snap-center gap-12 relative">
        <div className="text-center mt-auto mb-12 pointer-events-auto">
          <h2 className="text-3xl font-bold text-white mb-4 tracking-widest uppercase drop-shadow-lg">Skill Progression</h2>
          <p className="text-neutral-400 font-mono text-sm leading-relaxed max-w-xl mx-auto bg-black/50 p-4 rounded-lg backdrop-blur-md">
            RPG-style node graph. Explore categories to reveal specific proficiencies, related projects, and certifications.
          </p>
        </div>
        
        {/* We map skills as small HTML nodes floating around the center */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {skills?.map((category, i: number) => {
            const angle = (i / skills.length) * Math.PI * 2;
            const radius = 300; // Screen pixels instead of 3D units
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <div 
                key={category.category} 
                className="absolute bg-black/90 border border-primary/50 p-3 rounded-lg shadow-[0_0_15px_rgba(45,212,191,0.4)] pointer-events-auto backdrop-blur-md"
                style={{ transform: `translate(${x}px, ${y}px)` }}
              >
                <span className="text-primary font-bold tracking-wider uppercase text-sm block mb-1">{category.category}</span>
                <div className="text-xs text-neutral-400 font-mono">
                  LVL <span className="text-white">{category.items?.length * 10}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Timeline Scene (z = -60) */}
      <section className="w-screen h-[150vh] flex flex-col items-center justify-start pt-32 px-4 snap-start relative pointer-events-none">
        <h2 className="text-4xl font-bold text-white mb-16 tracking-widest uppercase drop-shadow-lg pointer-events-auto bg-black/50 p-4 rounded-xl backdrop-blur-md">Experience Timeline</h2>
        <div className="flex flex-col gap-12 max-w-2xl w-full relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-neutral-800" />
          
          {timeline?.slice(0, 3).map((item, i: number) => (
            <div key={item.title} className="technical-panel glassmorphism rounded-xl p-6 border border-white/10 bg-black/60 backdrop-blur-md pointer-events-auto ml-16 relative">
              <div className="absolute -left-20 top-6 w-12 h-0.5 bg-primary/50" />
              <div className="absolute -left-[85px] top-4 w-4 h-4 rounded-full border-2 border-primary bg-black" />
              
              <Badge variant="accent" className="mb-2">{item.year}</Badge>
              <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
