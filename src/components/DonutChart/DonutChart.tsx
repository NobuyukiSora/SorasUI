import { Canvas, Path, Skia } from '@shopify/react-native-skia';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { themeColors } from '../../theme';
import DonutPath from './DonutPath';
import { PropsDonutChart } from './props';

export const DonutChart: React.FunctionComponent<PropsDonutChart> = (props) => {
  const {
    gap = 0.04,
    strokeWidth = 30,
    outerStrokeWidth = 46,
    outerStrokColor = themeColors.backgroundSecondary,
    radius = 160,
    data,
  } = props;

  const decimals = useSharedValue<number[]>([]);
  const totalValue = useSharedValue(0);

  const array = Array.from({ length: data.length });
  const innerRadius = radius - outerStrokeWidth / 2;

  let total = data.reduce((sum, item) => sum + item.value, 0);
  totalValue.value = withTiming(total, { duration: 1000 });

  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius);

  const generateDecimals = data.map(
    (number) => Number(number?.percentage.toFixed(0)) / 100
  );
  decimals.value = [...generateDecimals];

  const styles = StyleSheet.create({
    container: {
      width: radius * 2,
      height: radius * 2,
    },
  });

  return (
    <View style={styles.container}>
      <Canvas style={styles.container}>
        {/* Outer circle path */}
        <Path
          path={path}
          color={outerStrokColor}
          style="stroke"
          strokeJoin="round"
          strokeWidth={outerStrokeWidth}
          strokeCap="round"
          start={0}
          end={1}
        />

        {/* Segments */}
        {array.map((_, index) => (
          <DonutPath
            key={index}
            radius={radius}
            strokeWidth={strokeWidth}
            outerStrokeWidth={outerStrokeWidth}
            color={data[index]?.color ?? 'white'}
            decimals={decimals}
            index={index}
            gap={gap}
          />
        ))}
      </Canvas>
    </View>
  );
};
