import * as React from 'react';
import { View } from 'react-native';
import { Button } from '../../../src/components/Button';
import { useTrigger } from '../../../src/components/SnackBar/trigger';

export const SnackBarTesting = () => {
  const { trigger, setSnackBarType, setSnackBarTitle } = useTrigger();
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Button
        title={'Success'}
        onPress={() => {
          setSnackBarType('success');
          setSnackBarTitle('Testing Success');
          trigger();
        }}
      />
      <Button
        title={'Warning'}
        onPress={() => {
          setSnackBarType('warning');
          setSnackBarTitle('Testing Warning');
          trigger();
        }}
      />
      <Button
        title={'Error'}
        onPress={() => {
          setSnackBarType('error');
          setSnackBarTitle('Testing Error');
          trigger();
        }}
      />
    </View>
  );
};
