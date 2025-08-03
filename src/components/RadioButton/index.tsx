import * as React from 'react';
import {
  ScrollView,
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
import { Metrics } from '../../theme/metrics';
import { themeColors } from '../../theme/themeManagement';
import { useVibration } from '../../theme/vibrationManagement';
import { Typograph } from '../Typograph';
import { PropsRadioButton, PropsRadioButtonItem } from './props';

const RadioButtonItem: React.FunctionComponent<PropsRadioButtonItem> = ({
  item,
  selectedId,
  onItemPress,
  icon,
  styles,
  frontDotStyle,
  backDotStyle,
  circleContainerStyles,
  ...rest
}) => {
  const innerCircleScale = useSharedValue(0);
  const outerCircleScale = useSharedValue(1);

  React.useEffect(() => {
    if (selectedId === item.id) {
      innerCircleScale.value = withSpring(1, {
        damping: 10,
        stiffness: 100,
      });

      outerCircleScale.value = withSpring(0.6, {
        damping: 10,
        stiffness: 100,
      });
    } else {
      innerCircleScale.value = withTiming(0, { duration: 200 });

      outerCircleScale.value = withSpring(1, {
        damping: 10,
        stiffness: 100,
      });
    }
  }, [selectedId, item.id, innerCircleScale, outerCircleScale]);

  const animatedInnerCircleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: innerCircleScale.value }],
    };
  });

  const animatedOuterCircleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: outerCircleScale.value }],
    };
  });

  return (
    <TouchableOpacity
      onPress={() => {
        onItemPress(item);
      }}
      {...rest}
      style={styles.container}
      key={item.id}
    >
      <View style={[styles.circleContainer, circleContainerStyles]}>
        {selectedId === item.id &&
          (!!icon ? (
            <Animated.View style={animatedInnerCircleStyle}>
              {icon}
            </Animated.View>
          ) : (
            <Animated.View
              style={[
                styles.circleIcon,
                backDotStyle,
                animatedInnerCircleStyle,
              ]}
            />
          ))}
        <Animated.View
          style={[styles.activeCircle, frontDotStyle, animatedOuterCircleStyle]}
        ></Animated.View>
      </View>
      <Typograph>{item.title}</Typograph>
    </TouchableOpacity>
  );
};

export const RadioButton: React.FunctionComponent<PropsRadioButton> = (
  props
) => {
  const {
    data,
    onPress: onRadioButtonPress = () => {},
    selectedId,
    frontDotStyle,
    backDotStyle,
    circleContainerStyles,
    icon,
    directionMode = { direction: 'column', width: Metrics.screenWidth },
    vibrate,
    vibrateDuration,
    ...rest
  } = props;
  const { isVibrationEnabled, vibrationDuration } = useVibration();

  const onPressIn = (item: { id: string; title: string; value: string }) => {
    if (vibrate ?? isVibrationEnabled) {
      Vibration.vibrate(vibrateDuration ?? vibrationDuration);
    }

    onRadioButtonPress(item);
  };

  const styles = StyleSheet.create({
    circleIcon: {
      backgroundColor: themeColors.active,
      borderRadius: Metrics[16],
      height: Metrics[24],
      width: Metrics[24],
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Metrics[4],
      marginHorizontal: directionMode.direction === 'row' ? Metrics[4] : 0,
    },
    activeCircle: {
      backgroundColor: themeColors.inActive,
      position: 'absolute',
      height: Metrics[24],
      width: Metrics[24],
      borderRadius: Metrics[20],
      justifyContent: 'center',
      alignItems: 'center',
    },
    inactiveCircle: {
      height: Metrics[24],
      width: Metrics[24],
      borderRadius: Metrics[20],
      justifyContent: 'center',
      alignItems: 'center',
    },
    circleContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      height: Metrics[30],
      width: Metrics[30],
    },
  });

  return (
    <View>
      <ScrollView
        contentContainerStyle={{
          flexDirection: directionMode.direction === 'row' ? 'row' : 'column',
          flexWrap: 'wrap',
          width: directionMode.width,
          justifyContent: 'space-between',
          gap: Metrics[4],
        }}
      >
        {data.map((item) => (
          <RadioButtonItem
            key={item.id}
            item={item}
            selectedId={selectedId}
            onItemPress={onPressIn}
            icon={icon}
            styles={styles}
            frontDotStyle={frontDotStyle}
            backDotStyle={backDotStyle}
            circleContainerStyles={circleContainerStyles}
            {...rest}
          />
        ))}
      </ScrollView>
    </View>
  );
};
