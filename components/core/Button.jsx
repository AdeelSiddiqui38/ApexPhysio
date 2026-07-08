import React from "react";

/**
 * Button — shared primitive across both products.
 * RemedyPills uses very round corners (rounded-2xl / full pill on auth CTAs)
 * and a solid teal primary; NBV uses more restrained radii and a navy/teal
 * pairing. Pass `brand="nbv"` to switch palettes; default is RemedyPills.
 */
const SIZE_STYLES = {
  sm: { minHeight: 32, padding: "0 12px", fontSize: 13 },
  default: { minHeight: 40, padding: "0 18px", fontSize: 14 },
  lg: { minHeight: 48, padding: "0 28px", fontSize: 16 },
};

function paletteFor(brand) {
  if (brand === "nbv") {
    return {
      primaryBg: "var(--nbv-hero-navy, hsl(var(--nbv-primary)))",
      primaryFg: "hsl(var(--nbv-primary-foreground))",
      accentBg: "var(--nbv-cta-teal)",
      secondaryBg: "hsl(var(--nbv-secondary))",
      secondaryFg: "hsl(var(--nbv-secondary-foreground))",
      radius: "var(--nbv-radius-md)",
    };
  }
  return {
    primaryBg: "hsl(var(--rp-primary))",
    primaryFg: "hsl(var(--rp-primary-foreground))",
    accentBg: "hsl(var(--rp-accent))",
    secondaryBg: "hsl(var(--rp-secondary))",
    secondaryFg: "hsl(var(--rp-secondary-foreground))",
    radius: "var(--rp-radius-md)",
  };
}

export function Button({
  variant = "primary",
  size = "default",
  brand = "remedypills",
  pill = false,
  className = "",
  style = {},
  children,
  ...props
}) {
  const p = paletteFor(brand);
  const sizeStyle = SIZE_STYLES[size] || SIZE_STYLES.default;

  const variants = {
    primary: { background: p.primaryBg, color: p.primaryFg, border: "1px solid transparent" },
    accent: { background: p.accentBg, color: "#fff", border: "1px solid transparent" },
    secondary: { background: p.secondaryBg, color: p.secondaryFg, border: "1px solid transparent" },
    outline: { background: "transparent", color: p.primaryBg, border: `1px solid ${p.primaryBg}` },
    ghost: { background: "transparent", color: p.primaryBg, border: "1px solid transparent" },
  };

  return (
    <button
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        fontFamily: "var(--font-sans)",
        fontWeight: 600,
        whiteSpace: "nowrap",
        cursor: "pointer",
        borderRadius: pill ? "var(--rp-radius-pill)" : p.radius,
        transition: "filter .15s ease, transform .05s ease",
        ...sizeStyle,
        ...variants[variant],
        ...style,
      }}
      onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.97)"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      {...props}
    >
      {children}
    </button>
  );
}
