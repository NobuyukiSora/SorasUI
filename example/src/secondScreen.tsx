import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInputField } from '../../src/components';

export const SecondScreen = () => {
  const [inputedText, setInputedText] = React.useState('');
  return (
    <View style={styles.container}>
      <TextInputField
        title="Text"
        onTextChange={(set) => setInputedText(set)}
        placeHolder="insert your text"
        value={inputedText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginTop: 20,
    paddingHorizontal: 10,
  },
});
