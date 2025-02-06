import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Colors, Metrics } from '../../theme';
import { PropsCardSkeleton, PropsCircleSkeleton, PropsSkeleton } from './props';

export const SkeletonLoader: React.FunctionComponent<PropsSkeleton> = (
  props
) => {
  const {
    children,
    width = Metrics.screenWidth,
    height = 10,
    duration = 1000,
    customContainerStyle,
    customSkeletonStyle,
    animation,
    ...rest
  } = props;

  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);

  translateX.value = withRepeat(
    withSequence(
      withTiming(-width, {
        duration: duration,
        easing: Easing.linear,
      }),
      withTiming(0, { duration: 500 })
    ),
    -1,
    false
  );

  opacity.value = withRepeat(
    withSequence(
      withTiming(0, { duration: duration }),
      withTiming(1, { duration: duration })
    ),
    -1,
    true
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const animatedOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      backgroundColor: Colors.grey,
      opacity: 0.4,
    },
    bar: {
      width: '100%',
      backgroundColor: Colors.lightCream,
      height: height,
      opacity: 0.5,
    },
  });

  return (
    <View style={[styles.container, customContainerStyle]}>
      <Animated.View
        style={[
          styles.bar,
          animation === 'breathing' ? animatedOpacityStyle : animatedStyle,
          customSkeletonStyle,
        ]}
        {...rest}
      >
        {children}
      </Animated.View>
    </View>
  );
};

export const CircleSkeletonLoader: React.FunctionComponent<
  PropsCircleSkeleton
> = (props) => {
  const {
    width,
    height,
    customContainerStyle,
    skeletonProps = {
      customSkeletonStyle: { borderRadius: 1000, height: width },
    },
  } = props;
  return (
    <View
      style={[
        {
          width: width,
          height: height ?? width,
          borderRadius: 1000,
          overflow: 'hidden',
        },
        customContainerStyle,
      ]}
    >
      <SkeletonLoader width={height ?? width} {...skeletonProps} />
    </View>
  );
};

export const CardSkeletonLoader: React.FunctionComponent<PropsCardSkeleton> = (
  props
) => {
  const {
    width,
    customCardStyle,
    customContainerStyle,
    skeletonProps = {},
  } = props;
  return (
    <View
      style={[
        {
          width: 'auto',
          backgroundColor: 'rgba(52, 52, 52, 0.3)',
          gap: 10,
          padding: Metrics[12],
          borderRadius: Metrics[8],
        },
        customCardStyle,
      ]}
    >
      <View
        style={[
          { width: 'auto', height: 20, flexDirection: 'row' },
          customContainerStyle,
        ]}
      >
        <View style={{ flex: 1 }}>
          <SkeletonLoader
            width={width}
            height={12}
            customContainerStyle={{
              borderRadius: Metrics[8],
              overflow: 'hidden',
            }}
            {...skeletonProps}
          />
        </View>
        <View style={{ flex: 1 }}></View>
      </View>
      <View style={[{ width: 'auto', height: 20 }, customContainerStyle]}>
        <SkeletonLoader
          width={width}
          height={12}
          customContainerStyle={{
            borderRadius: Metrics[8],
            overflow: 'hidden',
          }}
          {...skeletonProps}
        />
      </View>
      <View style={[{ width: 'auto', height: 20 }, customContainerStyle]}>
        <SkeletonLoader
          width={width}
          height={12}
          customContainerStyle={{ borderRadius: Metrics[8] }}
          {...skeletonProps}
        />
      </View>
    </View>
  );
};
