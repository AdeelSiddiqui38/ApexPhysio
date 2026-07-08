export interface InputProps {
  brand?: "remedypills" | "nbv";
  style?: React.CSSProperties;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
