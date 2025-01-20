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
import { themeColors } from '../../theme';
import { PropsInfinitScrolling } from './props';

export const SkeletonLoader: React.FunctionComponent<PropsInfinitScrolling> = (
  props
) => {
  const { children, width, ...rest } = props;

  const translateX = useSharedValue(0);

  translateX.value = withRepeat(
    withSequence(
      withTiming(-width, {
        duration: 2000,
        easing: Easing.linear,
      }),
      withTiming(0, { duration: 0 })
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
      backgroundColor: themeColors.textSecondary,
    },
    bar: { width: '100%', backgroundColor: themeColors.textThird, height: 10 },
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.bar, animatedStyle]} {...rest}>
        {children}
      </Animated.View>
    </View>
  );
};
