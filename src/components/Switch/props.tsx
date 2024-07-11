import { TextStyle, TouchableOpacityProps } from 'react-native';
export interface PropsSwitch extends TouchableOpacityProps {
  value: boolean;
  onPress: () => void;
  disabled?: boolean;
  trackStyle?: TextStyle;
  thumbStyle?: TextStyle;
}
