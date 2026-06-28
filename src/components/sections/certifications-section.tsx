"use client";

import { useState } from "react";
import { Award, ExternalLink, FileText } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import type { Certification } from "@/lib/content-schema";
import { isPresent } from "@/lib/utils";

export function CertificationsSection({
  certifications
}: {
  certifications: Certification[];
}) {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  return (
    <section className="section-band py-20 sm:py-28" id="certifications">
      <div className="container">
        <SectionHeading
          description="Click any certificate to view details and proof documents."
          eyebrow="Certifications"
          title="Credential snapshots."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {certifications.map((certificate) => (
            <article
              className="technical-panel card-hover-lift group cursor-pointer rounded-md p-5"
              data-gsap-reveal
              key={`${certificate.title}-${certificate.issuer}`}
              onClick={() => setSelectedCert(certificate)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedCert(certificate);
                }
              }}
            >
              {/* Hover preview image */}
              <div className="relative mb-4 overflow-hidden rounded-md">
                {isPresent(certificate.previewImage) ? (
                  <motion.div
                    className="aspect-[16/10] w-full"
                    initial={false}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      alt={`${certificate.title} preview`}
                      className="h-full w-full rounded-md border border-white/10 object-cover opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                      height={320}
                      loading="lazy"
                      src={certificate.previewImage}
                      unoptimized
                      width={512}
                    />
                  </motion.div>
                ) : (
                  <div className="grid aspect-[16/10] place-items-center rounded-md border border-white/10 bg-white/[0.03]">
                    <Award
                      aria-hidden="true"
                      className="h-10 w-10 text-primary"
                    />
                  </div>
                )}
              </div>

              <Badge variant="accent">{certificate.date}</Badge>
              <h3 className="mt-3 text-base font-semibold leading-snug text-foreground">
                {certificate.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {certificate.issuer}
              </p>
              
              {isPresent(certificate.pdfProof) ? (
                <div className="mt-4">
                  <Button asChild data-sound size="sm" variant="outline" onClick={(e) => e.stopPropagation()}>
                    <a
                      href={certificate.pdfProof}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <FileText aria-hidden="true" className="mr-2 h-4 w-4" />
                      View PDF Proof
                    </a>
                  </Button>
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>

      {/* Certificate Detail Modal */}
      <Modal
        open={selectedCert !== null}
        onClose={() => setSelectedCert(null)}
        title={selectedCert?.title}
      >
        {selectedCert ? (
          <div>
            {isPresent(selectedCert.previewImage) ? (
              <Image
                alt={`${selectedCert.title} certificate`}
                className="w-full rounded-lg border border-white/10 object-contain"
                height={600}
                loading="lazy"
                src={selectedCert.previewImage}
                unoptimized
                width={800}
              />
            ) : (
              <div className="grid aspect-video place-items-center rounded-lg border border-white/10 bg-white/[0.03]">
                <Award
                  aria-hidden="true"
                  className="h-16 w-16 text-primary"
                />
              </div>
            )}

            <div className="mt-6">
              <Badge variant="accent">{selectedCert.date}</Badge>
              <h2 className="mt-4 text-2xl font-semibold text-foreground">
                {selectedCert.title}
              </h2>
              <p className="mt-2 text-lg text-muted-foreground">
                Issued by {selectedCert.issuer}
              </p>
            </div>

            {isPresent(selectedCert.pdfProof) ? (
              <div className="mt-6">
                <Button asChild data-sound variant="outline">
                  <a
                    href={selectedCert.pdfProof}
                    rel="noreferrer"
                    target="_blank"
                  >
                    View PDF Proof
                    <ExternalLink aria-hidden="true" className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            ) : null}
          </div>
        ) : null}
      </Modal>
    </section>
  );
}
