import React from "react";

/** Input — text field. RemedyPills rounds fully (rounded-2xl); NBV uses standard shadcn radius. */
export function Input({ brand = "remedypills", style = {}, ...props }) {
  return (
    <input
      style={{
        width: "100%",
        fontFamily: "var(--font-sans)",
        fontSize: 14,
        padding: "10px 14px",
        borderRadius: brand === "nbv" ? "var(--nbv-radius-md)" : "var(--rp-radius-md)",
        border: `1px solid ${brand === "nbv" ? "hsl(var(--nbv-input))" : "hsl(var(--rp-input))"}`,
        background: "#fff",
        color: brand === "nbv" ? "hsl(var(--nbv-foreground))" : "hsl(var(--rp-foreground))",
        outline: "none",
        boxSizing: "border-box",
        ...style,
      }}
      {...props}
    />
  );
}
