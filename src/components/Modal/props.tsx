import { ReactNode } from 'react';
import type { TextStyle, TouchableOpacityProps } from 'react-native';

export interface propsModal extends TouchableOpacityProps {
  type: 'bottom' | 'center';
  isPopUp: boolean;
  onPressClose: (text: boolean) => void;
  title?: string;
  customStyleModal?: TextStyle;
  customHeader?: ReactNode;
  customModalContainer?: TextStyle;
}
