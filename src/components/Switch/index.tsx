import * as React from 'react';
import { StyleSheet, TouchableOpacity, Vibration, View } from 'react-native';

import { PropsSwitch } from './props';
import { Metrics } from '../../theme/metrics';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { themeColors } from '../../theme/themeManagement';
import { useVibration } from '../../theme/vibrationManagement';

export const Switch: React.FunctionComponent<PropsSwitch> = (props) => {
  const {
    value = false,
    onPress = () => {},
    disabled = false,
    customTrackStyles,
    customThumbStyles,
    icon,
    vibrate,
    vibrateDuration,
    customContainerStyle,
    ...rest
  } = props;

  const { isVibrationEnabled, vibrationDuration } = useVibration();
  const springValue = useSharedValue(0);
  const squishValue = useSharedValue(1);

  React.useEffect(() => {
    springValue.value = withSpring(!value ? 0 : 20);
  }, [value, springValue]);

  const onPressInSwitch = () => {
    if (vibrate ?? isVibrationEnabled) {
      Vibration.vibrate(vibrateDuration ?? vibrationDuration);
    }
    squishValue.value = withTiming(0.9, { easing: Easing.inOut(Easing.ease) });
  };

  const onPressOutSwitch = () => {
    squishValue.value = withTiming(1, { easing: Easing.inOut(Easing.ease) });
    springValue.value = withSpring(value ? 0 : 20);
    onPress();
  };

  const animatedCircle = useAnimatedStyle(() => ({
    transform: [
      { translateX: springValue.value },
      { scale: squishValue.value },
    ],
  }));

  const styles = StyleSheet.create({
    thumb: {
      height: Metrics[26],
      width: Metrics[26],
      backgroundColor: themeColors.button,
      borderRadius: 100,
      elevation: 3,
      shadowColor: 'black',
      shadowOpacity: 0.12,
      shadowOffset: {
        height: Metrics[2],
        width: Metrics[2],
      },
      position: 'absolute',
      marginHorizontal: 2,
    },
    track: {
      height: Metrics[30],
      width: Metrics[50],
      borderRadius: 100,
      backgroundColor: themeColors.active,
    },
  });

  return (
    <TouchableOpacity
      style={[
        {
          justifyContent: 'center',
          opacity: disabled ? 0.6 : 1,
        },
        customContainerStyle,
      ]}
      onPressIn={() => onPressInSwitch()}
      onPressOut={() => onPressOutSwitch()}
      disabled={disabled}
      {...rest}
    >
      <View style={[styles.track, customTrackStyles]} />
      <Animated.View style={[styles.thumb, customThumbStyles, animatedCircle]}>
        {icon}
      </Animated.View>
    </TouchableOpacity>
  );
};
