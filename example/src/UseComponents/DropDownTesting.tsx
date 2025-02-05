import React, { useState } from 'react';
import { View } from 'react-native';
import { DropDown, Typograph } from '../../../src/components';

export const DropDownTesting = () => {
  const [selectedDropDown, setSelectedDropDown] = useState();

  return (
    <View>
      <Typograph>{selectedDropDown}</Typograph>
      <DropDown
        title="Select option"
        value={false}
        options={[
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
          { label: 'Option 3', value: 'option3' },
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
          { label: 'Option 3', value: 'option3' },
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
          { label: 'Option 3', value: 'option3' },
        ]}
        onSelect={(set) => setSelectedDropDown(set)}
      ></DropDown>
    </View>
  );
};
