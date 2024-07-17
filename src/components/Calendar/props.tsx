import { ReactNode } from 'react';
import { TextStyle } from 'react-native';

export interface PropsCalendar {
  width?: number;
  height?: number;
  getDatesRange?: boolean;
  setMonthPosition?: number;
  setYearPosition?: number;
  dateRangeValue?: (date: { start: any; end: any }) => void;
  onPressDate?: (date: string) => void;
  customTitleHeader?: ReactNode;
  customSelectedDot?: ReactNode;
  customRangeDot?: ReactNode;
  customizeSelectedTextStyles?: TextStyle;
  customWeekTextStyles?: TextStyle;
  customDateTextStyles?: TextStyle;
  customStyles?: {
    weekType: 'short' | 'long' | 'supaShort';
    showLastNextDate: boolean;
  };
}
