import type { TextStyle, ViewProps } from 'react-native';

export interface PropsInfinitScrolling extends ViewProps {
  width: number;
  height?: number;
  customContainerStyle?: TextStyle;
  customSkeletonStyle?: TextStyle;
  duration?: number;
}

export interface PropsInfinitScrollingCircle extends ViewProps {
  width: number;
  height?: number;
  customContainerStyle?: TextStyle;
  customSkeletonStyle?: TextStyle;
  duration?: number;
}

export interface PropsInfinitScrollingCard extends ViewProps {
  width: number;
  height?: number;
  customCardStyle?: TextStyle;
  customContainerStyle?: TextStyle;
  customSkeletonStyle?: TextStyle;
  duration?: number;
}
