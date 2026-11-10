import Link from "next/link";
import MobileNav from "./MobileNav";
import NavLink from "./NavLink";
import { navLinks } from "./navLinks";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-black/30 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-2xl font-extrabold leading-none tracking-[0.15em] text-white sm:text-3xl"
          >
            SK💗
          </Link>
        </div>
        <Link
          href="/"
          id="site-title"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-2xl font-extrabold leading-none tracking-[0.18em] text-white sm:text-3xl"
        >
          SoNUU
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.label} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <MobileNav links={navLinks} />
      </div>
    </header>
  );
}