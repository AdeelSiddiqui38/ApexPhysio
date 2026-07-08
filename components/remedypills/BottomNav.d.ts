export interface BottomNavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}
export interface BottomNavProps {
  items: BottomNavItem[];
  active: string;
  onChange?: (id: string) => void;
}
