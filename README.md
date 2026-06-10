# Graphics Research Portfolio

Premium interactive portfolio for a Computer Science Engineer specializing in Unity, XR/AR/VR, procedural generation, graphics systems, and adaptive rendering research.

## Stack

- Next.js 15 App Router
- TypeScript
- TailwindCSS
- Framer Motion
- Three.js and React Three Fiber
- GSAP ScrollTrigger
- shadcn/ui-style local components
- JSON-backed content with Zod validation

## Quick Start

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

Production check:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## One-Click Vercel Deployment

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Import it in Vercel.
3. Vercel will use the included `vercel.json` commands.
4. Set `NEXT_PUBLIC_SITE_URL` to your production URL.
5. Deploy.

Optional badge for your final hosted repo:

```md
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)
```

## Folder Structure

```txt
public/
  favicon.svg
  og-card.svg
  media/
    certifications/
    experience/
    projects/
  documents/
src/
  app/
    globals.css
    layout.tsx
    page.tsx
    robots.ts
    sitemap.ts
  components/
    layout/
    sections/
    ui/
    visuals/
  content/
    certifications.json
    experience.json
    profile.json
    projects.json
    research.json
    skills.json
    timeline.json
  hooks/
  lib/
    content-schema.ts
    content.ts
    navigation.ts
    utils.ts
```

## Editing Content

All portfolio content lives in `src/content`. You can update text, links, skills, project media, certifications, experience, research, and timeline entries without touching React components.

Project entries support:

```json
{
  "title": "Project title",
  "description": "Short project description",
  "technologies": ["Unity", "OpenXR"],
  "github": "https://github.com/...",
  "demo": "https://...",
  "images": [{ "src": "/media/projects/image.svg", "alt": "Preview" }],
  "videos": [{ "label": "Walkthrough", "url": "https://..." }],
  "certificates": [{ "label": "Award", "url": "/documents/award.pdf" }],
  "documents": [{ "label": "Research brief", "url": "/documents/brief.pdf" }]
}
```

All media arrays are optional. Empty arrays are automatically hidden.

Certificate entries support:

```json
{
  "title": "Certificate title",
  "issuer": "Issuer",
  "date": "2025-05",
  "pdfProof": "/documents/certificate.pdf",
  "previewImage": "/media/certifications/preview.svg"
}
```

If `pdfProof` is empty, the proof button is hidden.

Experience entries support:

```json
{
  "role": "Unity XR Engineer",
  "organization": "Studio or lab",
  "duration": "2025 - Present",
  "achievements": ["Built...", "Shipped..."],
  "mediaEvidence": [
    { "label": "Prototype capture", "url": "/media/experience/demo.svg", "type": "image" }
  ]
}
```

The full Zod schema is in `src/lib/content-schema.ts`.

## Media

Drop project screenshots into `public/media/projects`, certificate previews into `public/media/certifications`, evidence into `public/media/experience`, and PDFs into `public/documents`. Reference them from JSON with root-relative paths such as `/media/projects/my-shot.webp`.

## Performance Notes

- React Three Fiber particles load client-side only.
- Images use lazy loading.
- Optional media is not rendered when empty.
- Metadata, Open Graph, sitemap, and robots routes are configured.
- Animations respect `prefers-reduced-motion`.
- The UI avoids external runtime font downloads.

## Customize

- Navigation: `src/lib/navigation.ts`
- Theme tokens: `src/app/globals.css` and `tailwind.config.ts`
- Section components: `src/components/sections`
- Interactive visuals: `src/components/visuals`
