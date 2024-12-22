import * as React from 'react';
import { useCallback, useEffect } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

import { Metrics, themeColors } from '../../theme';
import { PropsCarousel } from './props';

export const Carousel: React.FunctionComponent<PropsCarousel> = (props) => {
  const { data, duration = 3000, overflow } = props;
  const translateX = useSharedValue(0);
  const currentIndex = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const updateCurrentIndex = useCallback(() => {
    const index = Math.round(-translateX.value / Metrics.screenWidth);
    currentIndex.value = index;
  }, [translateX, currentIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex.value + 1) % data.length;
      translateX.value = withTiming(
        -nextIndex * Metrics.screenWidth,
        { duration: 1000 },
        () => runOnJS(updateCurrentIndex)()
      );
    }, duration);

    return () => clearInterval(interval);
  }, [currentIndex, data.length, translateX, updateCurrentIndex, duration]);

  const gesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value =
        event.translationX - currentIndex.value * Metrics.screenWidth;
    })
    .onEnd(() => {
      const index = Math.round(-translateX.value / Metrics.screenWidth);
      translateX.value = withTiming(
        -index * Metrics.screenWidth,
        { duration: 500 },
        () => runOnJS(updateCurrentIndex)()
      );
    });

  const navigateToSlide = (index: number) => {
    translateX.value = withTiming(
      -index * Metrics.screenWidth,
      { duration: 500 },
      () => runOnJS(updateCurrentIndex)()
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={gesture}>
        <View style={[styles.container, { overflow: overflow }]}>
          <Animated.View style={[styles.slider, animatedStyles]}>
            {data.map((item) => (
              <TouchableOpacity
                disabled={!item?.onPress}
                onPress={item?.onPress}
              >
                <View
                  style={[styles.slide, { width: Metrics.screenWidth }]}
                  key={item.id}
                >
                  <Image source={{ uri: item.image }} style={styles.image} />
                  {item?.title && (
                    <Text style={styles.title}>{item.title}</Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </Animated.View>
          <View style={styles.indicatorContainer}>
            {data.map((_, index) => (
              <Pressable key={index} onPress={() => navigateToSlide(index)}>
                <Animated.View
                  style={[
                    styles.indicator,
                    {
                      backgroundColor:
                        currentIndex.value === index
                          ? themeColors.inActive
                          : themeColors.active,
                      transform: [
                        {
                          scale: currentIndex.value === index ? 1.2 : 1,
                        },
                      ],
                    },
                  ]}
                />
              </Pressable>
            ))}
          </View>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
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
    height: 200,
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
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'gray',
    marginHorizontal: 4,
  },
});
