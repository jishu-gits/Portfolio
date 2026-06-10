import type { Profile } from "@/lib/content-schema";

export function SiteFooter({ profile }: { profile: Profile }) {
  return (
    <footer className="border-t border-white/10 bg-background py-8">
      <div className="container flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}. Built for real-time
          graphics, XR systems, and research storytelling.
        </p>
        <div className="flex flex-wrap gap-3">
          {profile.socials.map((social) => (
            <a
              className="transition hover:text-primary"
              href={social.url}
              key={social.label}
              rel="noreferrer"
              target="_blank"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
