"use client";
import { useLayoutEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollWords({ text, className = "" }) {
  const rootRef = useRef(null);
  const words = useMemo(() => text.split(" "), [text]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        root.querySelectorAll("[data-word]"),
        { opacity: 0.15 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: {
            trigger: root,
            start: "top 80%",
            end: "bottom 45%",
            scrub: true,
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <p ref={rootRef} className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} data-word>
          {word}{" "}
        </span>
      ))}
    </p>
  );
}