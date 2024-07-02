import type { TextInputProps } from 'react-native';

export interface PropsTextInput extends TextInputProps {
  title: string;
  value?: string;
  onTextChange: (text: string) => void;
  placeHolder?: string;
}
