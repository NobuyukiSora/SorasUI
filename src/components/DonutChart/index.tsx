import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Typograph } from '../Typograph';

interface DonutProps {
  radius: number;
  strokeWidth: number;
  data: { number: number; color: string }[];
  padding?: number;
  totalIndicator?: boolean;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const DonutChart: React.FC<DonutProps> = ({
  radius,
  strokeWidth,
  data = [],
  padding = 0,
  totalIndicator = true,
}) => {
  const circumference = 2 * Math.PI * radius;
  const totalSize = radius * 2 + strokeWidth + padding * 2;
  const animatedValues = useRef<Animated.Value[]>([]).current;
  const { total, percentages } = useMemo(() => {
    if (!data || data.length === 0) return { total: 0, percentages: [] };

    const total = data.reduce((acc, item) => acc + item.number, 0);
    const percentages = data.map((item) =>
      item.number < 0
        ? ((item.number * -1) / total) * 100
        : (item.number / total) * 100
    );
    return { total, percentages };
  }, [data]);

  useEffect(() => {
    if (animatedValues.length !== data.length) {
      while (animatedValues.length < data.length) {
        animatedValues.push(new Animated.Value(0));
      }
    }
  }, [data, animatedValues]);

  useEffect(() => {
    if (animatedValues.length !== percentages.length) return;

    Animated.stagger(
      100,
      percentages
        .map((_, index) => {
          const animatedValue = animatedValues[index];
          if (!animatedValue) return null;

          return Animated.timing(animatedValue, {
            toValue: percentages[index] ?? 0,
            duration: 800,
            useNativeDriver: true,
          });
        })
        .filter(Boolean) as Animated.CompositeAnimation[]
    ).start();
  }, [percentages, animatedValues]);

  return (
    <View style={[styles.container, { padding }]}>
      <Svg height={totalSize} width={totalSize}>
        {percentages.map((_, index) => {
          const angle =
            (percentages.slice(0, index).reduce((acc, curr) => acc + curr, 0) /
              100) *
            360;
          const color = data[index]?.color ?? 'transparent';
          return (
            <AnimatedCircle
              key={index}
              stroke={color}
              fill="none"
              cx={totalSize / 2}
              cy={totalSize / 2}
              r={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={animatedValues[index]?.interpolate({
                inputRange: [0, 100],
                outputRange: [circumference, 0],
              })}
              strokeLinecap="round"
              transform={`rotate(${-90 + angle} ${totalSize / 2} ${
                totalSize / 2
              })`}
            />
          );
        })}
      </Svg>
      <View style={styles.labelContainer}>
        {totalIndicator && (
          <Typograph customStyle={styles.label}>{`${total}`}</Typograph>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
