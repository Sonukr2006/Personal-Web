import { useCallback, useEffect, useRef, useState } from "react";

export const DOG_SIZE = Object.freeze({ width: 128, height: 96 });

export const MODES = Object.freeze({
  walking: "walking",
  dragging: "dragging",
  returning: "returning",
});

const MOTION = Object.freeze({
  startX: 40,
  walkSpeed: 70, // px per second
  returnRate: 7, // higher = snappier run back
  arriveDistance: 1.5, // px
  turnThreshold: 4, // px, avoids flip-flopping when almost home
  maxFrameSeconds: 0.05, // clamps big gaps, e.g. after a tab switch
});

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export default function useDogMotion() {
  const rootRef = useRef(null);
  const flipRef = useRef(null);
  const [mode, setModeState] = useState(MODES.walking);

  // x: left edge in px. y: height above the floor in px. dir: 1 faces right.
  const motion = useRef({
    mode: MODES.walking,
    x: MOTION.startX,
    y: 0,
    dir: 1,
    originX: MOTION.startX,
    grabDx: 0,
    grabDy: 0,
  });

  const setMode = useCallback((next) => {
    motion.current.mode = next;
    setModeState(next);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const flip = flipRef.current;
    if (!root || !flip) return;

    const m = motion.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const render = () => {
      root.style.transform = `translate3d(${m.x}px, ${-m.y}px, 0)`;
      flip.style.transform = `scaleX(${m.dir})`;
    };

    const step = (dt) => {
      const maxX = window.innerWidth - DOG_SIZE.width;

      if (m.mode === MODES.walking) {
        if (reduceMotion.matches) return;
        m.x += m.dir * MOTION.walkSpeed * dt;
        if (m.x <= 0) {
          m.x = 0;
          m.dir = 1;
        } else if (m.x >= maxX) {
          m.x = maxX;
          m.dir = -1;
        }
        return;
      }

      if (m.mode === MODES.returning) {
        const targetX = Math.min(m.originX, maxX);
        const dx = targetX - m.x;
        const ease = 1 - Math.exp(-MOTION.returnRate * dt);

        if (Math.abs(dx) > MOTION.turnThreshold) m.dir = Math.sign(dx);
        m.x += dx * ease;
        m.y -= m.y * ease;

        if (Math.abs(dx) < MOTION.arriveDistance && m.y < MOTION.arriveDistance) {
          m.x = targetX;
          m.y = 0;
          setMode(MODES.walking);
        }
      }
      // dragging: position is driven by pointer events
    };

    let frame;
    let last = performance.now();

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, MOTION.maxFrameSeconds);
      last = now;
      step(dt);
      render();
      frame = requestAnimationFrame(tick);
    };

    render();
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [setMode]);

  const onPointerDown = useCallback(
    (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;

      const m = motion.current;
      event.currentTarget.setPointerCapture(event.pointerId);

      // Remember where the dog was grabbed. If it is grabbed again while
      // running home, it keeps the original spot.
      if (m.mode === MODES.walking) m.originX = m.x;

      const top = window.innerHeight - DOG_SIZE.height - m.y;
      m.grabDx = event.clientX - m.x;
      m.grabDy = event.clientY - top;
      setMode(MODES.dragging);
    },
    [setMode]
  );

  const onPointerMove = useCallback((event) => {
    const m = motion.current;
    if (m.mode !== MODES.dragging) return;

    const maxX = window.innerWidth - DOG_SIZE.width;
    const maxTop = window.innerHeight - DOG_SIZE.height;
    const top = clamp(event.clientY - m.grabDy, 0, maxTop);

    m.x = clamp(event.clientX - m.grabDx, 0, maxX);
    m.y = maxTop - top;
  }, []);

  const release = useCallback(
    (event) => {
      if (motion.current.mode !== MODES.dragging) return;
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      setMode(MODES.returning);
    },
    [setMode]
  );

  return {
    rootRef,
    flipRef,
    mode,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: release,
      onPointerCancel: release,
    },
  };
}