import type { TextProps, TextStyle } from 'react-native';

export interface PropsTypograph extends TextProps {
  type?: 'primary' | 'secondary';
  customStyle?: TextStyle;
}
