export interface QuickActionTileProps {
  icon?: React.ReactNode;
  label: string;
  tone?: "teal" | "amber" | "blue" | "pink" | "purple" | "orange" | "emerald";
  onClick?: () => void;
}
