import { ReactNode } from 'react';
import type { TextStyle } from 'react-native';

export interface PropsRender {
  length?: number;
  width?: number;
  height?: number;
  value?: number;
  onChange?: (value: number) => void;
  title?: string;
  starColor?: string;
  customIconActive?: ReactNode;
  customIconInactive?: ReactNode;
  justifyContent?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  customContainerStyles?: TextStyle;
  disable?: boolean;
}
