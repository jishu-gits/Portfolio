"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SoundToggle } from "@/components/layout/sound-toggle";
import { navItems } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  name: string;
};

export function SiteHeader({ name }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 border-b transition-colors",
        scrolled
          ? "border-white/10 bg-background/[0.82] backdrop-blur-xl"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        <a
          className="group flex items-center gap-3"
          data-sound
          href="#hero"
          onClick={() => setOpen(false)}
        >
          <span className="grid h-9 w-9 place-items-center rounded-md border border-primary/35 bg-primary/10 font-mono text-sm font-bold text-primary shadow-signal-sm">
            CS
          </span>
          <span className="hidden min-w-0 flex-col sm:flex">
            <span className="truncate text-sm font-semibold text-foreground">
              {name}
            </span>
            <span className="truncate font-mono text-[11px] uppercase text-muted-foreground">
              XR Graphics Research
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navItems.slice(1).map((item) => (
            <a
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
              data-sound
              href={item.href}
              key={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <SoundToggle />
          <Button asChild className="hidden sm:inline-flex" data-sound size="sm">
            <a href="#contact">Contact</a>
          </Button>
          <Button
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="lg:hidden"
            data-sound
            onClick={() => setOpen((current) => !current)}
            size="icon"
            title={open ? "Close menu" : "Open menu"}
            type="button"
            variant="outline"
          >
            {open ? (
              <X aria-hidden="true" className="h-4 w-4" />
            ) : (
              <Menu aria-hidden="true" className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-background/[0.96] backdrop-blur-xl lg:hidden">
          <nav className="container grid gap-1 py-4" aria-label="Mobile navigation">
            {navItems.slice(1).map((item) => (
              <a
                className="rounded-md px-3 py-3 text-sm text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
                data-sound
                href={item.href}
                key={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
