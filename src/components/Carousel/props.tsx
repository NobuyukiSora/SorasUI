import type { TextStyle } from 'react-native';

export interface PropsCarousel {
  data: { id: string; title?: string; image: string; onPress?: () => void }[];
  duration?: number;
  overflow?: 'hidden' | 'scroll' | 'visible';
  title?: string;
  customStyleButton?: TextStyle;
  customStyleTitle?: TextStyle;
}
