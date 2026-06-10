"use client";

import { useEffect } from "react";

export function useGsapReveal() {
  useEffect(() => {
    let ctx: { revert: () => void } | undefined;

    async function init() {
      const gsapModule = await import("gsap");
      const scrollTriggerModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.gsap;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const items = gsap.utils.toArray<HTMLElement>("[data-gsap-reveal]");

        items.forEach((item) => {
          gsap.fromTo(
            item,
            { autoAlpha: 0, y: 34, filter: "blur(8px)" },
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 84%",
                once: true
              }
            }
          );
        });
      });
    }

    void init();

    return () => {
      ctx?.revert();
    };
  }, []);
}
