import certificationsJson from "@/content/certifications.json";
import experienceJson from "@/content/experience.json";
import profileJson from "@/content/profile.json";
import projectsJson from "@/content/projects.json";
import researchJson from "@/content/research.json";
import skillsJson from "@/content/skills.json";
import timelineJson from "@/content/timeline.json";
import {
  certificationSchema,
  experienceSchema,
  profileSchema,
  projectSchema,
  researchSchema,
  skillGroupSchema,
  timelineItemSchema
} from "@/lib/content-schema";

export const portfolioContent = {
  profile: profileSchema.parse(profileJson),
  skills: skillGroupSchema.array().parse(skillsJson),
  projects: projectSchema.array().parse(projectsJson),
  certifications: certificationSchema.array().parse(certificationsJson),
  experience: experienceSchema.array().parse(experienceJson),
  research: researchSchema.parse(researchJson),
  timeline: timelineItemSchema.array().parse(timelineJson)
};
