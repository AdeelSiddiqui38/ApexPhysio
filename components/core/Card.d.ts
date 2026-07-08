export interface CardProps {
  brand?: "remedypills" | "nbv";
  /** Adds hover shadow lift (NBV Vision/Approach cards) */
  hoverable?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
