import * as React from 'react';
import { useEffect, useCallback } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
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

import { Metrics } from '../../theme';
import { PropsCarousel } from './props';

export const Carousel: React.FunctionComponent<PropsCarousel> = () => {
  // Sample data for the carousel
  const data = [
    {
      id: '1',
      title: 'First Slide',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: '2',
      title: 'Second Slide',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: '3',
      title: 'Third Slide',
      image: 'https://via.placeholder.com/300x200',
    },
    { id: '4', title: '4 Slide', image: 'https://via.placeholder.com/300x200' },
    { id: '5', title: '5 Slide', image: 'https://via.placeholder.com/300x200' },
  ];

  const translateX = useSharedValue(0);
  const currentIndex = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  });

  // Wrap updateCurrentIndex with useCallback to avoid unnecessary re-renders
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
        () => {
          runOnJS(updateCurrentIndex)();
        }
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex.value, data.length, translateX, updateCurrentIndex]);

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
        () => {
          runOnJS(updateCurrentIndex)();
        }
      );
    });

  // const navigateToSlide = (index: number) => {
  //   translateX.value = withTiming(
  //     -index * Metrics.screenWidth,
  //     { duration: 500 },
  //     () => {
  //       runOnJS(updateCurrentIndex)();
  //     }
  //   );
  // };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={gesture}>
        <View style={styles.container}>
          <Animated.View style={[styles.slider, animatedStyles]}>
            {data.map((item) => (
              <View
                style={[styles.slide, { width: Metrics.screenWidth }]}
                key={item.id}
              >
                <Image source={{ uri: item.image }} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
              </View>
            ))}
          </Animated.View>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});
