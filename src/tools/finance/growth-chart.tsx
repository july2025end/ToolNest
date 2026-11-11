/** Stacked bars per year: amount paid in vs. growth. Plain SVG, no chart library. */
export function GrowthChart({
  points,
  compact,
  labels = ["Paid in", "Growth"],
}: {
  points: { year: number; contributed: number; balance: number }[];
  compact: (n: number) => string;
  labels?: [string, string];
}) {
  if (!points.length) return null;
  const W = 480;
  const H = 240;
  const pad = { l: 64, r: 8, t: 12, b: 28 };
  const max = Math.max(...points.map((p) => p.balance), 1);
  const iw = W - pad.l - pad.r;
  const ih = H - pad.t - pad.b;
  const bw = iw / points.length;
  const y = (v: number) => pad.t + ih - (v / max) * ih;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((k) => k * max);
  const every = Math.ceil(points.length / 6);
  const last = points[points.length - 1];

  return (
    <figure>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`Balance grows to ${compact(last.balance)} after ${last.year} years, of which ${compact(last.contributed)} is money paid in.`}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke="var(--border)" />
            <text x={pad.l - 8} y={y(t)} dy="0.32em" textAnchor="end" fontSize="15" fill="var(--muted)">
              {compact(t)}
            </text>
          </g>
        ))}
        {points.map((p, i) => {
          const x = pad.l + i * bw + bw * 0.15;
          const w = bw * 0.7;
          return (
            <g key={p.year}>
              <rect x={x} y={y(p.contributed)} width={w} height={Math.max(0, y(0) - y(p.contributed))} fill="var(--muted)" />
              <rect x={x} y={y(p.balance)} width={w} height={Math.max(0, y(p.contributed) - y(p.balance))} fill="var(--accent)" />
              {(i % every === 0 || i === points.length - 1) && (
                <text x={x + w / 2} y={H - 8} textAnchor="middle" fontSize="15" fill="var(--muted)">
                  {p.year}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <figcaption className="mt-2 flex flex-wrap gap-x-5 text-sm text-muted">
        <span><span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full bg-muted" />{labels[0]}</span>
        <span><span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full bg-accent" />{labels[1]}</span>
        <span>Horizontal axis: years</span>
      </figcaption>
    </figure>
  );
}
