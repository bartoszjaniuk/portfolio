"use client";
import { GithubLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Notes", href: "/notes" },
  { label: "Workbench", href: "/workbench" },
  { label: "Blog", href: "/blog" },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/bartoszjaniuk",
    icon: GithubLogoIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/bartosz-janiuk-89265717b",
    icon: LinkedinLogoIcon,
  },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-500",
        isScrolled
          ? "border-border/50 bg-background/80 border-b shadow-sm backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <nav className="flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            {/* <div className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-primary/50 bg-primary/10 font-mono text-sm text-primary transition-all duration-400 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/25">
							<span className="glitch">{"⚡"}</span>
						</div> */}
            <span className="font-mono text-sm tracking-tight">
              BARTOSH
              <span className="from-primary/50 to-accent bg-linear-to-l bg-clip-text font-semibold text-transparent">
                .DEV
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "relative rounded-lg px-4 py-2.5 font-mono text-xs tracking-widest uppercase transition-all duration-300",
                  isActive(item.href)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
                  hoveredIndex === index &&
                    !isActive(item.href) &&
                    "text-foreground",
                )}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <span
                  className={cn(
                    "transition-transform duration-200",
                    (hoveredIndex === index || isActive(item.href)) &&
                      "translate-x-2",
                  )}
                >
                  {item.label}
                </span>
                <span
                  className={cn(
                    "bg-primary absolute bottom-1 left-1/2 h-0.5 -translate-x-1/2 rounded-full transition-all duration-300",
                    isActive(item.href)
                      ? "w-6"
                      : hoveredIndex === index
                        ? "w-6"
                        : "w-0",
                  )}
                />
              </Link>
            ))}
            <div className="ml-2 flex items-center gap-1">
              {/* <ThemeChanger /> */}
              <ThemeToggle />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-1 sm:flex">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="group text-muted-foreground hover:text-primary hover:bg-primary/10 relative flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-300"
                >
                  <link.icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  <span className="bg-card border-border text-muted-foreground pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 rounded-md border px-2.5 py-1 font-mono text-[10px] whitespace-nowrap opacity-0 shadow-lg transition-all duration-200 group-hover:-bottom-9 group-hover:opacity-100">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>

            {/* <div className="hidden items-center gap-2.5 font-mono text-xs text-muted-foreground sm:flex px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50">
							<span className="relative flex h-2 w-2">
								<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
								<span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
							</span>
							<span>status: building</span>
						</div> */}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="border-border bg-card/50 hover:bg-secondary flex h-10 w-10 items-center justify-center rounded-lg border transition-colors md:hidden"
              aria-label="Toggle menu"
            >
              <div className="flex w-5 flex-col gap-1.5">
                <span
                  className={cn(
                    "bg-foreground h-0.5 origin-center transition-all duration-300",
                    isMobileMenuOpen ? "w-5 translate-y-2 rotate-45" : "w-5",
                  )}
                />
                <span
                  className={cn(
                    "bg-foreground h-0.5 w-3.5 transition-all duration-300",
                    isMobileMenuOpen && "translate-x-2 opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "bg-foreground h-0.5 origin-center transition-all duration-300",
                    isMobileMenuOpen ? "w-5 -translate-y-2 -rotate-45" : "w-5",
                  )}
                />
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={cn(
            "bg-background transition-all duration-400 md:hidden",
            isMobileMenuOpen
              ? "max-h-96 pt-4 opacity-100"
              : "max-h-0 opacity-0",
          )}
        >
          <div className="border-border/50 flex flex-col gap-1 border-t pt-4">
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-muted-foreground active:bg-secondary hover:text-foreground hover:bg-secondary/50 flex items-center gap-3 rounded-lg px-4 py-3.5 font-mono text-sm tracking-widest uppercase transition-all duration-200"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-primary">{">"}</span>
                {item.label}
              </Link>
            ))}

            <div className="border-border/50 mt-4 flex items-center gap-2 border-t px-4 pt-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="border-border/50 text-muted-foreground active:bg-secondary hover:border-primary/50 hover:text-primary hover:bg-primary/10 flex h-11 w-11 items-center justify-center rounded-lg border transition-colors"
                >
                  <link.icon className="h-4 w-4" />
                </a>
              ))}
              <div className="border-border/50 flex h-11 w-11 items-center justify-center rounded-lg border">
                {/* <ThemeChanger /> */}
              </div>
              <div className="border-border/50 flex h-11 w-11 items-center justify-center rounded-lg border">
                <ThemeToggle />
              </div>
            </div>

            {/* <div className="mt-3 flex items-center gap-2.5 px-4 py-3 font-mono text-xs text-muted-foreground bg-secondary/30 rounded-lg mx-4 mb-2">
							<span className="relative flex h-2 w-2">
								<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
								<span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
							</span>
							<span>status: building</span>
						</div> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
