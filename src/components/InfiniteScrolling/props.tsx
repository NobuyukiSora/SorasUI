import type { TextStyle, ViewProps } from 'react-native';

export interface PropsInfinitScrolling extends ViewProps {
  title?: string;
  customStyleButton?: TextStyle;
  customStyleTitle?: TextStyle;
  width: number;
}
