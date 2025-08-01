import React, { useState, useRef, useEffect } from 'react';
import {
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
  const contentHeight = useSharedValue(0);
  const contentOpacity = useSharedValue(0);
  const measuredContentHeight = useRef(0);

  useEffect(() => {
    if (isExpanded) {
      if (measuredContentHeight.current > 0) {
        contentHeight.value = withTiming(measuredContentHeight.current, {
          duration: 300,
          easing: Easing.inOut(Easing.ease),
        });
        contentOpacity.value = withTiming(1, {
          duration: 300,
          easing: Easing.inOut(Easing.ease),
        });
      }

      rotation.value = withTiming(180, {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
      });
    } else {
      contentHeight.value = withTiming(0, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      });
      contentOpacity.value = withTiming(0, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      });

      rotation.value = withTiming(0, {
        duration: 500,
        easing: Easing.inOut(Easing.ease),
      });
    }
  }, [isExpanded, rotation, contentHeight, contentOpacity]);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const contentAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: contentHeight.value,
      opacity: contentOpacity.value,
    };
  });

  const onContentLayout = (event: {
    nativeEvent: { layout: { height: any } };
  }) => {
    const newHeight = event.nativeEvent.layout.height;

    if (
      measuredContentHeight.current === 0 ||
      measuredContentHeight.current !== newHeight
    ) {
      measuredContentHeight.current = newHeight;

      if (isExpanded) {
        contentHeight.value = withTiming(measuredContentHeight.current, {
          duration: 300,
          easing: Easing.inOut(Easing.ease),
        });
        contentOpacity.value = withTiming(1, {
          duration: 300,
          easing: Easing.inOut(Easing.ease),
        });
      }
    }
  };

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
    headerCustomMode: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    animatedContentWrapper: {
      overflow: 'hidden',
    },

    innerContentContainer: {
      position: 'absolute',
      width: '100%',
      top: 0,
      left: 0,
    },
  });

  return (
    <View style={[styles.container, customContainerStyle]}>
      <TouchableOpacity onPress={toggleExpand}>
        <View
          style={[
            customHeader ? styles.headerCustomMode : styles.header,
            customHeaderStyle,
          ]}
        >
          {customHeader ?? <Typograph>{title}</Typograph>}
          <Animated.View style={animatedStyle}>
            {customIcon ?? <IcoDown stroke={themeColors.text} />}
          </Animated.View>
        </View>
      </TouchableOpacity>

      <Animated.View
        style={[styles.animatedContentWrapper, contentAnimatedStyle]}
      >
        <View
          onLayout={onContentLayout}
          style={[styles.innerContentContainer, customItemContainerStyle]}
        >
          {renderItem}
        </View>
      </Animated.View>
    </View>
  );
};
