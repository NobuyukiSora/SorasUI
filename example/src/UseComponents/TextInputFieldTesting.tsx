import * as React from 'react';
import { View } from 'react-native';
// import { multiply } from 'sora-ui';
import { TextInputField, Typograph } from '../../../src/components';

export const TextInputFieldTesting = () => {
  const [inputedText, setInputedText] = React.useState('');
  const [inputedTextn, setInputedTextn] = React.useState(0);

  // React.useEffect(() => {
  //   console.log(inputedTextn, inputedText);
  // }, [inputedTextn, inputedText]);

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
        onTextChange={(set) => setInputedTextn(Number(set))}
        placeHolder="insert your text"
        value={inputedTextn}
      ></TextInputField>
    </View>
  );
};
