import React from 'react';
import { View } from 'react-native';
import { RadioButton, Switch, Typograph } from '../../../src/components';
import { useVibration } from '../../../src/theme/vibrationManagement';

export const VibrationTesting = () => {
  const {
    toggleVibration,
    setVibrationDuration,
    isVibrationEnabled,
    vibrationDuration,
  } = useVibration();
  return (
    <View>
      <Typograph>{`isVibrationEnabled: ${isVibrationEnabled}`}</Typograph>
      <Typograph>{`vibrationDuration: ${vibrationDuration}`}</Typograph>

      <RadioButton
        directionMode={{ direction: 'row' }}
        data={[
          { id: '1', title: '50ms', value: '50' },
          { id: '2', title: '100ms', value: '100' },
          { id: '3', title: '500ms', value: '500' },
          { id: '4', title: '1000ms', value: '1000' },
        ]}
        onPress={(set) => setVibrationDuration(Number(set.value))}
        selectedId={1}
      />
      <Switch value={isVibrationEnabled} onPress={() => toggleVibration()} />
    </View>
  );
};
