"use client";

import { useEffect } from "react";
import { useScroll } from "@react-three/drei";
import { NavigationState } from "@/lib/navigation-state";
import { SectionRegistry } from "@/lib/section-registry";

export function ScrollController() {
  const scroll = useScroll();

  useEffect(() => {
    return NavigationState.subscribeToScroll((sectionId) => {
      const section = SectionRegistry.getSection(sectionId);
      if (section && scroll.el) {
        scroll.el.scrollTo({
          top: section.topOffset,
          behavior: "smooth",
        });
      }
    });
  }, [scroll]);

  return null;
}
