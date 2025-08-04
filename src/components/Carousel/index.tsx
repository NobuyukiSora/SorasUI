import * as React from 'react';
import { useCallback, useEffect } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { Metrics, themeColors } from '../../theme';
import { Typograph } from '../Typograph';
import { PropsCarousel } from './props';

export const Carousel: React.FunctionComponent<PropsCarousel> = (props) => {
  const {
    data,
    duration = 3000,
    overflow,
    height = 200,
    width = Metrics.screenWidth,
    customStyleDot = { width: 8, height: 8 },
    customStyleTitle,
    activeDotColor = themeColors.active,
    inactiveDotColor = themeColors.inActive,
  } = props;

  const translateX = useSharedValue(0);
  const currentIndex = useSharedValue(0);

  const activeIndex = useDerivedValue(() => {
    return Math.round(-translateX.value / width);
  });

  const updateCurrentIndex = useCallback(() => {
    currentIndex.value = Math.round(-translateX.value / width);
  }, [translateX, currentIndex, width]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex.value + 1) % data.length;
      translateX.value = withTiming(
        -nextIndex * width,
        { duration: 1000 },
        () => runOnJS(updateCurrentIndex)()
      );
    }, duration);

    return () => clearInterval(interval);
  }, [
    currentIndex,
    data.length,
    translateX,
    updateCurrentIndex,
    duration,
    width,
  ]);

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX - currentIndex.value * width;
    })
    .onEnd(() => {
      const index = Math.round(-translateX.value / width);
      translateX.value = withTiming(-index * width, { duration: 700 }, () =>
        runOnJS(updateCurrentIndex)()
      );
    });

  const navigateToSlide = (index: number) => {
    translateX.value = withTiming(-index * width, { duration: 700 }, () =>
      runOnJS(updateCurrentIndex)()
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      left: 0,
    },
    slider: {
      flexDirection: 'row',
    },
    slide: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '100%',
    },
    title: {
      position: 'absolute',
      bottom: 10,
      left: 10,
      color: 'white',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: 5,
      borderRadius: 5,
    },
    indicatorContainer: {
      marginVertical: Metrics[4],
      justifyContent: 'center',
      flexDirection: 'row',
    },
    indicator: {
      borderRadius: 4,
      backgroundColor: 'gray',
      marginHorizontal: 4,
    },
  });

  const AnimatedDot = (index: number) => {
    const baseWidth =
      typeof customStyleDot.width === 'number' ? customStyleDot.width : 8;
    const baseHeight =
      typeof customStyleDot.height === 'number' ? customStyleDot.height : 8;

    const animatedStyle = useAnimatedStyle(() => ({
      backgroundColor:
        activeIndex.value === index ? activeDotColor : inactiveDotColor,
      transform: [
        {
          scale: withSpring(activeIndex.value === index ? 1.2 : 1),
        },
      ],

      width: withSpring(
        activeIndex.value === index ? baseWidth * 2 : baseWidth
      ),

      borderRadius: withSpring(
        activeIndex.value === index ? baseHeight / 2 : baseHeight / 2
      ),
    }));

    return (
      <Pressable key={index} onPress={() => navigateToSlide(index)}>
        <Animated.View
          style={[styles.indicator, customStyleDot, animatedStyle]}
        />
      </Pressable>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={gesture}>
        <View style={[styles.container, { overflow: overflow, width: width }]}>
          <Animated.View
            style={[
              styles.slider,
              useAnimatedStyle(() => ({
                transform: [{ translateX: translateX.value }],
              })),
            ]}
          >
            {data.map((item, index) => (
              <TouchableOpacity
                key={index}
                disabled={!item?.onPress}
                onPress={item?.onPress}
              >
                <View style={[styles.slide, { width: width }]}>
                  <Image
                    source={{ uri: item.image }}
                    style={[styles.image, { height: height }]}
                  />
                  {item?.title && (
                    <Typograph style={[styles.title, customStyleTitle]}>
                      {item.title}
                    </Typograph>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </Animated.View>
          <View style={styles.indicatorContainer}>
            {data.map((_, index) => AnimatedDot(index))}
          </View>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};
