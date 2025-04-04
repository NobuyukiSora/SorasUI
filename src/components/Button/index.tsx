import * as React from 'react';
import { StyleSheet, TouchableOpacity, Vibration } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Metrics } from '../../theme/metrics';
import { themeColors } from '../../theme/themeManagement';
import { Typograph } from '../Typograph';
import type { PropsButton } from './props';
import { useVibration } from '../../theme/vibrationManagement';

export const Button: React.FunctionComponent<PropsButton> = (props) => {
  const {
    title,
    onPress = () => {},
    customStyleButton = {},
    customStyleTitle = {},
    children,
    vibrate,
    vibrateDuration,
    propsTypograph,
    ...rest
  } = props;

  const scale = useSharedValue(1);
  const { isVibrationEnabled, vibrationDuration } = useVibration();

  const animatedStyleOnPress = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const onPressIn = (type: string) => {
    if (vibrate ?? isVibrationEnabled) {
      Vibration.vibrate(vibrateDuration ?? vibrationDuration);
    }
    scale.value = withSpring(0.9);
    if (type === 'onPress') {
      setTimeout(() => {
        onPressOut();
      }, 400);
    }
  };

  const onPressOut = () => {
    scale.value = withSpring(1);
  };

  const styles = StyleSheet.create({
    title: {
      fontWeight: '800',
      textAlign: 'center',
    },
    button: {
      backgroundColor: themeColors.button,
      borderRadius: Metrics[8],
      justifyContent: 'center',
      padding: Metrics[16],
    },
  });

  return (
    <TouchableOpacity
      onPress={(set) => {
        onPress(set);
        onPressIn('onPress');
      }}
      onLongPress={() => onPressIn('onLongPress')}
      onPressOut={onPressOut}
      {...rest}
    >
      <Animated.View
        style={[styles.button, customStyleButton, animatedStyleOnPress]}
      >
        {!!children ? (
          children
        ) : (
          <Typograph
            customStyle={[
              styles.title,
              ...(customStyleTitle ? [customStyleTitle] : []),
            ]}
            {...propsTypograph}
          >
            {title}
          </Typograph>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};
