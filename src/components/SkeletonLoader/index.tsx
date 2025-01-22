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
import { Metrics } from '../../theme';
import { PropsInfinitScrolling, PropsInfinitScrollingCard } from './props';

export const SkeletonLoader: React.FunctionComponent<PropsInfinitScrolling> = (
  props
) => {
  const {
    children,
    width,
    height = 10,
    duration = 1000,
    customContainerStyle,
    customSkeletonStyle,
    ...rest
  } = props;

  const translateX = useSharedValue(0);

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

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      backgroundColor: 'rgba(110, 109, 109, 0.5)',
    },
    bar: {
      width: '100%',
      backgroundColor: 'rgba(148, 148, 148, 0.5)',
      height: height,
    },
  });

  return (
    <View style={[styles.container, customContainerStyle]}>
      <Animated.View
        style={[styles.bar, animatedStyle, customSkeletonStyle]}
        {...rest}
      >
        {children}
      </Animated.View>
    </View>
  );
};

export const CircleSkeletonLoader: React.FunctionComponent<
  PropsInfinitScrolling
> = (props) => {
  const {
    width,
    duration = 1000,
    customContainerStyle,
    customSkeletonStyle = { borderRadius: 1000, height: width },
  } = props;
  return (
    <View
      style={[
        { width: width, height: width, borderRadius: 1000, overflow: 'hidden' },
        customContainerStyle,
      ]}
    >
      <SkeletonLoader
        width={width}
        customSkeletonStyle={customSkeletonStyle}
        duration={duration}
      />
    </View>
  );
};

export const CardSkeletonLoader: React.FunctionComponent<
  PropsInfinitScrollingCard
> = (props) => {
  const {
    width,
    duration = 1000,
    customCardStyle,
    customContainerStyle,
    customSkeletonStyle = { borderRadius: 1000 },
  } = props;
  return (
    <View
      style={[
        {
          width: 'auto',
          backgroundColor: 'rgba(52, 52, 52, 0.5)',
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
            customSkeletonStyle={customSkeletonStyle}
            duration={duration}
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
          customSkeletonStyle={customSkeletonStyle}
          duration={duration}
        />
      </View>
      <View style={[{ width: 'auto', height: 20 }, customContainerStyle]}>
        <SkeletonLoader
          width={width}
          height={12}
          customContainerStyle={{ borderRadius: Metrics[8] }}
          customSkeletonStyle={customSkeletonStyle}
          duration={duration}
        />
      </View>
    </View>
  );
};
