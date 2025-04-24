import { ReactNode } from 'react';
import { TextStyle } from 'react-native';

export interface ModalProps {
  children?: ReactNode;
  onPressClose?: () => void;
  isPopUp: boolean;
  type?: 'bottom' | 'center';
  title?: string;
  customStyleModal?: TextStyle;
  customStyleHeader?: TextStyle;
  customStyleTitle?: TextStyle;
  customModalContainer?: TextStyle;
}
