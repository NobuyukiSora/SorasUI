import { ReactNode } from 'react';
import type { TextStyle, TouchableOpacityProps } from 'react-native';
// import { CheckboxProps } from 'react-native-paper';

export interface PropsCheckBox extends TouchableOpacityProps {
  title: string;
  value: boolean;
  activeBoxStyles?: TextStyle;
  inactiveBoxStyles?: TextStyle;
  customBoxContainerStyles?: TextStyle;
  icon?: ReactNode;
  iconColor?: string;
}
