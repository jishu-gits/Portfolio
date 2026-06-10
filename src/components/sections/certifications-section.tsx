import { Award, ExternalLink } from "lucide-react";
import Image from "next/image";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Certification } from "@/lib/content-schema";
import { isPresent } from "@/lib/utils";

export function CertificationsSection({
  certifications
}: {
  certifications: Certification[];
}) {
  return (
    <section className="section-band py-20 sm:py-28" id="certifications">
      <div className="container">
        <SectionHeading
          description="Certificates are configured in JSON with optional PDF proofs and preview images."
          eyebrow="Certifications"
          title="Credential snapshots and proof-ready entries."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((certificate) => (
            <article
              className="technical-panel rounded-md p-5"
              data-gsap-reveal
              key={`${certificate.title}-${certificate.issuer}`}
            >
              {isPresent(certificate.previewImage) ? (
                <Image
                  alt={`${certificate.title} preview`}
                  className="aspect-[16/10] w-full rounded-md border border-white/10 object-cover"
                  height={320}
                  loading="lazy"
                  src={certificate.previewImage}
                  unoptimized
                  width={512}
                />
              ) : (
                <div className="grid aspect-[16/10] place-items-center rounded-md border border-white/10 bg-white/[0.03]">
                  <Award aria-hidden="true" className="h-10 w-10 text-primary" />
                </div>
              )}

              <div className="mt-5">
                <Badge variant="accent">{certificate.date}</Badge>
                <h3 className="mt-4 text-xl font-semibold text-foreground">
                  {certificate.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {certificate.issuer}
                </p>
              </div>

              {isPresent(certificate.pdfProof) ? (
                <div className="mt-5">
                  <Button asChild data-sound size="sm" variant="outline">
                    <a href={certificate.pdfProof} rel="noreferrer" target="_blank">
                      View proof
                      <ExternalLink aria-hidden="true" className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
