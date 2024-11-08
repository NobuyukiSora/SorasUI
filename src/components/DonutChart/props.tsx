import { ViewProps } from 'react-native';

export interface DonutProps extends ViewProps {
  radius: number;
  strokeWidth: number;
  data: { number: number; color: string }[];
  padding?: number;
  showTotal?: boolean;
}
