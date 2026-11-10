const TONES = {
  neutral: "border-white/20 text-white/85",
  accent: "border-cyan-300/30 bg-cyan-300/10 text-cyan-200",
};

export default function Chip({ tone = "neutral", children }) {
  return (
    <span className={`inline-block rounded-full border px-3 py-1 text-xs ${TONES[tone]}`}>
      {children}
    </span>
  );
}