"use client";

import dynamic from "next/dynamic";

const Experience = dynamic(() => import("@/components/3d/Experience"), {
  ssr: false,
});

export default Experience;
