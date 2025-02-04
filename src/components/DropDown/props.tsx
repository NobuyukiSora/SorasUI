import type { TouchableOpacityProps } from 'react-native';

export interface PropsDropDown extends TouchableOpacityProps {
  title: string;
  value: boolean;
  options: { label: string; value: string }[];
  onSelect: (data: any) => void;
  height?: number;
  maxDropDownHeight?: number;
  vibrate?: boolean;
  vibrateDuration?: number;
}
