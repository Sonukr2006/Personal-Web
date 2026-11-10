"use client";
import Card from "./Card";

const SPOTLIGHT =
  "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(34, 211, 238, 0.15), transparent 65%)";

export default function SpotlightCard({ className = "", children, ...props }) {
  const handlePointerMove = (event) => {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <Card
      onPointerMove={handlePointerMove}
      className={`group relative overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 ${className}`}
      {...props}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: SPOTLIGHT }}
      />
      <div className="relative">{children}</div>
    </Card>
  );
}