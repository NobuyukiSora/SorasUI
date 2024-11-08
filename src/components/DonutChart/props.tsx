export interface DonutProps {
  radius: number;
  strokeWidth: number;
  data: { number: number; color: string }[];
  padding?: number;
  showTotal?: boolean;
}
