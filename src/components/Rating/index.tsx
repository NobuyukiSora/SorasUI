import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import IconStar from '../../Icon/Ico.Star.svg';
import { Metrics, themeColors } from '../../theme';
import { PropsRender } from './props';

const StarItem: React.FunctionComponent<{
  fillValue: number;
  width: number;
  height: number;
  starColor: string;
  strokeColor: string;
  customIconActive?: React.ReactNode;
  customIconInactive?: React.ReactNode;
  onPress: () => void;
  disable: boolean;
  customContainerStyles?: object;
  styles: any;
  index: number;
}> = ({
  fillValue,
  width,
  height,
  starColor,
  strokeColor,
  customIconActive,
  customIconInactive,
  onPress,
  disable,
  customContainerStyles,
  styles,
  index,
}) => {
  const scale = useSharedValue(1);

  React.useEffect(() => {
    const baseDelay = 80;
    const animationDelay = index * baseDelay;

    if (fillValue > 0) {
      scale.value = 0;
      scale.value = withDelay(
        animationDelay,
        withSpring(1.2, { damping: 10, stiffness: 100 })
      );
    } else {
      scale.value = withSpring(1, { damping: 10, stiffness: 100 });
    }
  }, [fillValue, scale, index]);

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <TouchableOpacity onPress={onPress} disabled={disable}>
      <Animated.View
        style={[
          styles.mainContainer,
          customContainerStyles,
          animatedContainerStyle,
        ]}
      >
        <View style={[StyleSheet.absoluteFill, styles.center]}>
          {customIconInactive ? (
            customIconInactive
          ) : (
            <IconStar
              fill={'transparent'}
              stroke={strokeColor}
              width={width}
              height={height}
            />
          )}
        </View>

        <View
          style={{
            width: width * (fillValue ?? 0),
            overflow: 'hidden',
            height: height,
            position: 'absolute',
            left: 0,
            top: 0,
          }}
        >
          {!!customIconActive ? (
            customIconActive
          ) : (
            <IconStar
              fill={starColor}
              stroke={starColor}
              width={width}
              height={height}
            />
          )}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

export const Rating: React.FunctionComponent<PropsRender> = (props) => {
  const {
    length = 5,
    width = 20,
    height = 40,
    value = 0,
    onChange = () => {},
    starColor = 'yellow',
    customIconActive,
    customIconInactive,
    justifyContent = 'space-around',
    customContainerStyles,
    disable = false,
    strokeColor = themeColors.text,
  } = props;
  const [code, setCode] = React.useState<number[]>(Array(length).fill(0));

  const handleSplitNumber = React.useCallback(() => {
    if (value !== 0) {
      setCode(() => {
        const newCode: number[] = Array(length).fill(0);

        const calculateValue = (value / 5) * length;
        const wholeParts = Math.floor(calculateValue);
        const remainder = calculateValue % 1;

        for (let loop = 0; loop < length; loop++) {
          if (loop < wholeParts) {
            newCode[loop] = 1;
          } else if (loop === wholeParts) {
            if (remainder > 0) {
              newCode[loop] = remainder;
            } else {
              newCode[loop] = 0;
            }
          } else {
            newCode[loop] = 0;
          }
        }
        return newCode;
      });
    } else {
      setCode(Array(length).fill(0));
    }
  }, [value, length]);

  React.useEffect(() => {
    handleSplitNumber();
  }, [handleSplitNumber]);

  const handleChange = (number: number, index: number) => {
    const newCode = [...code];
    for (let loop = 0; loop < length; loop++) {
      newCode[loop] = loop <= index ? number : 0;
    }
    setCode(newCode);
    onChange(index + 1);
  };

  const styles = StyleSheet.create({
    mainContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: Metrics[8],
      height: height,
      width: width,
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  const renderStars = () => {
    return code.map((fillValue, index) => (
      <StarItem
        key={index}
        index={index}
        fillValue={fillValue}
        width={width}
        height={height}
        starColor={starColor}
        strokeColor={strokeColor}
        customIconActive={customIconActive}
        customIconInactive={customIconInactive}
        onPress={() => handleChange(1, index)}
        disable={disable}
        customContainerStyles={customContainerStyles}
        styles={styles}
      />
    ));
  };

  return (
    <View style={{ justifyContent: justifyContent, flexDirection: 'row' }}>
      {renderStars()}
    </View>
  );
};
