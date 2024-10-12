import { View } from 'react-native';
import { Button, Modal } from '../../../src/components';
import React, { useState } from 'react';
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
      <Modal
        type="center"
        isPopUp={modalVisibleCenter}
        onPressClose={getModalVisibleCenter}
        title="Test"
      />
      <Button
        title="Modal Trigger bottom"
        onPress={() => getModalVisibleBottom(!modalVisibleBottom)}
        customStyleButton={{ marginBottom: Metrics[8] }}
      />
      <Modal
        type="bottom"
        isPopUp={modalVisibleBottom}
        onPressClose={getModalVisibleBottom}
        title="Test"
      />
    </View>
  );
};
