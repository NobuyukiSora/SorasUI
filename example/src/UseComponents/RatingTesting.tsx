import React, { useState } from 'react';
import { View } from 'react-native';
import { Rating, Typograph } from '../../../src/components';

export const RatingTesting = () => {
  const [value, setValue] = useState(0);
  return (
    <View>
      <Typograph>{value}</Typograph>
      <Rating onChange={(value) => setValue(value)} value={4} />
    </View>
  );
};
