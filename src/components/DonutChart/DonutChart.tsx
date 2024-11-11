import { StyleSheet, View } from 'react-native';
import React from 'react';
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Canvas, Path, Skia, Text } from '@shopify/react-native-skia';
import DonutPath from './DonutPath';
import { PropsDonutChart } from './props';
import { themeColors } from '../../theme';

export const DonutChart: React.FunctionComponent<PropsDonutChart> = (props) => {
  const {
    gap = 0.04,
    strokeWidth = 30,
    outerStrokeWidth = 46,
    outerStrokColor = themeColors.backgroundSecondary,
    radius = 160,
    font,
    data,
    displayTotalValue = true,
    totalValueSymbol = '',
    totalValueColor = 'black',
  } = props;

  const decimals = useSharedValue<number[]>([]);
  const totalValue = useSharedValue(0);

  const array = Array.from({ length: data.length });
  const innerRadius = radius - outerStrokeWidth / 2;

  let total = data.reduce((sum, item) => sum + item.value, 0);
  totalValue.value = withTiming(total, { duration: 1000 });

  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius);

  const targetText = useDerivedValue(
    () => `${totalValueSymbol}${Math.round(totalValue.value)}`,
    []
  );

  const fontSize = font ? font.measureText('$00') : { width: 0, height: 0 };
  const textX = useDerivedValue(() => {
    if (!font) return 0;
    const measuredText = font.measureText(targetText.value);
    return radius - measuredText.width / 2;
  }, []);

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

  if (!font) return null;

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

        {/* Total value text display */}
        {displayTotalValue && (
          <Text
            x={textX}
            y={radius + fontSize.height / 3}
            text={targetText}
            font={font}
            color={totalValueColor}
          />
        )}
      </Canvas>
    </View>
  );
};
