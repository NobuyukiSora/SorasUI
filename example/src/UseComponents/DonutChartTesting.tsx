import { View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, DonutChart, TextInputField } from '../../../src/components';
import { Metrics } from '../../../src/theme';

type DataItem = {
  number: number;
  color: string;
};

export const DonutChartTesting = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [manyData, setManyData] = useState(6);

  const getRandomNumber = useCallback(() => {
    const newData = [];
    for (let i = 0; i < manyData; i++) {
      newData.push({ number: Math.random() * 100, color: getRandomColor() });
    }
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
      <DonutChart data={data} radius={100} strokeWidth={40} showTotal={false} />
    </View>
  );
};
