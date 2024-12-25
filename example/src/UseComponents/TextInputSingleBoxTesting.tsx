import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInputSingleBox, Typograph } from '../../../src/components';
import { Metrics } from '../../../src/theme';

export const TextInputSingleBoxTesting = () => {
  const [code, setCode] = useState();
  return (
    <View>
      <Typograph>{`${code}`}</Typograph>
      <TextInputSingleBox
        onChange={(set) => setCode(set)}
        type="string"
        length={5}
        customTextinputStyles={{ fontSize: Metrics[16] }}
      />

      <TextInputSingleBox
        onChange={(set) => setCode(set)}
        type="string"
        length={5}
        height={100}
        width={50}
        customTextinputStyles={{ fontSize: Metrics[16] }}
      />
    </View>
  );
};
