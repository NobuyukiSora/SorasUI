import { ReactNode } from 'react';
import { TextStyle, TouchableOpacityProps } from 'react-native';
export interface PropsSwitch extends TouchableOpacityProps {
  value: boolean;
  onPress: () => void;
  disabled?: boolean;
  customTrackStyles?: TextStyle;
  customThumbStyles?: TextStyle;
  icon?: ReactNode;
}
