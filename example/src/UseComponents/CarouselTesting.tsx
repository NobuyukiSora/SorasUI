import React from 'react';
import { View } from 'react-native';
import { Carousel, Typograph } from '../../../src/components';
import { Metrics } from '../../../src/theme';

export const CarouselTesting = () => {
  const count = () => {
    console.log('run count');
  };

  const data = [
    {
      id: '1',
      image: 'https://via.placeholder.com/300x200',
      onPress: () => count(),
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

  const duration = 3000;

  return (
    <View
      style={{
        alignItems: 'center',
      }}
    >
      <Carousel data={data} duration={duration} />
      <Typograph customStyle={{ marginTop: Metrics[8], fontWeight: '800' }}>
        {'Customize'}
      </Typograph>
      <Carousel
        data={data}
        duration={duration}
        overflow="hidden"
        width={300}
        activeDotColor={'purple'}
        inactiveDotColor={'grey'}
      />
    </View>
  );
};
