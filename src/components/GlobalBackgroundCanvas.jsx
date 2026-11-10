"use client";
import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MathUtils } from "three";

const seededRandom = (seed) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
};

// Window-level input, because the canvas wrapper is pointer-events-none
// and would never receive mouse events itself.
function useInput() {
  const input = useRef({ x: 0, y: 0, scroll: 0 });

  useEffect(() => {
    const onMove = (e) => {
      input.current.x = (e.clientX / window.innerWidth) * 2 - 1; // -1..1
      input.current.y = (e.clientY / window.innerHeight) * 2 - 1; // -1..1
    };
    const onScroll = () => {
      input.current.scroll = window.scrollY / window.innerHeight; // in screens
    };
    onScroll();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return input;
}

function Shape({ input }) {
  const viewport = useThree((state) => state.viewport);
  const group = useRef(null); // parallax + scroll
  const mesh = useRef(null); // constant spin

  useFrame((_, dt) => {
    if (!group.current || !mesh.current) return;
    const { x, y, scroll } = input.current;

    // constant spin
    mesh.current.rotation.y += dt * 0.15;
    mesh.current.rotation.x += dt * 0.05;

    // mouse parallax: tilt toward the cursor (smoothed)
    group.current.rotation.y = MathUtils.damp(group.current.rotation.y, x * 0.5, 4, dt);
    group.current.rotation.x = MathUtils.damp(group.current.rotation.x, y * 0.35, 4, dt);

    // scroll-linked: shape drifts up, grows, and twists as you scroll
    const s = Math.min(scroll, 4);
    group.current.position.y = MathUtils.damp(group.current.position.y, s * 0.8, 4, dt);
    group.current.scale.setScalar(MathUtils.damp(group.current.scale.x, 1 + s * 0.25, 4, dt));
    group.current.rotation.z = MathUtils.damp(group.current.rotation.z, s * 0.6, 4, dt);

    // desktop: sit on the right of the hero, ease to center while scrolling
    const restX = viewport.aspect > 1.2 ? viewport.width * 0.22 : 0;
    const targetX = restX * (1 - Math.min(scroll, 1));
    group.current.position.x = MathUtils.damp(group.current.position.x, targetX, 4, dt);
  });

  return (
    <group ref={group}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshStandardMaterial color="#22d3ee" wireframe />
      </mesh>
    </group>
  );
}

function Particles({ input, count = 600 }) {
  const group = useRef(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (seededRandom(i * 3) - 0.5) * 18;
      arr[i * 3 + 1] = (seededRandom(i * 3 + 1) - 0.5) * 12;
      arr[i * 3 + 2] = (seededRandom(i * 3 + 2) - 0.5) * 10 - 1;
    }
    return arr;
  }, [count]);

  useFrame((_, dt) => {
    if (!group.current) return;
    const { x, y, scroll } = input.current;

    // slow drift
    group.current.rotation.y += dt * 0.02;

    // gentle opposite-direction parallax for depth
    group.current.position.x = MathUtils.damp(group.current.position.x, -x * 0.4, 3, dt);
    group.current.position.y = MathUtils.damp(
      group.current.position.y,
      y * 0.3 + Math.min(scroll, 4) * 0.4,
      3,
      dt
    );
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          color="#67e8f9"
          sizeAttenuation
          transparent
          opacity={0.75}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default function GlobalBackgroundCanvas() {
  const input = useInput();

  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]}>
        <color attach="background" args={["#05060a"]} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 3]} intensity={1.2} />
        <Particles input={input} />
        <Shape input={input} />
      </Canvas>
    </div>
  );
}