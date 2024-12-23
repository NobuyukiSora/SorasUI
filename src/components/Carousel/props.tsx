import type { TextStyle } from 'react-native';

export interface PropsCarousel {
  data: { id: string; title?: string; image: string; onPress?: () => void }[];
  duration?: number;
  overflow?: 'hidden' | 'scroll' | 'visible';
  width?: number;
  height?: number;
  title?: string;

  customStyleDot?: TextStyle;
  customStyleTitle?: TextStyle;
  activeDotColor?: string;
  inactiveDotColor?: string;
}
