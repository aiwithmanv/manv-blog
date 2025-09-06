'use client';

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteNav() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const currentTheme = resolvedTheme || theme;
  
  return (
    <header className="sticky top-0 z-20 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto w-full flex h-14 items-center justify-between px-6">
        <div className="mr-4 flex">
          <Link
            href="/"
            className="mr-6 flex items-center space-x-2 font-medium text-lg tracking-tighter"
          >
            <img
              src={mounted && currentTheme === 'dark' ? '/manv_logo.svg' : '/manv_logo_dark.svg'}
              alt="AI With Manv"
              className="h-8 w-auto object-contain"
            />
          </Link>
        </div>

        <div className="flex flex-1 w-full justify-end">
          <nav className="flex items-center space-x-6">
            <Link 
              href="/#home" 
              className="text-sm font-medium transition-colors hover:text-primary cursor-pointer"
            >
              Home
            </Link>
            <Link 
              href="/#blog" 
              className="text-sm font-medium transition-colors hover:text-primary cursor-pointer"
            >
              Blog
            </Link>
            <Link 
              href="/#about" 
              className="text-sm font-medium transition-colors hover:text-primary cursor-pointer"
            >
              About Me
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
