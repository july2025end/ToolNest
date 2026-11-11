/**
 * Reserved, fixed-size space for a future ad unit, so adding AdSense later causes no layout shift.
 * Intentionally empty: no ad code is loaded.
 */
export function AdSlot({ variant }: { variant: "banner" | "sidebar" }) {
  const size =
    variant === "banner"
      ? "h-[100px] w-full max-w-[320px] sm:h-[90px] sm:max-w-[728px]"
      : "h-[600px] w-[300px]";
  return (
    <div
      aria-hidden="true"
      data-ad-slot={variant}
      className={`${size} mx-auto ${process.env.NODE_ENV === "development" ? "border border-dashed border-border" : ""}`}
    />
  );
}
