import { View } from 'react-native';
import { Button, Modal } from '../../../src/components';
import React, { useState } from 'react';

export const ModalTesting = () => {
  const [modalVisible, getModalVisible] = useState(false);
  return (
    <View>
      <Button
        title="Modal Trigger"
        onPress={() => getModalVisible(!modalVisible)}
      />
      <Modal
        type="center"
        isPopUp={modalVisible}
        onPressClose={getModalVisible}
        title="kjnajsdn"
      />
    </View>
  );
};
