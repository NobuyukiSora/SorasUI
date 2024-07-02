import * as React from 'react';
import { TextInput } from 'react-native-paper';
import type { PropsTextInput } from './props';
import { StyleSheet } from 'react-native';

const TextInputField: React.FunctionComponent<PropsTextInput> = (props) => {
  const { title, value, placeHolder, onTextChange = () => {} } = props;

  return (
    <TextInput
      label={title}
      value={value}
      onChangeText={(text) => onTextChange(text)}
      placeholder={placeHolder}
      mode="outlined"
      style={[{}]}
      activeOutlineColor="red"
      outlineStyle={Styles.outlineStyle}
      textColor="green"
    ></TextInput>
  );
};

const Styles = StyleSheet.create({
  outlineStyle: {
    borderRadius: 10,
    borderColor: 'blue',
  },
});

export default TextInputField;
