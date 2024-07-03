import * as React from 'react';

import {
  ScrollView,
  StyleSheet,
  Switch,
  View,
  useColorScheme,
} from 'react-native';
import { multiply } from 'sora-ui';
import {
  TextInputField,
  Typograph,
} from '../../src/components/navigatorComponents';
import { Metrics, useTheme } from '../../src/theme/navigatorTheme';
import { themeColors } from '../../src/theme/themeManagement';

export default function Testing() {
  const [result, setResult] = React.useState<number | undefined>();
  const [inputedText, setInputedText] = React.useState('');
  let { theme, customColors, toggleTheme, toggleSystemTheme } = useTheme();
  const colorScheme = useColorScheme();

  // Adding Custom Colors
  customColors({
    line: theme.isDark ? 'black' : 'white',
  });

  React.useEffect(() => {
    multiply(3, 7).then(setResult);
  }, []);

  return (
    <View
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      <Typograph>Result: {result}</Typograph>
      <ScrollView>
        {/* TEXT INPUT */}
        <View style={styles.box}>
          <Typograph customStyle={styles.title}>{'TEXT INPUT'}</Typograph>
          <Typograph
            customStyle={{ color: themeColors.text }}
          >{`Input: ${inputedText}`}</Typograph>
          <TextInputField
            title="Text"
            onTextChange={(set) => setInputedText(set)}
          ></TextInputField>
        </View>

        {/* THEME SWITCH */}
        <View style={styles.box}>
          <Typograph customStyle={styles.title}>{'THEME SWITCH'}</Typograph>
          <Typograph>{`systemTheme: ${colorScheme}`}</Typograph>
          <Typograph>{`sameAsSystem: ${theme.themeSameAsSystem}`}</Typograph>
          <Typograph>{`isDarkMode: ${theme.isDark}`}</Typograph>
          <Switch
            value={theme.themeSameAsSystem}
            onValueChange={() =>
              toggleSystemTheme(theme.themeSameAsSystem, colorScheme)
            }
          />

          <Switch
            value={theme.isDark}
            onValueChange={() => toggleTheme(theme.isDark)}
            disabled={theme.themeSameAsSystem}
          />

          <View
            style={{
              width: 100,
              height: 100,
              backgroundColor: themeColors.active,
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
    backgroundColor: themeColors.background,
  },
  box: {
    padding: Metrics[16],
    backgroundColor: themeColors.backgroundSecondary,
    marginHorizontal: Metrics[16],
    borderRadius: Metrics[8],
    marginVertical: Metrics[8],
  },
  title: {
    textAlign: 'center',
    fontWeight: '800',
  },
});
