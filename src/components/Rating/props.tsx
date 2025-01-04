import type { TextStyle } from 'react-native';

export interface PropsRender {
  length?: number;
  width?: number;
  height?: number;
  title?: string;
  customTextinputStyles?: TextStyle;
  customContainerStyles?: TextStyle;
}
