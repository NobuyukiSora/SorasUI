import type { TouchableOpacityProps } from 'react-native';

export interface PropsCalendar extends TouchableOpacityProps {
  width?: number;
  customStyles?: {
    daysType: 'short' | 'long' | 'supaShort';
    daysHeight: number;
    showLastNextDate: boolean;
  };
}
