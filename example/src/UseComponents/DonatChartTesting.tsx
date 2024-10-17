import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, DonutChart } from '../../../src/components';

interface DataSegment {
  number: number;
  color: string;
}

export const DonatChartTesting = () => {
  const [data, setData] = useState<DataSegment[]>([
    { number: 30, color: 'red' },
    { number: 10, color: 'yellow' },
    { number: 20, color: 'blue' },
    { number: 40, color: 'green' },
  ]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const generateRandomPercentages = () => {
    let remainingPercentage = 100;
    const newData = data.map((segment, index) => {
      const maxPercentage = remainingPercentage - (data.length - index - 1);
      const randomPercentage = Math.floor(Math.random() * maxPercentage) + 1;
      remainingPercentage -= randomPercentage;
      return { ...segment, number: randomPercentage };
    });

    setData(newData);
  };

  return (
    <View style={{ flex: 1 }}>
      <Button
        title={'random number'}
        onPress={() => generateRandomPercentages()}
      />
      <DonutChart radius={100} strokeWidth={20} data={data} />
    </View>
  );
};
