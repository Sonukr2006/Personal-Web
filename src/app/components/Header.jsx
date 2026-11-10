"use client";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            id="site-logo"
            className="text-2xl font-extrabold leading-none tracking-[0.15em] text-black dark:text-white sm:text-3xl"
          >
            SK
          </Link>
        </div>
        <Link
          href="/"
          id="site-title"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-2xl font-extrabold leading-none tracking-[0.18em] text-black dark:text-white sm:text-3xl"
        >
          SoNUU
        </Link>
        <nav className="hidden md:flex gap-6 items-center pointer-events-auto">
          <Link href="#" className="text-sm opacity-80">Projects</Link>
          <Link href="#" className="text-sm opacity-80">About</Link>
          <Link href="#" className="text-sm opacity-80">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
