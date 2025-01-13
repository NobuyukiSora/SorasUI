import type { TextStyle } from 'react-native';

export interface PropsTextInputSingleBox {
  onChange: (code: any) => void;
  type: 'string' | 'array';
  length: number;
  width?: number;
  height?: number;
  customTextinputStyles?: TextStyle;
  customContainerStyles?: TextStyle;
}
