import { ReactNode } from 'react';
import type { TextStyle, TouchableOpacityProps } from 'react-native';

export interface PropsRadioButton extends TouchableOpacityProps {
  data: Array<{ id: string; title: string; value: string }>;
  onPress: (data: any) => void;
  selectedId: any;
  activeCircleStyles?: TextStyle;
  inactiveCircleStyles?: TextStyle;
  circleContainerStyles?: TextStyle;
  iconColor?: string;
  direction?: 'column' | 'row';
  width?: number;
  directionMode?: {
    direction: 'column' | 'row' | string;
    width?: number;
  };
  icon?: ReactNode;
  vibrate?: boolean;
  vibrateDuration?: number;
}
