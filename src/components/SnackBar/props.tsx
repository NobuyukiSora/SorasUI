import type { TouchableOpacityProps } from 'react-native';

export interface PropsSnackBar extends TouchableOpacityProps {
  type?: string;
  triggered?: () => {};
  onUndo?: () => {};
  onClose?: () => {};
}
