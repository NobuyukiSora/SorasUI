import React, { useState } from 'react';
import { View } from 'react-native';
import { Rating, Typograph } from '../../../src/components';

export const RatingTesting = () => {
  const [value, setValue] = useState(4);
  return (
    <View>
      <Typograph customStyle={{ fontWeight: '800' }}>{`Input mode`}</Typograph>
      <Typograph>{`The rating: ${value}`}</Typograph>
      <Rating onChange={(value) => setValue(value)} />
      <Typograph customStyle={{ textAlign: 'center', fontWeight: '800' }}>
        {'Customize'}
      </Typograph>
      <Rating
        value={value}
        disable={true}
        customIconActive={
          <Typograph
            style={{ textAlign: 'center', fontWeight: '900', color: 'white' }}
          >
            {'X'}
          </Typograph>
        }
        customIconInactive={
          <Typograph
            style={{ textAlign: 'center', fontWeight: '900', color: 'white' }}
          >
            {'-'}
          </Typograph>
        }
      />
      <Typograph
        customStyle={{ fontWeight: '800' }}
      >{`Disable input mode`}</Typograph>
      <Rating value={3.5} disable={true} />
    </View>
  );
};
