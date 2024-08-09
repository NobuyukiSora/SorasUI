import * as React from 'react';

import {
  // Image,
  ScrollView,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';
// import { multiply } from 'sora-ui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Button,
  CheckBox,
  DynamicScrollView,
  Header,
  InfinitScrolling,
  RadioButton,
  Typograph,
} from '../../src/components/navigatorComponents';
import { Metrics, useTheme } from '../../src/theme/navigatorTheme';
import { themeColors } from '../../src/theme/themeManagement';
import { CalendarTesting } from './UseComponents/CalendarTesting';
import { SnackBarTesting } from './UseComponents/SnackBarTesting';
import { TextInputFieldTesting } from './UseComponents/TextInputFieldTesting';
import { ThemeSwitchTesting } from './UseComponents/ThemeSwitchTesting';

export default function Testing() {
  const [buttonTest, setButtonTest] = React.useState(0);
  const [headerBack, setHeaderBack] = React.useState(0);
  const [checkBox, setCheckBox] = React.useState(false);

  const [valueViewScrollView, setValueViewScrollView] = React.useState(0);
  const [selectedRadioButton, setSelectedRadioButton] = React.useState({
    id: '000',
    title: 'Radio 0',
    value: 'radio 0',
  });

  const radioData = [
    { id: '001', title: 'Row', value: 'row' },
    { id: '002', title: 'Column', value: 'column' },
    { id: '003', title: 'Radio 3', value: 'radio 3' },
    { id: '004', title: 'Radio 4', value: 'radio 4' },
  ];

  const version = require('../../package.json').version;

  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  let { theme, customColors } = useTheme();

  const loopViewScrollView = () => {
    const views = [];
    for (let loop = 1; loop <= valueViewScrollView; loop++) {
      views.push(
        <View style={styles.boxScrollView}>
          <Typograph
            style={{
              color: themeColors.text,
              textAlign: 'center',
              fontSize: Metrics[24],
            }}
          >
            {loop}
          </Typograph>
        </View>
      );
    }
    return views;
  };

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
    boxScrollView: {
      backgroundColor: themeColors.active,
      height: 100,
      width: 100,
      margin: Metrics[2],
      borderRadius: Metrics[8],
      justifyContent: 'center',
    },
    switchThemeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: Metrics[2],
    },
  });

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <Header
        title="testing page"
        onPress={() => setHeaderBack(headerBack + 1)}
        // customButtonStyles={{backgroundColor: 'red'}}
        // icon={(
        // <View style={{ justifyContent: 'center', padding: Metrics[4] }}>
        //   <Image source={require('../assets/Ico.Back.png')} />
        // </View>
        // )}
      ></Header>

      <ScrollView contentContainerStyle={{ paddingBottom: Metrics[24] }}>
        <View style={styles.box}>
          <Typograph>{`Header back: ${headerBack}`}</Typograph>
        </View>

        {/* CALENDAR */}
        <View style={styles.box}>
          <Typograph customStyle={styles.title}>{'Calendar'}</Typograph>
          <CalendarTesting />
        </View>

        {/* TEXT INPUT */}
        <View style={styles.box}>
          <Typograph customStyle={styles.title}>{'TEXT INPUT'}</Typograph>
          <TextInputFieldTesting />
        </View>

        {/* THEME SWITCH */}
        <View style={styles.box}>
          <Typograph customStyle={styles.title}>{'THEME SWITCH'}</Typograph>
          <Typograph>{`systemTheme: ${colorScheme}`}</Typograph>
          <ThemeSwitchTesting />
        </View>

        {/* THEME SWITCH */}
        <View style={styles.box}>
          <Typograph customStyle={styles.title}>{'SnackBar'}</Typograph>
          <SnackBarTesting />
        </View>

        {/* BUTTON */}
        <View style={styles.box}>
          <Typograph customStyle={styles.title}>{'Button'}</Typograph>
          <Typograph>{`Button test: ${buttonTest}`}</Typograph>
          <Button
            title="Testing"
            onPress={() => {
              setButtonTest(buttonTest + 1);
              setValueViewScrollView(valueViewScrollView + 1);
            }}
            // customStyleButton={{backgroundColor: 'red'}}
          ></Button>
        </View>

        {/* CHECKBOX */}
        <View style={styles.box}>
          <Typograph customStyle={styles.title}>{'Check Box'}</Typograph>
          <Typograph>{`Checked: ${checkBox}`}</Typograph>
          <CheckBox
            title={'CheckBox'}
            value={checkBox}
            onPress={() => setCheckBox(!checkBox)}
            // icon={(
            //   <View style={{ justifyContent: 'center', padding: Metrics[4] }}>
            //     <Image source={require('../assets/Ico.Back.png')} />
            //   </View>
            //   )}
          ></CheckBox>
        </View>

        {/* RADIO BUTTON */}
        <View style={styles.box}>
          <Typograph customStyle={styles.title}>{'Radio Button'}</Typograph>
          <Typograph>{`Selected: ${selectedRadioButton.id}`}</Typograph>

          <RadioButton
            data={radioData}
            onPress={(set) => setSelectedRadioButton(set)}
            selectedId={selectedRadioButton.id}
            directionMode={{ direction: selectedRadioButton.value.toString() }}
            // icon={(
            //   <View style={{ justifyContent: 'center', padding: Metrics[4] }}>
            //     <Image source={require('../assets/Ico.Back.png')} />
            //   </View>
            //   )}
          ></RadioButton>
        </View>

        <View style={styles.box}>
          <Typograph customStyle={styles.title}>
            {'DaynamicScrollView'}
          </Typograph>
          <Typograph>{`Boxes: ${valueViewScrollView}`}</Typograph>
          <View style={{ marginBottom: Metrics[4], flexDirection: 'row' }}>
            <Button
              title="+"
              onPress={() => {
                setValueViewScrollView(valueViewScrollView + 1);
              }}
              customStyleButton={{
                height: 50,
                width: 50,
                marginHorizontal: Metrics[2],
                justifyContent: 'center',
                alignItems: 'center',
              }}
            ></Button>
            <Button
              title="-"
              onPress={() => {
                setValueViewScrollView(valueViewScrollView - 1);
              }}
              customStyleButton={{
                height: 50,
                width: 50,
                marginHorizontal: Metrics[2],
                justifyContent: 'center',
                alignItems: 'center',
              }}
            ></Button>
          </View>

          <DynamicScrollView directionMode={{ direction: 'row' }}>
            {loopViewScrollView()}
          </DynamicScrollView>
        </View>

        {/* InfinityScrolling */}
        <View style={styles.box}>
          <Typograph customStyle={styles.title}>{'Radio Button'}</Typograph>
          <Typograph>{`Selected: ${selectedRadioButton.id}`}</Typograph>

          <InfinitScrolling width={Metrics.screenWidth}>
            <View style={{ flexDirection: 'row' }}>
              <Typograph>{` Soras-UI ${version} `}</Typograph>
              <Typograph>{` Soras-UI ${version} `}</Typograph>
              <Typograph>{` Soras-UI ${version} `}</Typograph>
              <Typograph>{` Soras-UI ${version} `}</Typograph>
            </View>
          </InfinitScrolling>
          <View style={{ flexDirection: 'row' }}>
            <Typograph>{` Soras-UI ${version} `}</Typograph>
            <Typograph>{` Soras-UI ${version} `}</Typograph>
            <Typograph>{` Soras-UI ${version} `}</Typograph>
            <Typograph>{` Soras-UI ${version} `}</Typograph>
          </View>
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
