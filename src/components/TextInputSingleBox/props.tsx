import type {
  NativeSyntheticEvent,
  TextInput,
  TextInputKeyPressEventData,
  TextStyle,
} from 'react-native';

export interface PropsTextInputSingleBox {
  onChange: (code: any) => void;
  type: 'string' | 'array';
  length: number;
  width?: number;
  height?: number;
  customTextinputStyles?: TextStyle;
  customContainerStyles?: TextStyle;
}

export interface PropsSingleCodeBox {
  value: string;
  index: number;
  onTextChange: (text: string, index: number) => void;
  onKeyPress: (
    input: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => void;
  inputRef: React.MutableRefObject<TextInput[]>;
  width: number;
  height: number;
  customTextinputStyles?: object;
  customContainerStyles?: object;
}
