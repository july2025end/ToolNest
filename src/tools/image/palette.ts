// Colour helpers for the colour picker. Checked by palette.test.ts.

export type RGB = [number, number, number];

export const hex = ([r, g, b]: RGB) => "#" + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");

export function hsl([r, g, b]: RGB) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h *= 60;
  }
  return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

/** Relative luminance, used to choose readable text on a swatch. */
export const isLight = ([r, g, b]: RGB) => 0.2126 * r + 0.7152 * g + 0.0722 * b > 150;

/**
 * Dominant colours by k-means on the pixels (RGBA array), most common first.
 * Deterministic: seeds are spread across the colour-sorted pixels.
 */
export function palette(data: Uint8ClampedArray, k = 8): { rgb: RGB; share: number }[] {
  const px: RGB[] = [];
  for (let i = 0; i < data.length; i += 4) if (data[i + 3] > 128) px.push([data[i], data[i + 1], data[i + 2]]);
  if (!px.length) return [];
  const sorted = [...px].sort((a, b) => a[0] + a[1] + a[2] - (b[0] + b[1] + b[2]));
  let centers: RGB[] = Array.from({ length: Math.min(k, px.length) }, (_, i) => [...sorted[Math.floor(((i + 0.5) / k) * sorted.length)]] as RGB);
  const assign = new Int32Array(px.length);
  for (let iter = 0; iter < 12; iter++) {
    const sum = centers.map(() => [0, 0, 0, 0]);
    px.forEach((p, i) => {
      let best = 0;
      let bd = Infinity;
      centers.forEach((c, j) => {
        const d = (p[0] - c[0]) ** 2 + (p[1] - c[1]) ** 2 + (p[2] - c[2]) ** 2;
        if (d < bd) {
          bd = d;
          best = j;
        }
      });
      assign[i] = best;
      const s = sum[best];
      s[0] += p[0];
      s[1] += p[1];
      s[2] += p[2];
      s[3]++;
    });
    centers = sum.map((s, j) => (s[3] ? [s[0] / s[3], s[1] / s[3], s[2] / s[3]] : centers[j]) as RGB);
  }
  const counts = centers.map((_, j) => assign.filter((a) => a === j).length);
  // Merge near-duplicate colours so the palette shows distinct swatches.
  const out: { rgb: RGB; n: number }[] = [];
  centers
    .map((c, j) => ({ rgb: c, n: counts[j] }))
    .filter((c) => c.n > 0)
    .sort((a, b) => b.n - a.n)
    .forEach((c) => {
      const near = out.find((o) => (o.rgb[0] - c.rgb[0]) ** 2 + (o.rgb[1] - c.rgb[1]) ** 2 + (o.rgb[2] - c.rgb[2]) ** 2 < 24 ** 2);
      if (near) near.n += c.n;
      else out.push({ ...c });
    });
  return out.map((o) => ({ rgb: o.rgb.map(Math.round) as RGB, share: o.n / px.length }));
}
