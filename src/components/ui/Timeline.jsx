"use client";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Timeline({ items }) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        root.querySelector("[data-line]"),
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 70%",
            end: "bottom 60%",
            scrub: true,
          },
        }
      );

      root.querySelectorAll("[data-item]").forEach((item) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, x: -24 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 85%", once: true },
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={rootRef} className="relative max-w-2xl pl-8">
      <div aria-hidden="true" className="absolute left-0 top-0 h-full w-px bg-white/10" />
      <div
        data-line
        aria-hidden="true"
        className="absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-cyan-300 to-violet-400"
      />
      <ol>
        {items.map(({ id, title, detail }) => (
          <li key={id} data-item className="relative pb-12 last:pb-0">
            <span
              aria-hidden="true"
              className="absolute -left-8 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-300 ring-4 ring-[#05060a]"
            />
            <p className="text-xl font-semibold text-white">{title}</p>
            <p className="mt-2 text-slate-400">{detail}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}