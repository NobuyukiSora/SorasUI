import * as React from 'react';
import { TextInput } from 'react-native-paper';
import type { PropsTextInput } from './props';
import { StyleSheet } from 'react-native';
import { themeColors } from '../../theme/themeManagement';

const TextInputField: React.FunctionComponent<PropsTextInput> = (props) => {
  const {
    title,
    value,
    placeHolder,
    onTextChange = () => {},
    customStyle = { backgroundColor: themeColors.background },
    editable = true,
    textAlign = 'left',
    textColor = themeColors.text,
    activeOutlineColor = themeColors.text,
    inactiveOutlineColor = themeColors.inActive,
    placeholderTextColor = themeColors.textThird,
  } = props;

  return (
    <TextInput
      label={title}
      value={value}
      onChangeText={(text) => onTextChange(text)}
      placeholder={placeHolder}
      multiline={true}
      editable={editable}
      textAlign={textAlign}
      // Styling
      mode="outlined"
      activeOutlineColor={activeOutlineColor}
      outlineStyle={[
        Styles.outlineStyle,
        { borderColor: inactiveOutlineColor },
      ]}
      textColor={textColor}
      style={customStyle}
      placeholderTextColor={placeholderTextColor}
      theme={{ colors: { onSurfaceVariant: themeColors.text } }}
    />
  );
};

const Styles = StyleSheet.create({
  outlineStyle: {
    borderRadius: 10,
  },
});

export default TextInputField;
