"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import * as motion from "framer-motion/client";

const links = [
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? "bg-background/80 backdrop-blur-lg border-b shadow-sm" 
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="container mx-auto max-w-7xl px-6 flex h-16 items-center justify-between">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md overflow-hidden flex-shrink-0">
              <Image src="/logo.svg" alt="TheWhy" width={28} height={28} className="w-full h-full object-cover" />
            </div>
            <span className="inline-block font-extrabold tracking-tight text-lg hover:text-primary transition-colors">
              TheWhy.
            </span>
          </Link>
          <nav className="hidden gap-8 md:flex">
            {links.map(({ href, label }) => {
              const isActive = pathname === href || (pathname.startsWith(href) && href !== "/");
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative flex items-center text-sm font-medium transition-colors hover:text-foreground ${
                    isActive ? "text-foreground" : "text-foreground/60"
                  }`}
                >
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-underline"
                      className="absolute -bottom-[21px] left-0 right-0 h-[2px] bg-foreground"
                      initial={false}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center justify-end space-x-4">
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}
