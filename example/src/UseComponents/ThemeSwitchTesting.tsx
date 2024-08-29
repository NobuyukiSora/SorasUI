import * as React from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
// import { multiply } from 'sora-ui';
import { Switch, Typograph } from '../../../src/components';
import { Metrics, useTheme } from '../../../src/theme';

export const ThemeSwitchTesting = () => {
  const colorScheme = useColorScheme();
  let { theme, toggleTheme, toggleSystemTheme } = useTheme();

  const styles = StyleSheet.create({
    switchThemeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: Metrics[2],
    },
  });

  return (
    <View>
      <Typograph>{`systemTheme: ${colorScheme}`}</Typograph>
      <View style={styles.switchThemeContainer}>
        <Typograph>{`sameAsSystem: ${theme.themeSameAsSystem}`}</Typograph>
        <Switch
          value={theme.themeSameAsSystem}
          onPress={() =>
            toggleSystemTheme(theme.themeSameAsSystem, colorScheme)
          }
        />
      </View>
      <View style={styles.switchThemeContainer}>
        <Typograph>{`isDarkMode: ${theme.isDark}`}</Typograph>
        <Switch
          value={theme.isDark}
          onPress={() => toggleTheme(theme.isDark)}
          disabled={theme.themeSameAsSystem}
        />
      </View>
    </View>
  );
};
