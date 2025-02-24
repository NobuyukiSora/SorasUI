import type { TextStyle, TouchableOpacityProps } from 'react-native';
import { PropsTextInput } from '../TextInputField/props';
import { PropsCalendar } from '../Calendar/props';

export interface PropsDropDown extends TouchableOpacityProps {
  title: string;
  options?: { label: string; value: string }[];
  onSelect: (data: any) => void;
  mode?: 'calendar' | 'picker';
  height?: number;
  maxDropDownHeight?: number;
  vibrate?: boolean;
  vibrateDuration?: number;
  textInputProps?: PropsTextInput;
  calendarProps?: PropsCalendar;
  modalContainerStyle?: TextStyle;
  pressableStyle?: TextStyle;
  disabled?: boolean;
  value?: string;
}
