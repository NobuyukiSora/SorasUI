import * as React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import IconCheck from '../../Icon/Ico-Check.svg';
import { Metrics } from '../../theme/metrics';
import { themeColors } from '../../theme/themeManagement';
import { useVibration } from '../../theme/vibrationManagement';
import { Typograph } from '../Typograph';
import { PropsCheckBox } from './props';

export const CheckBox: React.FunctionComponent<PropsCheckBox> = (props) => {
  const {
    onPress = () => {},
    activeBoxStyles,
    inactiveBoxStyles,
    customBoxContainerStyles,
    icon,
    iconColor = themeColors.text,
    title,
    value,
    vibrate,
    vibrateDuration,
    ...rest
  } = props;
  const { isVibrationEnabled, vibrationDuration } = useVibration();

  const iconScale = useSharedValue(0);
  const iconOpacity = useSharedValue(0);

  const inactiveBoxAnimatedScale = useSharedValue(1);

  React.useEffect(() => {
    if (value) {
      iconScale.value = withSpring(1, { damping: 10, stiffness: 100 });
      iconOpacity.value = withTiming(1, { duration: 200 });

      inactiveBoxAnimatedScale.value = withSpring(0.85, {
        damping: 10,
        stiffness: 100,
      });
    } else {
      iconScale.value = withTiming(0, { duration: 200 });
      iconOpacity.value = withTiming(0, { duration: 200 });

      inactiveBoxAnimatedScale.value = withSpring(1, {
        damping: 10,
        stiffness: 100,
      });
    }
  }, [value, iconScale, iconOpacity, inactiveBoxAnimatedScale]);

  const onPressIn = (event: GestureResponderEvent) => {
    if (vibrate ?? isVibrationEnabled) {
      Vibration.vibrate(vibrateDuration ?? vibrationDuration);
    }
    onPress(event);
  };

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: iconScale.value }],
      opacity: iconOpacity.value,
    };
  });

  const animatedInactiveBoxStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: inactiveBoxAnimatedScale.value }],
    };
  });

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Metrics[8],
      height: Metrics[24],
    },
    boxContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      height: Metrics[24],
      width: Metrics[24],
    },
    inactiveBox: {
      position: 'absolute',
      backgroundColor: themeColors.inActive,
      height: Metrics[24],
      width: Metrics[24],
      borderRadius: Metrics[4],
    },
    activeBox: {
      height: Metrics[20],
      width: Metrics[20],
      borderRadius: Metrics[4],
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <TouchableOpacity {...rest} onPress={onPressIn} style={styles.container}>
      <View style={[styles.boxContainer, customBoxContainerStyles]}>
        <View style={[styles.activeBox, activeBoxStyles]}>
          <Animated.View
            style={[
              styles.inactiveBox,
              inactiveBoxStyles,
              animatedInactiveBoxStyle,
            ]}
          />
          {value && (
            <Animated.View style={animatedIconStyle}>
              {icon ? icon : <IconCheck fill={iconColor} />}
            </Animated.View>
          )}
        </View>
      </View>
      <View>
        <Typograph>{title}</Typograph>
      </View>
    </TouchableOpacity>
  );
};
