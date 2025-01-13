import type { TextStyle, TouchableOpacityProps } from 'react-native';

export interface PropsButton extends TouchableOpacityProps {
  title?: string;
  customStyleButton?: TextStyle;
  customStyleTitle?: TextStyle;
  vibrate?: boolean;
  vibrateDuration?: number;
}
