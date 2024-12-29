import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInputSingleBox, Typograph } from '../../../src/components';
import { Metrics } from '../../../src/theme';

export const TextInputSingleBoxTesting = () => {
  const [code, setCode] = useState();
  const [code2, setCode2] = useState();
  return (
    <View>
      <Typograph>{`${code}`}</Typograph>
      <TextInputSingleBox
        onChange={(set) => setCode(set)}
        type="string"
        length={5}
        customTextinputStyles={{ fontSize: Metrics[16] }}
      />

      <Typograph
        customStyle={{ textAlign: 'center', fontWeight: '800' }}
      >{`Customize`}</Typograph>

      <Typograph>{`${code2}`}</Typograph>

      <TextInputSingleBox
        onChange={(set) => setCode2(set)}
        type="string"
        length={6}
        height={50}
        width={50}
        customTextinputStyles={{ fontSize: Metrics[16] }}
      />
    </View>
  );
};
