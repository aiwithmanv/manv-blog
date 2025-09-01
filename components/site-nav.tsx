'use client';

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-20 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto w-full flex h-14 items-center justify-between px-6">
        <div className="mr-4 flex">
          <Link
            href="/"
            className="mr-6 flex items-center space-x-2 font-medium text-lg tracking-tighter"
          >
            <img
              src="/manv_logo.svg"
              alt="AI With Manv"
              className="h-8 w-auto object-contain"
            />
          </Link>
        </div>

        <div className="flex flex-1 w-full justify-end">
          <nav className="flex items-center space-x-6">
            <a 
              href="#home" 
              className="text-sm font-medium transition-colors hover:text-primary cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Home
            </a>
            <a 
              href="#blog" 
              className="text-sm font-medium transition-colors hover:text-primary cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Blog
            </a>
            <a 
              href="#about" 
              className="text-sm font-medium transition-colors hover:text-primary cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              About Me
            </a>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
