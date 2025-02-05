import type { TouchableOpacityProps } from 'react-native';

export interface PropsDropDown extends TouchableOpacityProps {
  title: string;
  options?: { label: string; value: string }[];
  onSelect: (data: any) => void;
  mode?: 'calendar' | 'picker';
  height?: number;
  maxDropDownHeight?: number;
  vibrate?: boolean;
  vibrateDuration?: number;
}
