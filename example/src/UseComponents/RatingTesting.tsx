import React, { useState } from 'react';
import { View } from 'react-native';
import { Rating, Typograph } from '../../../src/components';

export const RatingTesting = () => {
  const [value, setValue] = useState(4);
  return (
    <View>
      <Typograph>{value}</Typograph>
      <Rating onChange={(value) => setValue(value)} />
      <Rating
        value={value}
        disable={true}
        customIconActive={<Typograph>{'OK'}</Typograph>}
        customIconInactive={<Typograph>{'X'}</Typograph>}
      />
    </View>
  );
};
