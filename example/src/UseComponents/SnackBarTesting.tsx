import * as React from 'react';
import { View } from 'react-native';
import { Button } from '../../../src/components/Button';
// import { multiply } from 'sora-ui';

export const SnackBarTesting = () => {
  const [triggerSnackBar, isTriggerSnackBar] = React.useState(false);
  return (
    <View>
      <Button
        title={'Trigger'}
        onPress={() => isTriggerSnackBar(!triggerSnackBar)}
      />
    </View>
  );
};
