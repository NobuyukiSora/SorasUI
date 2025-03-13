import React, { useState } from 'react';
import { View } from 'react-native';
import { Button } from '../../../src/components';
import { Metrics } from '../../../src/theme';

export const ModalTesting = () => {
  const [modalVisibleCenter, getModalVisibleCenter] = useState(false);
  const [modalVisibleBottom, getModalVisibleBottom] = useState(false);

  return (
    <View>
      <Button
        title="Modal Trigger center"
        onPress={() => getModalVisibleCenter(!modalVisibleCenter)}
        customStyleButton={{ marginBottom: Metrics[8] }}
      />
      <Button
        title="Modal Trigger bottom"
        onPress={() => getModalVisibleBottom(!modalVisibleBottom)}
        customStyleButton={{ marginBottom: Metrics[8] }}
      />
    </View>
  );
};
