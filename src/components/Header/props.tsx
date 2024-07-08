import type { TextStyle, TouchableOpacityProps } from 'react-native';

export interface PropsHeader extends TouchableOpacityProps {
  title?: string;
  customStyleButton?: TextStyle;
  customStyleTitle?: TextStyle;
}
