import type { TouchableOpacityProps } from 'react-native';

export interface PropsSnackBar extends TouchableOpacityProps {
  delay?: number;
  animatedHeight?: number;
  onUndo?: () => {};
  onClose?: () => {};
}