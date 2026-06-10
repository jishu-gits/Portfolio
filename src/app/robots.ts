import type { MetadataRoute } from "next";
import { portfolioContent } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || portfolioContent.profile.seo.siteUrl;

  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `${siteUrl}/sitemap.xml`
  };
}
