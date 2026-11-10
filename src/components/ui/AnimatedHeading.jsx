"use client";
import { useLayoutEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ACCENT = "bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text text-transparent";

export default function AnimatedHeading({
  as: Tag = "h2",
  id,
  text,
  accentLast = 0,
  onScroll = false,
  delay = 0,
  className = "",
}) {
  const rootRef = useRef(null);
  const words = useMemo(() => text.split(" "), [text]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(root, { autoAlpha: 1 });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(root, { autoAlpha: 1 });
      gsap.fromTo(
        root.querySelectorAll("[data-word]"),
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.06,
          delay: onScroll ? 0 : delay,
          scrollTrigger: onScroll
            ? { trigger: root, start: "top 88%", once: true }
            : undefined,
        }
      );
    });

    return () => mm.revert();
  }, [delay, onScroll]);

  return (
    <Tag ref={rootRef} id={id} aria-label={text} className={`invisible ${className}`}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden="true"
          className="inline-block overflow-hidden pb-[0.12em] align-bottom"
        >
          <span
            data-word
            className={`inline-block ${i >= words.length - accentLast ? ACCENT : ""}`}
          >
            {word}
          </span>
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  );
}