import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import TextInputField from '../../src/TextInputField/index';
import { multiply } from 'sora-ui';

export default function App() {
  const [result, setResult] = React.useState<number | undefined>();
  const [inputedText, setInputedText] = React.useState('');

  React.useEffect(() => {
    multiply(3, 7).then(setResult);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <Text>{inputedText}</Text>
      <TextInputField
        title="Text"
        onTextChange={(set) => setInputedText(set)}
      ></TextInputField>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
