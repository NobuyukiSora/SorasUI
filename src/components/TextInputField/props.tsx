import type { TextInputProps } from 'react-native';

export interface PropsTextInput extends TextInputProps {
  title: string;
  value?: string;
  onTextChange: (text: string) => void;
  placeHolder?: string;
  customStyles?: {
    height: number;
    backgroundColor: string;
    activeOutlineColor: string;
    inactiveOutlineColor: string;
    textColor: string;
    textAlign: 'left' | 'center' | 'right' | undefined;
    placeholderTextColor: string;
  };
  editable?: boolean;
  secureTextEntry?: boolean;
}
