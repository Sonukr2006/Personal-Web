"use client";
import { useEffect, useState } from "react";
import useInView from "@/app/hooks/useInView";

const DURATION_MS = 1400;
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

export default function CountUp({ to, decimals = 0, suffix = "" }) {
  const [ref, inView] = useInView({ threshold: 0.6 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = requestAnimationFrame(() => setValue(to));
      return () => cancelAnimationFrame(frame);
    }

    const start = performance.now();
    let frame;

    const tick = (now) => {
      const progress = Math.min((now - start) / DURATION_MS, 1);
      setValue(to * easeOutCubic(progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}