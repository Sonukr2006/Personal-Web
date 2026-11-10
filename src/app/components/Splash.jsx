"use client";
import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Splash() {
  const [showOverlay, setShowOverlay] = useState(true);

  const overlayRef = useRef(null);
  const mainRef = useRef(null);
  const subRef = useRef(null);

  useLayoutEffect(() => {
    // Create a GSAP context to scope animations and ensure perfect cleanup
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

      // GSAP entirely handles the transforms now (removed from inline JSX styles)
      gsap.set(main, {
        top: "50%",
        left: "50%",
        xPercent: -50,
        yPercent: -50,
        scale: 3,
        position: "fixed",
        transformOrigin: "center center",
      });
      
      gsap.set(sub, {
        top: "50%",
        left: "50%",
        xPercent: -50,
        y: -50, // -50px, replacing your translateY(-60px) in inline style
        opacity: 1,
        position: "fixed",
        transformOrigin: "center center",
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
        .to(sub, { duration: 1.2, y: "+=120", opacity: 0 }, "<")
        .to(overlay, { duration: 0.8, autoAlpha: 0 }, "-=0.4");

      tl.eventCallback("onComplete", () => setShowOverlay(false));
    });

    // Revert completely tears down the timeline AND clears the gsap.set() styles
    return () => ctx.revert();
  }, []);

  if (!showOverlay) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white pointer-events-auto dark:bg-black"
      style={{ willChange: "opacity" }}
    >
      <div
        ref={mainRef}
        className="fixed text-2xl font-extrabold leading-none text-center text-black select-none tracking-[0.18em] dark:text-white sm:text-3xl"
        style={{ willChange: "transform" }} // Removed inline transforms
        aria-hidden
      >
        SoNUU
      </div>

      <div
        ref={subRef}
        className="fixed text-xl font-medium text-center select-none text-black/70 dark:text-white/70"
        style={{ willChange: "transform, opacity" }} // Removed inline transforms
        aria-hidden
      >
        SK💗
      </div>
    </div>
  );
}