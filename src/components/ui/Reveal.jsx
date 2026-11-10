"use client";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Reveal({ delay = 0, stagger = 0.12, className, children }) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const items = rootRef.current?.querySelectorAll("[data-reveal]");
    if (!items?.length) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(items, { autoAlpha: 1 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 32 },
        { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", stagger, delay }
      );
    });

    return () => mm.revert();
  }, [delay, stagger]);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}