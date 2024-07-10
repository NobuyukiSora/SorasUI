import * as React from 'react';

import {
  // Image,
  ScrollView,
  StyleSheet,
  Switch,
  View,
  useColorScheme,
} from 'react-native';
// import { multiply } from 'sora-ui';
import {
  Button,
  TextInputField,
  Typograph,
  Header,
  CheckBox,
} from '../../src/components/navigatorComponents';
import { Metrics, useTheme } from '../../src/theme/navigatorTheme';
import { themeColors } from '../../src/theme/themeManagement';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Testing() {
  const [inputedText, setInputedText] = React.useState('');
  const [buttonTest, setButtonTest] = React.useState(0);
  const [headerBack, setHeaderBack] = React.useState(0);
  const [checkBox, setCheckBox] = React.useState(false);

  const version = require('../../package.json').version;

  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  let { theme, customColors, toggleTheme, toggleSystemTheme } = useTheme();

  // Adding Custom Colors
  customColors({
    line: theme.isDark ? 'black' : 'white',
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: insets.top,
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
    versionContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
        title="testing page"
        onPress={() => setHeaderBack(headerBack + 1)}
      >
        {/* <View style={{ justifyContent: 'center', padding: Metrics[4] }}>
          <Image source={require('../assets/Ico.Back.png')} />
        </View> */}
      </Header>

      <ScrollView contentContainerStyle={{ paddingBottom: Metrics[24] }}>
        <View style={styles.box}>
          <Typograph>{`Header back: ${headerBack}`}</Typograph>
        </View>

        {/* TEXT INPUT */}
        <View style={styles.box}>
          <Typograph customStyle={styles.title}>{'TEXT INPUT'}</Typograph>
          <Typograph>{`Input: ${inputedText}`}</Typograph>
          <TextInputField
            title="Text"
            onTextChange={(set) => setInputedText(set)}
            placeHolder="insert your text"
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

        {/* BUTTON */}
        <View style={styles.box}>
          <Typograph customStyle={styles.title}>{'Button'}</Typograph>
          <Typograph>{`Button test: ${buttonTest}`}</Typograph>
          <Button
            title="Testing"
            onPress={() => setButtonTest(buttonTest + 1)}
          ></Button>
        </View>

        {/* CheckBox */}
        <View style={styles.box}>
          <Typograph customStyle={styles.title}>{'Check Box'}</Typograph>
          <Typograph>{`Checked: ${checkBox}`}</Typograph>
          <CheckBox
            title={'CheckBox'}
            value={checkBox}
            onPress={() => setCheckBox(!checkBox)}
          >
            {/* <Image source={require('../assets/Ico.Back.png')} /> */}
          </CheckBox>
        </View>
        <View style={styles.versionContainer}>
          <Typograph
            style={{ textAlign: 'center', color: themeColors.textThird }}
          >
            {`Soras UI - Version ${version}`}
          </Typograph>
        </View>
      </ScrollView>
    </View>
  );
}
