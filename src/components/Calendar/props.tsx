import type { TouchableOpacityProps } from 'react-native';

export interface PropsCalendar extends TouchableOpacityProps {
  width?: number;
  getDatesRange?: boolean;
  dateRangeValue?: (date: { start: any; end: any }) => void;
  customStyles?: {
    daysType: 'short' | 'long' | 'supaShort';
    daysHeight: number;
    showLastNextDate: boolean;
  };
}
