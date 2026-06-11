"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { SoundToggle } from "@/components/layout/sound-toggle";
import { navItems } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { NavigationState } from "@/lib/navigation-state";

type SiteHeaderProps = {
  name: string;
};

export function SiteHeader({ name }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const isProgrammaticScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Subscribe to the single source of truth for navigation state
  useEffect(() => {
    return NavigationState.subscribe((section) => {
      setActiveSection(section);
      // Optional: keep URL hash in sync cleanly without jumping
      if (typeof window !== "undefined" && window.location.hash !== `#${section}`) {
        window.history.replaceState(null, "", `#${section}`);
      }
    });
  }, []);

  // Track scrolling even inside the Drei wrapper
  useEffect(() => {
    function onScroll(e: Event) {
      const target = e.target as HTMLElement;
      if (target && target.scrollTop !== undefined) {
        setScrolled(target.scrollTop > 12);
      } else {
        setScrolled(window.scrollY > 12);
      }
    }

    // Use capture phase to intercept scroll from Drei's hidden wrapper
    window.addEventListener("scroll", onScroll, { capture: true, passive: true });
    return () => window.removeEventListener("scroll", onScroll, { capture: true });
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScrolling.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            NavigationState.setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    // Initial check for sections after 3D loads
    const timeout = setTimeout(() => {
      const sections = document.querySelectorAll("section[data-section]");
      sections.forEach((section) => observer.observe(section));
    }, 1000);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.slice(1);
      const element = document.querySelector(href);
      
      if (element) {
        // Lock intersection observer tracking
        isProgrammaticScrolling.current = true;
        
        // Immediately update state and hash
        NavigationState.setActiveSection(targetId);
        
        // Perform the scroll
        element.scrollIntoView({ behavior: "smooth" });
        setOpen(false);

        // Unlock after smooth scroll completes
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
          isProgrammaticScrolling.current = false;
        }, 1000);
      }
    }
  };

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
          onClick={(e) => handleNavClick(e, "#hero")}
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
          {navItems.slice(1, -1).map((item) => (
            <a
              className={cn(
                "rounded-md px-3 py-2 text-sm transition hover:bg-white/5 hover:text-foreground",
                activeSection === item.href.slice(1) ? "text-foreground font-medium bg-white/5" : "text-muted-foreground"
              )}
              data-sound
              href={item.href}
              key={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <SoundToggle />
          <Button asChild className="hidden sm:inline-flex" data-sound size="sm">
            <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")}>Contact</a>
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
                className={cn(
                  "rounded-md px-3 py-3 text-sm transition hover:bg-white/5 hover:text-foreground",
                  activeSection === item.href.slice(1) ? "text-foreground font-medium bg-white/5" : "text-muted-foreground"
                )}
                data-sound
                href={item.href}
                key={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
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
