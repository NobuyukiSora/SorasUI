import React, { useState } from 'react';
import { View } from 'react-native';
import { DropDown, Typograph } from '../../../src/components';

export const DropDownTesting = () => {
  const [selectedDropDown, setSelectedDropDown] = useState();
  const [selectedDropDownCalendar, setSelectedDropDownCalendar] = useState();
  const [selectedDropDownCalendar2, setSelectedDropDownCalendar2] = useState();

  return (
    <View>
      <Typograph>{selectedDropDown}</Typograph>
      <DropDown
        title="Select option"
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
      />
      <Typograph>{selectedDropDownCalendar}</Typograph>
      <DropDown
        mode="calendar"
        onSelect={(set) => setSelectedDropDownCalendar(set)}
        title="Select date"
      />
      <Typograph>{selectedDropDownCalendar2}</Typograph>
      <DropDown
        value="2025-02-01"
        mode="calendar"
        onSelect={(set) => setSelectedDropDownCalendar2(set)}
        title="Select date"
      />
    </View>
  );
};
