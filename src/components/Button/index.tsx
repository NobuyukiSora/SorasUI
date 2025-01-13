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

export const Button: React.FunctionComponent<PropsButton> = (props) => {
  const {
    title,
    onPress = () => {},
    customStyleButton = {},
    customStyleTitle = {},
    children,
    vibrate = true,
    vibrateDuration = 100,
    ...rest
  } = props;

  const scale = useSharedValue(1);

  const animatedStyleOnPress = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const onPressIn = (type: string) => {
    vibrate && Vibration.vibrate(vibrateDuration);
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
          <Typograph style={[styles.title, customStyleTitle]}>
            {title}
          </Typograph>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};
