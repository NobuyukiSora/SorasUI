import { ReactNode } from 'react';
import type { TextStyle, TouchableOpacityProps } from 'react-native';

export interface PropsExpandibleView extends TouchableOpacityProps {
  title: string;
  renderItem: ReactNode;
  customHeader?: ReactNode;
  customIcon?: ReactNode;
  customContainerStyle?: TextStyle;
  customHeaderStyle?: TextStyle;
  customItemContainerStyle?: TextStyle;
}
