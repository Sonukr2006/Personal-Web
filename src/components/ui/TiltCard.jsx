"use client";
import { useRef } from "react";
import Card from "./Card";

const MAX_TILT_DEG = 7;
const MOTION_QUERY = "(hover: hover) and (prefers-reduced-motion: no-preference)";
const GLARE =
  "radial-gradient(420px circle at var(--gx, 50%) var(--gy, 50%), rgba(255, 255, 255, 0.1), transparent 60%)";

export default function TiltCard({ as, className = "", children }) {
  const tiltRef = useRef(null);

  const handleMove = (event) => {
    if (!window.matchMedia(MOTION_QUERY).matches) return;

    const el = tiltRef.current;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    el.style.setProperty("--rx", `${(0.5 - py) * 2 * MAX_TILT_DEG}deg`);
    el.style.setProperty("--ry", `${(px - 0.5) * 2 * MAX_TILT_DEG}deg`);
    el.style.setProperty("--gx", `${px * 100}%`);
    el.style.setProperty("--gy", `${py * 100}%`);
  };

  const handleLeave = () => {
    const el = tiltRef.current;
    el.style.removeProperty("--rx");
    el.style.removeProperty("--ry");
  };

  return (
    <div
      ref={tiltRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className="h-full transition-transform duration-200 ease-out will-change-transform"
      style={{
        transform: "perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
      }}
    >
      <Card
        as={as}
        className={`group relative h-full overflow-hidden transition-colors duration-300 hover:border-cyan-300/40 ${className}`}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: GLARE }}
        />
        {children}
      </Card>
    </div>
  );
}