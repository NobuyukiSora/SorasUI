import * as React from 'react';
import { View } from 'react-native';
// import { multiply } from 'sora-ui';
import { TextInputField, Typograph } from '../../../src/components';

export const TextInputFieldTesting = () => {
  const [inputedText, setInputedText] = React.useState('');

  return (
    <View>
      <Typograph>{`Input: ${inputedText}`}</Typograph>
      <TextInputField
        title="Text"
        onTextChange={(set) => setInputedText(set)}
        placeHolder="insert your text"
        value={inputedText}
        // customContainerStyles={{backgroundColor: 'red'}}
      ></TextInputField>
      <TextInputField
        title="Text"
        onTextChange={(set) => setInputedText(set)}
        placeHolder="insert your text"
        value={inputedText}
      ></TextInputField>
    </View>
  );
};
