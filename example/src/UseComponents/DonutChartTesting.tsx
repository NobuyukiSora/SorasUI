import { View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, DonutChart, TextInputField } from '../../../src/components';
import { Metrics, themeColors } from '../../../src/theme';
import { useFont } from '@shopify/react-native-skia';

type DataItem = {
  color: string;
  value: number;
  percentage: number;
};

export const DonutChartTesting = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [manyData, setManyData] = useState(6);
  const font = useFont(require('./Roboto-Bold.ttf'), 20);

  const getRandomNumber = useCallback(() => {
    const newValue: number[] = [];
    let totalValue = 0;

    for (let i = 0; i < manyData; i++) {
      const randomNumber = Math.random() * 100;
      newValue.push(randomNumber);
      totalValue += randomNumber;
    }

    const newData: DataItem[] = newValue.map((number) => ({
      value: number,
      color: getRandomColor(),
      percentage: (number / totalValue) * 100,
    }));

    setData(newData);
  }, [manyData]);

  useEffect(() => {
    getRandomNumber();
  }, [getRandomNumber]);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  if (!font) return null;

  return (
    <View>
      <View
        style={{ flexDirection: 'row', alignItems: 'center', gap: Metrics[12] }}
      >
        <TextInputField
          title="Many Data"
          value={manyData.toString()}
          onTextChange={(set) => setManyData(Number(set))}
          customContainerStyles={{ flex: 1 }}
          keyboardType="numeric"
        />
        <Button onPress={() => getRandomNumber()} title="Refresh" />
      </View>
      <DonutChart
        gap={0.07}
        radius={80}
        strokeWidth={20}
        outerStrokeWidth={30}
        font={font}
        data={data}
        outerStrokColor={themeColors.background}
        totalValueSymbol="Rp"
        totalValueColor={themeColors.text}
      />
    </View>
  );
};
