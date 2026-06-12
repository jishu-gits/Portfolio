"use client";

import { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { SectionRegistry } from "@/lib/section-registry";
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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let observer: ResizeObserver;
    
    // Register sections initially
    const sections = document.querySelectorAll("section[data-section]");
    sections.forEach((el) => {
      const id = el.id;
      // Basic association mapping based on ID
      let sceneAssoc = "Unknown";
      if (id === "hero") sceneAssoc = "HeroScene";
      else if (id === "about") sceneAssoc = "None";
      else if (id === "skills") sceneAssoc = "SkillsScene";
      else if (id === "experience") sceneAssoc = "None";
      else if (id === "projects") sceneAssoc = "Dungeon/VerterraScene";
      else if (id === "research") sceneAssoc = "ResearchScene";
      else if (id === "certifications") sceneAssoc = "None";
      else if (id === "timeline") sceneAssoc = "TimelineScene";
      else if (id === "contact") sceneAssoc = "None";
      
      SectionRegistry.register(id, el as HTMLElement, sceneAssoc);
    });

    if (containerRef.current) {
      observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
          if (entry.target === containerRef.current) {
            SectionRegistry.updateDimensions(entry.contentRect.height);
          }
        }
      });
      observer.observe(containerRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-screen flex flex-col pointer-events-none">
      {/* 1. Hero */}
      <section id="hero" data-section className="w-screen h-screen flex items-center justify-center snap-center relative">
        <div className="flex flex-col items-center text-center max-w-4xl px-8 py-10 pointer-events-auto bg-black/40 backdrop-blur-md rounded-3xl border border-white/10">
          <Badge variant="accent" className="mb-6">
            {profile.availability}
          </Badge>
          <h1 className="text-5xl font-semibold leading-[1.02] text-white sm:text-7xl lg:text-8xl drop-shadow-lg">
            {profile.name}
          </h1>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {profile.specialties?.map((role) => (
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

      {/* 2. About */}
      <section id="about" data-section className="w-screen h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 snap-center relative pointer-events-auto">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start max-w-6xl w-full bg-black/60 backdrop-blur-md rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4 tracking-widest uppercase drop-shadow-lg">About</h2>
            <p className="text-lg leading-8 text-neutral-200 drop-shadow-sm font-mono">
              {profile.summary}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 h-fit">
            {[
              ["Education", "VIT Bhopal (B.Tech CSE)"],
              ["Duration", "Aug 2022 – May 2026"],
              ["CGPA", "7.86"]
            ].map(([label, value]) => (
              <div className="rounded-md border border-white/10 bg-white/[0.03] p-5" key={label}>
                <p className="font-mono text-xs uppercase text-muted-foreground">{label}</p>
                <p className="mt-3 text-lg font-semibold text-foreground">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Skills */}
      <section id="skills" data-section className="w-screen min-h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 py-24 snap-center relative">
        <div className="text-center mb-12 pointer-events-auto bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl">
          <h2 className="text-3xl font-bold text-white mb-4 tracking-widest uppercase drop-shadow-lg">Skill Progression</h2>
          <p className="text-neutral-300 font-mono text-sm leading-relaxed max-w-xl mx-auto drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            Explore categories to reveal specific proficiencies, related projects, and certifications.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl pointer-events-auto">
          {skills?.map((category) => (
            <div key={category.category} className="bg-black/80 border border-primary/30 p-5 rounded-xl shadow-[0_0_20px_rgba(45,212,191,0.15)] backdrop-blur-xl flex flex-col h-full">
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

      {/* 4. Experience */}
      <section id="experience" data-section className="w-screen min-h-screen flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 py-24 snap-start relative pointer-events-auto">
        <h2 className="text-4xl font-bold text-white mb-16 tracking-widest uppercase drop-shadow-lg bg-black/60 px-8 py-4 rounded-2xl backdrop-blur-xl border border-white/10 shadow-2xl">
          Experience
        </h2>
        <div className="flex flex-col gap-8 w-full max-w-4xl">
          {experience?.map((job) => (
            <div key={job.organization} className="bg-black/70 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white drop-shadow-md">{job.role}</h3>
                  <p className="text-lg text-primary font-mono">{job.organization}</p>
                </div>
                <Badge variant="outline" className="w-fit text-neutral-300 border-white/20 bg-black/50">{job.duration}</Badge>
              </div>
              <ul className="list-disc pl-5 space-y-3 text-neutral-300 font-mono text-sm leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                {job.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Projects */}
      <section id="projects" data-section className="w-screen min-h-[200vh] flex flex-col items-center justify-start pt-32 px-12 md:px-24 relative pointer-events-none">
        <h2 className="text-4xl font-bold text-white mb-16 tracking-widest uppercase drop-shadow-lg pointer-events-auto bg-black/60 px-8 py-4 rounded-2xl backdrop-blur-xl border border-white/10 shadow-2xl">
          Projects
        </h2>
        
        {projects?.map((project, index) => (
          <div key={project.title} className={`technical-panel glassmorphism rounded-xl p-6 border border-white/10 bg-black/60 backdrop-blur-md pointer-events-auto w-[400px] mb-[75vh] ${index % 2 === 0 ? 'mr-auto ml-12' : 'ml-auto mr-12'}`}>
            <h2 className="text-2xl font-semibold text-white mb-2 drop-shadow-md">{project.title}</h2>
            <p className="text-sm text-neutral-300 font-mono mb-4 leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              {project.description}
            </p>

            {project.videos && project.videos.length > 0 && (
              <div className="mb-4 rounded-lg overflow-hidden border border-white/10">
                {project.videos[0].url.endsWith('.mp4') ? (
                  <video src={project.videos[0].url} autoPlay loop muted playsInline className="w-full h-auto" />
                ) : (
                  <img src={project.videos[0].url} alt={project.videos[0].label} className="w-full h-auto" />
                )}
              </div>
            )}
            {project.images && project.images.length > 0 && (!project.videos || project.videos.length === 0) && (
              <div className="mb-4 rounded-lg overflow-hidden border border-white/10">
                <img src={project.images[0].src} alt={project.images[0].alt} className="w-full h-auto" />
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {project.technologies?.map((tech: string) => (
                <Badge key={tech} variant="secondary" className="text-xs bg-white/5 border-white/10">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* 6. Research */}
      <section id="research" data-section className="w-screen h-screen flex items-center justify-start px-12 md:px-24 snap-center relative pointer-events-none">
        <div className="technical-panel glassmorphism rounded-xl p-6 border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl pointer-events-auto shadow-[0_0_50px_rgba(45,212,191,0.1)] w-[480px]">
          <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
            <h2 className="text-xl font-bold text-white tracking-widest uppercase drop-shadow-md">Research</h2>
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
            {research?.statement}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {research?.interests?.map((interest: string) => (
              <Badge key={interest} variant="outline" className="text-xs border-primary/30 text-primary bg-black/40">
                {interest}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Certifications */}
      <section id="certifications" data-section className="w-screen min-h-[100vh] flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 py-24 snap-start relative pointer-events-auto">
        <h2 className="text-4xl font-bold text-white mb-16 tracking-widest uppercase drop-shadow-lg bg-black/60 px-8 py-4 rounded-2xl backdrop-blur-xl border border-white/10 shadow-2xl">
          Certifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {certifications?.map((cert) => (
            <div key={cert.title} className="bg-black/60 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-primary/50 transition-colors shadow-lg">
              <p className="font-mono text-xs uppercase text-primary mb-2">{cert.issuer}</p>
              <h3 className="text-lg font-bold text-white mb-2">{cert.title}</h3>
              <p className="text-sm text-neutral-400 font-mono">{cert.date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Timeline */}
      <section id="timeline" data-section className="w-screen min-h-[150vh] flex flex-col items-center justify-start pt-32 px-4 snap-start relative pointer-events-none">
        <h2 className="text-4xl font-bold text-white mb-16 tracking-widest uppercase drop-shadow-lg pointer-events-auto bg-black/60 px-8 py-4 rounded-2xl backdrop-blur-xl border border-white/10 shadow-2xl">
          Timeline
        </h2>
        <div className="flex flex-col gap-12 max-w-2xl w-full relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-neutral-800" />
          {timeline?.map((item, i: number) => (
            <div key={`${item.title}-${i}`} className="technical-panel glassmorphism rounded-xl p-6 border border-white/10 bg-black/80 backdrop-blur-xl pointer-events-auto ml-16 relative shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <div className="absolute -left-20 top-6 w-12 h-0.5 bg-primary/50" />
              <div className="absolute -left-[85px] top-4 w-4 h-4 rounded-full border-2 border-primary bg-black shadow-[0_0_10px_rgba(45,212,191,0.5)]" />
              <Badge variant="accent" className="mb-3">{item.year}</Badge>
              <h3 className="text-xl font-semibold text-white mb-3 drop-shadow-md">{item.title}</h3>
              <p className="text-sm text-neutral-300 leading-relaxed font-mono drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Contact */}
      <section id="contact" data-section className="w-screen min-h-[80vh] flex flex-col items-center justify-center px-6 snap-end relative pointer-events-auto">
        <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-12 border border-white/10 text-center max-w-2xl w-full shadow-2xl">
          <h2 className="text-4xl font-bold text-white mb-6 drop-shadow-md">Get In Touch</h2>
          <p className="text-lg text-neutral-300 font-mono mb-8 drop-shadow-sm">
            {profile.availability}
          </p>
          <a href={`mailto:${profile.email}`} className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm h-10 px-8 py-2 mb-8">
            Say Hello
          </a>
          <div className="flex justify-center gap-6 mt-8 border-t border-white/10 pt-8">
            {profile.socials?.map((social) => (
              <a key={social.url} href={social.url} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-primary transition-colors font-mono text-sm uppercase">
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
