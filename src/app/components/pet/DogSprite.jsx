import styles from "./Dog.module.css";

const COLORS = Object.freeze({
  fur: "#6c7581",
  furDark: "#565e69",
  furDeep: "#454c56",
  white: "#fbf8f2",
  whiteFar: "#e2ddd2",
  tan: "#c99a68",
  ink: "#2b1b12",
  blush: "#ff9aa8",
  collar: "#e5484d",
  tag: "#ffd23f",
});

// [cx, cy, r] circles that give the silhouette its shaggy edge
const HEAD_TUFTS = [
  [56, 28, 8],
  [62, 17, 8],
  [74, 11, 8],
  [87, 10, 7],
  [99, 15, 8],
  [104, 25, 7],
];
const BEARD_TUFTS = [
  [84, 56, 7],
  [91, 62, 6],
  [99, 64, 6],
  [107, 60, 5.5],
  [110, 52, 6],
];
const BODY_SKIRT = [
  [22, 72, 6],
  [31, 76, 6],
  [40, 77, 6],
  [49, 76, 6],
  [58, 73, 6],
];
const RUFF_TUFTS = [
  [56, 74, 5],
  [64, 76, 5],
  [71, 72, 4.5],
];
// [cx, cy, rx, ry, rotation] hair hanging over the eyes
const FRINGE = [
  [68, 25, 5, 8, 14],
  [76, 24, 5, 8, 6],
  [97, 23, 5, 8, -8],
  [104, 26, 4.5, 7, -18],
];

function Circles({ items, fill }) {
  return items.map(([cx, cy, r]) => (
    <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={fill} />
  ));
}

function Leg({ x, fur, paw, phase }) {
  return (
    <g className={`${styles.leg} ${styles[phase]}`}>
      <rect x={x} y="68" width="11" height="16" rx="5.5" fill={fur} />
      <ellipse cx={x + 5.5} cy="83" rx="7.5" ry="5" fill={paw} />
    </g>
  );
}

function Eye({ cx, cy, r }) {
  return (
    <g className={styles.eye}>
      <circle cx={cx} cy={cy} r={r} fill={COLORS.ink} />
      <circle cx={cx + r * 0.4} cy={cy - r * 0.4} r={r * 0.38} fill="#fff" />
      <circle cx={cx - r * 0.4} cy={cy + r * 0.45} r={r * 0.17} fill="#fff" />
    </g>
  );
}

export default function DogSprite() {
  return (
    <svg
      className={styles.sprite}
      viewBox="0 0 120 90"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
    >
      {/* far-side legs */}
      <Leg x={33} fur={COLORS.furDark} paw={COLORS.whiteFar} phase="legB" />
      <Leg x={59} fur={COLORS.furDark} paw={COLORS.whiteFar} phase="legA" />

      <g className={styles.body}>
        {/* bushy tail with a white tip */}
        <g className={styles.tail}>
          <path
            d="M20 58 C6 58 3 42 12 34"
            fill="none"
            stroke={COLORS.fur}
            strokeWidth="11"
            strokeLinecap="round"
          />
          <circle cx="12" cy="33" r="6.5" fill={COLORS.white} />
        </g>

        {/* shaggy body, white chest ruff */}
        <ellipse cx="42" cy="60" rx="26" ry="17" fill={COLORS.fur} />
        <Circles items={BODY_SKIRT} fill={COLORS.fur} />
        <ellipse cx="62" cy="63" rx="11" ry="11" fill={COLORS.white} />
        <Circles items={RUFF_TUFTS} fill={COLORS.white} />

        {/* collar + heart tag */}
        <path
          d="M57 60 Q66 68 75 62"
          fill="none"
          stroke={COLORS.collar}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M67 75 c-4 -3 -5 -6 -2.5 -7.5 c1.2 -0.6 2.2 0 2.5 0.9 c0.3 -0.9 1.3 -1.5 2.5 -0.9 c2.5 1.5 1.5 4.5 -2.5 7.5z"
          fill={COLORS.tag}
        />

        {/* far ear */}
        <ellipse
          className={styles.ear}
          cx="97"
          cy="24"
          rx="8"
          ry="13"
          transform="rotate(-20 97 24)"
          fill={COLORS.furDeep}
        />

        {/* head: fluffy outline, white blaze, beard */}
        <Circles items={HEAD_TUFTS} fill={COLORS.fur} />
        <circle cx="78" cy="38" r="26" fill={COLORS.fur} />
        <path
          d="M86 13 C83 22 84 30 87 40 L92 40 C94 30 93 22 90 13 Z"
          fill={COLORS.white}
        />
        <ellipse cx="98" cy="52" rx="15" ry="12" fill={COLORS.white} />
        <Circles items={BEARD_TUFTS} fill={COLORS.white} />

        {/* near ear */}
        <ellipse
          className={styles.ear}
          cx="56"
          cy="44"
          rx="9.5"
          ry="18"
          transform="rotate(10 56 44)"
          fill={COLORS.furDeep}
        />

        {/* nose, mouth, tongue */}
        <ellipse cx="108" cy="45" rx="4.8" ry="3.6" fill={COLORS.ink} />
        <ellipse cx="109.5" cy="43.6" rx="1.5" ry="1" fill="#fff" opacity="0.8" />
        <path
          d="M108 49 L108 53 M99 54 Q103 59 108 54"
          fill="none"
          stroke={COLORS.ink}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className={styles.tongue}
          d="M102 56.5 q1 7 5.5 4 q1 -3 -1 -5z"
          fill="#f0838f"
        />

        {/* face details */}
        <ellipse cx="90" cy="50" rx="4.5" ry="2.8" fill={COLORS.blush} opacity="0.55" />
        <ellipse cx="80" cy="29" rx="3.5" ry="2" fill={COLORS.tan} />
        <ellipse cx="96" cy="29" rx="3.2" ry="1.9" fill={COLORS.tan} />
        <Eye cx={80} cy={37} r={6.2} />
        <Eye cx={96} cy={36} r={5} />

        {/* fringe falling over the eyes */}
        {FRINGE.map(([cx, cy, rx, ry, rot]) => (
          <ellipse
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            rx={rx}
            ry={ry}
            transform={`rotate(${rot} ${cx} ${cy})`}
            fill={COLORS.furDark}
          />
        ))}
      </g>

      {/* near-side legs with fluffy white paws */}
      <Leg x={24} fur={COLORS.fur} paw={COLORS.white} phase="legA" />
      <Leg x={50} fur={COLORS.fur} paw={COLORS.white} phase="legB" />
    </svg>
  );
}