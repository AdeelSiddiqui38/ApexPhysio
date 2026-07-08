export interface BadgeProps {
  tone?: "neutral" | "active" | "processing" | "ready" | "completed" | "primary";
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
