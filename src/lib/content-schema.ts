import { z } from "zod";

const linkSchema = z.object({
  label: z.string().min(1),
  url: z.string().min(1)
});

const imageSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(1)
});

const videoSchema = z.object({
  label: z.string().min(1),
  url: z.string().min(1)
});

const mediaEvidenceSchema = z.object({
  label: z.string().min(1),
  url: z.string().min(1),
  type: z.enum(["image", "video", "document"])
});

export const profileSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  headline: z.string().min(1),
  location: z.string().min(1),
  availability: z.string().min(1),
  email: z.string().email(),
  resumeUrl: z.string().optional().default(""),
  avatar: z.string().optional().default(""),
  summary: z.string().min(1),
  introPhrases: z.array(z.string().min(1)).min(1),
  specialties: z.array(z.string().min(1)).min(1),
  socials: z.array(linkSchema).default([]),
  seo: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    siteUrl: z.string().url(),
    ogImage: z.string().min(1)
  })
});

export const skillGroupSchema = z.object({
  category: z.string().min(1),
  summary: z.string().min(1),
  items: z.array(
    z.object({
      name: z.string().min(1),
      level: z.number().min(0).max(100),
      focus: z.string().min(1)
    })
  )
});

export const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  technologies: z.array(z.string().min(1)).default([]),
  github: z.string().optional().default(""),
  demo: z.string().optional().default(""),
  images: z.array(imageSchema).optional().default([]),
  videos: z.array(videoSchema).optional().default([]),
  certificates: z.array(linkSchema).optional().default([]),
  documents: z.array(linkSchema).optional().default([])
});

export const certificationSchema = z.object({
  title: z.string().min(1),
  issuer: z.string().min(1),
  date: z.string().min(1),
  pdfProof: z.string().optional().default(""),
  previewImage: z.string().optional().default("")
});

export const experienceSchema = z.object({
  role: z.string().min(1),
  organization: z.string().min(1),
  duration: z.string().min(1),
  achievements: z.array(z.string().min(1)).min(1),
  mediaEvidence: z.array(mediaEvidenceSchema).optional().default([])
});

export const researchSchema = z.object({
  statement: z.string().min(1),
  interests: z.array(z.string().min(1)).min(1),
  projects: z.array(
    z.object({
      id: z.string().min(1),
      title: z.string().min(1),
      phase: z.string().min(1),
      description: z.string().min(1),
      methods: z.array(z.string().min(1)).default([]),
      links: z.array(linkSchema).optional().default([])
    })
  ),
  futureDirections: z.array(z.string().min(1)).min(1)
});

export const timelineItemSchema = z.object({
  year: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  tags: z.array(z.string().min(1)).default([])
});

export type Profile = z.infer<typeof profileSchema>;
export type SkillGroup = z.infer<typeof skillGroupSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Certification = z.infer<typeof certificationSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Research = z.infer<typeof researchSchema>;
export type TimelineItem = z.infer<typeof timelineItemSchema>;
