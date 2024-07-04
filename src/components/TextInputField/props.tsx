import type { TextInputProps, TextStyle } from 'react-native';

export interface PropsTextInput extends TextInputProps {
  title: string;
  value?: string;
  onTextChange: (text: string) => void;
  placeHolder?: string;
  customStyle?: TextStyle;
  editable?: boolean;
  textAlign?: 'left' | 'center' | 'right' | undefined;
  textColor?: string;
  activeOutlineColor?: string;
  inactiveOutlineColor?: string;
  placeholderTextColor?: string;
  backgroundColor?: string;
}
