import type { ScrollViewProps } from 'react-native';

export interface PropsDynamicScrollView extends ScrollViewProps {
  direction: 'column' | 'row' | undefined;
  width?: number;
  height?: number;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined;
}
