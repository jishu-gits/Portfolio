"use client";

import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSound } from "@/components/layout/sound-provider";

export function SoundToggle() {
  const { muted, toggleMuted } = useSound();
  const label = muted ? "Enable interface sound" : "Mute interface sound";
  const Icon = muted ? VolumeX : Volume2;

  return (
    <Button
      aria-label={label}
      data-sound
      onClick={toggleMuted}
      size="icon"
      title={label}
      type="button"
      variant="outline"
    >
      <Icon aria-hidden="true" className="h-4 w-4" />
    </Button>
  );
}
