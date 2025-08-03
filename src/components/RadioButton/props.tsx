import { ReactNode } from 'react';
import type { TextStyle, TouchableOpacityProps } from 'react-native';

export interface PropsRadioButton extends TouchableOpacityProps {
  data: Array<{ id: string; title: string; value: string }>;
  onPress: (data: any) => void;
  selectedId: any;
  frontDotStyle?: TextStyle;
  backDotStyle?: TextStyle;
  circleContainerStyles?: TextStyle;
  iconColor?: string;
  width?: number;
  directionMode?: {
    direction: 'column' | 'row' | string;
    width?: number;
  };
  icon?: ReactNode;
  vibrate?: boolean;
  vibrateDuration?: number;
}

export interface PropsRadioButtonItem {
  item: { id: string; title: string; value: string };
  selectedId: string | undefined;
  onItemPress: (item: { id: string; title: string; value: string }) => void;
  icon?: React.ReactNode;
  styles: any;
  frontDotStyle?: object;
  backDotStyle?: object;
  circleContainerStyles?: object;
}
