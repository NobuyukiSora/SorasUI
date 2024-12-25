import type { TextStyle } from 'react-native';

export interface PropsTextInputSingleBox {
  onChange: (code: any) => void;
  type: 'string' | 'array';
  length: number;
  width?: number;
  height?: number;
  title?: string;
  customTextinputStyles?: TextStyle;
  customContainerStyles?: TextStyle;
}
