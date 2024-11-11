import { SkFont } from '@shopify/react-native-skia';
import { SharedValue } from 'react-native-reanimated';

export interface PropsDonutChart {
  gap?: number;
  radius?: number;
  strokeWidth?: number;
  outerStrokeWidth?: number;
  decimals?: SharedValue<number[]>;
  totalValue?: SharedValue<number>;
  font?: SkFont;
  data: { color: string; percentage: number; value: number }[];
  displayTotalValue?: boolean;
  outerStrokColor?: string;
  totalValueSymbol?: string;
  totalValueColor?: string;
}

export interface PropsDonutPath {
  strokeWidth: number;
  outerStrokeWidth: number;
  gap: number;
  radius: number;
  color: string;
  decimals: SharedValue<number[]>;
  index: number;
}
