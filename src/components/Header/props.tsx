import { ReactNode } from 'react';
import type { TextStyle, TouchableOpacityProps } from 'react-native';

export interface PropsHeader extends TouchableOpacityProps {
  title?: string;
  customButtonStyles?: TextStyle;
  customTitleStyles?: TextStyle;
  iconColor?: string;
  icon?: ReactNode;
}
