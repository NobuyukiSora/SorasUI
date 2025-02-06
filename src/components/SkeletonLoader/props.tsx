import type { TextStyle, ViewProps } from 'react-native';

export interface PropsSkeleton extends ViewProps {
  width?: number;
  height?: number;
  customContainerStyle?: TextStyle;
  customSkeletonStyle?: TextStyle;
  duration?: number;
  animation?: 'wave' | 'breathing';
}

export interface PropsCircleSkeleton extends ViewProps {
  width?: number;
  height?: number;
  customContainerStyle?: TextStyle;
  customSkeletonStyle?: TextStyle;
  duration?: number;
  skeletonProps?: PropsSkeleton;
}

export interface PropsCardSkeleton extends ViewProps {
  width?: number;
  height?: number;
  customCardStyle?: TextStyle;
  customContainerStyle?: TextStyle;
  customSkeletonStyle?: TextStyle;
  duration?: number;
  skeletonProps?: PropsSkeleton;
}
