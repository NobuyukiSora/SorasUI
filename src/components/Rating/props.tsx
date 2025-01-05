import type { TextStyle } from 'react-native';

export interface PropsRender {
  length?: number;
  width?: number;
  height?: number;
  value?: number;
  onChange?: (value: number) => void;
  title?: string;
  customTextinputStyles?: TextStyle;
  customContainerStyles?: TextStyle;
}
