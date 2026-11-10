const COPIES = 4; // shifting by half the track is seamless for any even count
const EDGE_MASK = "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)";

export default function Marquee({ items, reverse = false, duration = 40, className = "" }) {
  const loop = Array.from({ length: COPIES }, () => items).flat();

  return (
    <div
      className={`marquee overflow-hidden ${className}`}
      style={{ maskImage: EDGE_MASK, WebkitMaskImage: EDGE_MASK }}
    >
      <ul
        data-reverse={reverse}
        style={{ "--marquee-duration": `${duration}s` }}
        className="marquee-track flex w-max"
      >
        {loop.map((item, i) => (
          <li
            key={`${item}-${i}`}
            aria-hidden={i >= items.length || undefined}
            className="pr-4"
          >
            <span className="block whitespace-nowrap rounded-full border border-white/15 bg-white/5 px-6 py-2.5 text-sm text-white/90 backdrop-blur">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}