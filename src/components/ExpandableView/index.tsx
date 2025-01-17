import React, { useState } from 'react';
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Metrics, themeColors } from '../../theme';
import { Typograph } from '../Typograph';
import { PropsExpandibleView } from './props';
import IcoDown from '../../Icon/Ico.Down.svg';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const ExpandableView: React.FunctionComponent<PropsExpandibleView> = (
  props
) => {
  const {
    title,
    renderItem,
    customHeader,
    customIcon,
    customContainerStyle,
    customHeaderStyle,
    customItemContainerStyle,
  } = props;
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const rotation = useSharedValue(0);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    toggleRotation();
    setIsExpanded((prev) => !prev);
  };

  const toggleRotation = () => {
    rotation.value = withTiming(isExpanded ? 0 : 180, {
      duration: 500,
      easing: Easing.inOut(Easing.ease),
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const styles = StyleSheet.create({
    container: {
      borderRadius: Metrics[8],
      overflow: 'hidden',
    },
    header: {
      backgroundColor: themeColors.background,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: Metrics[12],
      paddingHorizontal: Metrics[12],
    },
    content: {
      backgroundColor: themeColors.background,
    },
  });

  return (
    <View style={[styles.container, customContainerStyle]}>
      <TouchableOpacity onPress={toggleExpand}>
        {customHeader ?? (
          <View style={[styles.header, customHeaderStyle]}>
            <Typograph>{title}</Typograph>
            <Animated.View style={animatedStyle}>
              {customIcon ?? <IcoDown stroke={themeColors.text} />}
            </Animated.View>
          </View>
        )}
      </TouchableOpacity>
      {isExpanded && (
        <View style={[styles.content, customItemContainerStyle]}>
          {renderItem}
        </View>
      )}
    </View>
  );
};
