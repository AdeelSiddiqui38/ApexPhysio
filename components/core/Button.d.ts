export interface ButtonProps {
  /** Visual style */
  variant?: "primary" | "accent" | "secondary" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
  /** Which product's palette to render */
  brand?: "remedypills" | "nbv";
  /** Fully rounded pill shape (used on RemedyPills auth CTA) */
  pill?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}
