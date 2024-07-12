import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';

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

export const Switch: React.FunctionComponent<PropsSwitch> = (props) => {
  const {
    value = false,
    onPress = () => {},
    disabled = false,
    trackStyle = {
      height: Metrics[30],
      width: Metrics[50],
      borderRadius: 100,
      backgroundColor: themeColors.active,
    },
    thumbStyle = {
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
    children,
    ...rest
  } = props;

  const springValue = useSharedValue(0);
  const squishValue = useSharedValue(1);

  React.useEffect(() => {
    springValue.value = withSpring(!value ? 0 : 20);
  }, [value, springValue]);

  const onPressInSwitch = () => {
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

  return (
    <TouchableOpacity
      style={{
        justifyContent: 'center',
        opacity: disabled ? 0.6 : 1,
      }}
      onPressIn={() => onPressInSwitch()}
      onPressOut={() => onPressOutSwitch()}
      {...rest}
      disabled={disabled}
    >
      <View style={trackStyle} />
      <Animated.View style={[thumbStyle, animatedCircle]}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};