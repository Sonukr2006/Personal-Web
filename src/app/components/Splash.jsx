"use client";
import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Splash() {
  const [showOverlay, setShowOverlay] = useState(true);

  const overlayRef = useRef(null);
  const mainRef = useRef(null);
  const subRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const main = mainRef.current;
      const sub = subRef.current;
      const overlay = overlayRef.current;

      if (!main || !sub || !overlay) return;

      const headerTitle = document.getElementById("site-title");
      const rect = headerTitle
        ? headerTitle.getBoundingClientRect()
        : { top: 32, left: window.innerWidth / 2, width: 0, height: 0 };

      const targetTop = rect.top + rect.height / 2;
      const targetLeft = rect.left + rect.width / 2;

      gsap.set(main, {
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        scale: 3,
        position: "fixed",
        transformOrigin: "center center",
        autoAlpha: 1,
      });

      gsap.set(sub, {
        top: "50%",
        left: "50%",
        xPercent: -50,
        y: -100,
        position: "fixed",
        transformOrigin: "center center",
        autoAlpha: 1,
      });

      gsap.set(overlay, { autoAlpha: 1 });

      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

      tl.delay(1)
        .to(main, {
          duration: 1.2,
          top: targetTop,
          left: targetLeft,
          xPercent: -50,
          yPercent: -50,
          scale: 1,
        })
        .to(sub, { duration: 1.2, y: "+=120", autoAlpha: 0 }, "<")
        .to(overlay, { duration: 0.8, autoAlpha: 0 }, "-=0.4");

      tl.eventCallback("onComplete", () => setShowOverlay(false));
    });

    return () => ctx.revert();
  }, []);

  if (!showOverlay) return null;

  return (
    <div
      ref={overlayRef}
      className="pointer-events-auto fixed inset-0 z-50 flex items-center justify-center bg-[#05060a]"
      style={{ willChange: "opacity" }}
    >
      <div
        ref={mainRef}
        className="invisible fixed select-none text-center text-2xl font-extrabold leading-none tracking-[0.18em] text-white sm:text-3xl"
        style={{ willChange: "transform" }}
        aria-hidden
      >
        SoNUU
      </div>

      <div
        ref={subRef}
        className="invisible fixed select-none text-center text-xl font-medium text-white/70"
        style={{ willChange: "transform, opacity" }}
        aria-hidden
      >
        SK💗
      </div>
    </div>
  );
}