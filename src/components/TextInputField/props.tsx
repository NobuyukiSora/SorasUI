import type { TextInputProps, TextStyle } from 'react-native';

export interface PropsTextInput extends TextInputProps {
  title: string;
  value?: string;
  onTextChange: (text: string) => void;
  placeHolder?: string;
  height?: number;
  align?: 'right' | 'left' | 'center';
  customTextinputStyles?: TextStyle;
  customContainerStyles?: TextStyle;
  customTitleSyle?: TextStyle;
  editable?: boolean;
  secureTextEntry?: boolean;
}
