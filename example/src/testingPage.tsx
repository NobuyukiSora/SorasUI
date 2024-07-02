import * as React from 'react';

import { StyleSheet, View, Text, Switch, ScrollView } from 'react-native';
import { TextInputField } from '../../src/components/navigatorComponents';
import { Metrics, useTheme } from '../../src/theme/navigatorTheme';
import { multiply } from 'sora-ui';
import { themeColors } from '../../src/theme/themeManagement';

export default function Testing() {
  const [result, setResult] = React.useState<number | undefined>();
  const [inputedText, setInputedText] = React.useState('');
  let { theme, customColors, toggleTheme } = useTheme();

  customColors({
    background: theme.isDark ? 'red' : 'blue',
    text: theme.isDark ? 'white' : 'black',
    line: theme.isDark ? 'black' : 'white',
  });

  React.useEffect(() => {
    multiply(3, 7).then(setResult);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <ScrollView>
        {/* TEXT INPUT */}
        <View style={styles.box}>
          <Text style={styles.title}>{'TEXT INPUT'}</Text>
          <Text>{`Input: ${inputedText}`}</Text>
          <TextInputField
            title="Text"
            onTextChange={(set) => setInputedText(set)}
          ></TextInputField>
        </View>

        {/* THEME SWITCH */}
        <View style={styles.box}>
          <Text style={styles.title}>{'THEME SWITCH'}</Text>
          <Text>{`isDarkMode: ${theme.isDark}`}</Text>
          <Switch
            value={theme.isDark}
            onValueChange={() => toggleTheme(theme.isDark)}
          />
          <View
            style={{
              width: 100,
              height: 100,
              backgroundColor: themeColors.background,
            }}
          ></View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    padding: Metrics[16],
    backgroundColor: 'grey',
    marginHorizontal: Metrics[16],
    borderRadius: Metrics[8],
    marginVertical: Metrics[8],
  },
  title: {
    textAlign: 'center',
    fontWeight: '800',
  },
});
