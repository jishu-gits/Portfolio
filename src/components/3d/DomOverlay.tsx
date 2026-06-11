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
      <section id="hero" data-section className="w-screen h-screen flex items-center justify-center snap-center">
        <div className="flex flex-col items-center text-center max-w-4xl px-8 py-10 pointer-events-auto bg-black/40 backdrop-blur-md rounded-3xl border border-white/10">
          <Badge variant="accent" className="mb-6">
            {profile.availability}
          </Badge>
          <h1 className="text-5xl font-semibold leading-[1.02] text-white sm:text-7xl lg:text-8xl drop-shadow-lg">
            {profile.name}
          </h1>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {["Computer Science Engineer", "Unity Developer", "XR Developer", "Procedural Generation", "Graphics Systems"].map((role) => (
              <Badge key={role} variant="secondary" className="bg-black/50 backdrop-blur-md border-white/20 text-sm">
                {role}
              </Badge>
            ))}
          </div>
          <p className="mt-8 text-xl font-mono text-primary max-w-2xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Building systems, graphics applications, XR experiences, and rendering technology.
          </p>
        </div>
      </section>

      {/* 2. Dungeon Scene (z = -12) */}
      <section id="projects" data-section className="w-screen h-screen flex items-center justify-end px-12 md:px-24 snap-center">
        <div className="technical-panel glassmorphism rounded-xl p-6 border border-white/10 bg-black/60 backdrop-blur-md pointer-events-auto w-[400px]">
          <div className="flex justify-between items-center mb-4">
            <Badge variant="accent">Procedural Generation</Badge>
            <span className="text-xs text-primary animate-pulse flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-primary" /> Active</span>
          </div>
          <h2 className="text-2xl font-semibold text-white mb-2 drop-shadow-md">{dungeonProject?.title || "Procedural Dungeon"}</h2>
          <p className="text-sm text-neutral-300 font-mono mb-4 leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
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
      <section id="research" data-section className="w-screen h-screen flex items-center justify-start px-12 md:px-24 snap-center">
        <div className="technical-panel glassmorphism rounded-xl p-6 border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl pointer-events-auto shadow-[0_0_50px_rgba(45,212,191,0.1)] w-[480px]">
          <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
            <h2 className="text-xl font-bold text-white tracking-widest uppercase drop-shadow-md">Adaptive Runtime</h2>
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs text-red-500 font-mono font-bold drop-shadow-md">REC</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-black/50 border border-white/5 rounded-lg p-3">
              <p className="text-[10px] text-neutral-400 font-mono uppercase mb-1">Target FPS</p>
              <p className="text-2xl text-primary font-mono font-bold drop-shadow-md">120.0</p>
            </div>
            <div className="bg-black/50 border border-white/5 rounded-lg p-3">
              <p className="text-[10px] text-neutral-400 font-mono uppercase mb-1">VRAM Usage</p>
              <p className="text-2xl text-accent font-mono font-bold drop-shadow-md">4.2 GB</p>
            </div>
          </div>

          <p className="text-sm text-neutral-300 font-mono mb-4 leading-relaxed line-clamp-3 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            {research?.statement || "Exploring adaptive level-of-detail and dynamic shader complexity for VR rendering."}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {research?.interests?.slice(0, 3).map((interest: string) => (
              <Badge key={interest} variant="outline" className="text-xs border-primary/30 text-primary bg-black/40">
                {interest}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Verterra Scene (z = -36) */}
      <section id="interactive" data-section className="w-screen h-screen flex items-center justify-end px-12 md:px-24 snap-center">
        <div className="technical-panel glassmorphism rounded-xl p-6 border border-white/10 bg-black/60 backdrop-blur-md pointer-events-auto w-[350px]">
          <Badge variant="accent" className="mb-4">Interactive Simulation</Badge>
          <h2 className="text-2xl font-semibold text-white mb-2 drop-shadow-md">{verterraProject?.title || "Verterra"}</h2>
          <p className="text-sm text-neutral-300 font-mono mb-4 leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
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
      <section id="skills" data-section className="w-screen min-h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 py-24 snap-center relative">
        <div className="text-center mb-12 pointer-events-auto bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl">
          <h2 className="text-3xl font-bold text-white mb-4 tracking-widest uppercase drop-shadow-lg">Skill Progression</h2>
          <p className="text-neutral-300 font-mono text-sm leading-relaxed max-w-xl mx-auto drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            Explore categories to reveal specific proficiencies, related projects, and certifications.
          </p>
        </div>
        
        {/* CSS Grid for proper responsive layout without overlapping */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl pointer-events-auto">
          {skills?.map((category) => (
            <div 
              key={category.category} 
              className="bg-black/80 border border-primary/30 p-5 rounded-xl shadow-[0_0_20px_rgba(45,212,191,0.15)] backdrop-blur-xl flex flex-col h-full"
            >
              <span className="text-primary font-bold tracking-wider uppercase text-sm block mb-4 border-b border-white/10 pb-2 drop-shadow-sm">
                {category.category}
              </span>
              <div className="flex flex-col gap-3 mt-auto">
                {category.items?.map(item => (
                  <div key={item.name} className="flex justify-between items-center gap-4">
                    <span className="text-sm text-neutral-300 font-mono drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] leading-tight">{item.name}</span>
                    <span className="text-white text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded-sm whitespace-nowrap">{item.level}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Timeline Scene (z = -60) */}
      <section id="timeline" data-section className="w-screen min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4 snap-start relative pointer-events-none">
        <h2 id="experience" data-section className="text-4xl font-bold text-white mb-16 tracking-widest uppercase drop-shadow-lg pointer-events-auto bg-black/60 px-8 py-4 rounded-2xl backdrop-blur-xl border border-white/10 shadow-2xl">
          Experience Timeline
        </h2>
        <div className="flex flex-col gap-12 max-w-2xl w-full relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-neutral-800" />
          
          {timeline?.slice(0, 3).map((item, i: number) => (
            <div key={item.title} className="technical-panel glassmorphism rounded-xl p-6 border border-white/10 bg-black/80 backdrop-blur-xl pointer-events-auto ml-16 relative shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <div className="absolute -left-20 top-6 w-12 h-0.5 bg-primary/50" />
              <div className="absolute -left-[85px] top-4 w-4 h-4 rounded-full border-2 border-primary bg-black shadow-[0_0_10px_rgba(45,212,191,0.5)]" />
              
              <Badge variant="accent" className="mb-3">{item.year}</Badge>
              <h3 className="text-xl font-semibold text-white mb-3 drop-shadow-md">{item.title}</h3>
              <p className="text-sm text-neutral-300 leading-relaxed font-mono drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
