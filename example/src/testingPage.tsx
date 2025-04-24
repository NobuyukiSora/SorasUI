import * as React from 'react';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScrollView, StyleSheet, View, useColorScheme } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Button,
  CheckBox,
  DynamicScrollView,
  Header,
  Modal,
  RadioButton,
  Typograph,
} from '../../src/components';
import { Metrics, useTheme } from '../../src/theme';
import { themeColors } from '../../src/theme/themeManagement';
import { CalendarTesting } from './UseComponents/CalendarTesting';
import { CarouselTesting } from './UseComponents/CarouselTesting';
import { DonutChartTesting } from './UseComponents/DonutChartTesting';
import { DropDownTesting } from './UseComponents/DropDownTesting';
import { ExpandibleViewTesting } from './UseComponents/ExpandibleViewTesting';
import { RatingTesting } from './UseComponents/RatingTesting';
import { SkeletonLoaderTesting } from './UseComponents/SkeletonLoaderTesting';
import { SnackBarTesting } from './UseComponents/SnackBarTesting';
import { TextInputFieldTesting } from './UseComponents/TextInputFieldTesting';
import { TextInputSingleBoxTesting } from './UseComponents/TextInputSingleBoxTesting';
import { ThemeSwitchTesting } from './UseComponents/ThemeSwitchTesting';
import { VibrationTesting } from './UseComponents/VibrationTesting';

type RootStackParamList = {
  Home: undefined;
  secondScreen: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

export default function Testing({ navigation }: Props) {
  const [modalVisibleCenter, getModalVisibleCenter] = React.useState(false);
  const [modalVisibleBottom, getModalVisibleBottom] = React.useState(false);
  const [buttonTest, setButtonTest] = React.useState(0);
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

  // const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  let { theme, customColors } = useTheme();

  const loopViewScrollView = () => {
    const views = [];
    for (let loop = 1; loop <= valueViewScrollView; loop++) {
      views.push(
        <View style={styles.boxScrollView} key={loop}>
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
      // paddingTop: insets.top,
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
      {/* HEADER - 1.0.0 */}
      <Header
        title="testing page"
        onPress={() => navigation.navigate('secondScreen')}
        // customButtonStyles={{backgroundColor: 'red'}}
        // icon={(
        // <View style={{ justifyContent: 'center', padding: Metrics[4] }}>
        //   <Image source={require('../assets/Ico.Back.png')} />
        // </View>
        // )}
      ></Header>

      <ScrollView contentContainerStyle={{ paddingBottom: Metrics[24] }}>
        <View style={styles.box}></View>

        {/* BUTTON - 1.0.0 */}
        <View style={styles.box}>
          <Typograph customStyle={styles.title}>{'Button'}</Typograph>
          <Typograph>{`Button test: ${buttonTest}`}</Typograph>
          <Button
            title="Testing"
            onPress={() => {
              setButtonTest(buttonTest + 1);
              setValueViewScrollView(valueViewScrollView + 1);
            }}
          />
        </View>

        {/* CHECKBOX - 1.1.0 */}
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

        {/* CALENDAR */}
        <View style={styles.box}>
          <Typograph customStyle={styles.title}>{'Calendar'}</Typograph>
          <CalendarTesting />
        </View>

        {/* CAROUSEL */}
        <View style={[styles.box, { marginHorizontal: 0 }]}>
          <Typograph customStyle={styles.title}>{'Carousel'}</Typograph>
          <CarouselTesting />
        </View>

        {/* DONUT CHART */}
        <View style={styles.box}>
          <Typograph customStyle={styles.title}>{'DonutChart'}</Typograph>
          <DonutChartTesting />
        </View>

        {/* DROPDOWN */}
        <View style={[styles.box, { position: 'relative' }]}>
          <Typograph customStyle={styles.title}>{'DropDown'}</Typograph>
          <DropDownTesting />
        </View>

        {/* DYNAMIC SCROLL VIEW - 1.1.0 */}
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
                valueViewScrollView > 0 &&
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

          <DynamicScrollView direction="row">
            {loopViewScrollView()}
          </DynamicScrollView>
        </View>

        {/* EXPANDIBLE VIEW */}
        <View style={styles.box}>
          <Typograph customStyle={styles.title}>{'Expandible View'}</Typograph>
          <ExpandibleViewTesting />
        </View>

        {/* MODAL */}
        <View style={styles.box}>
          <Typograph customStyle={styles.title}>{'Modal'}</Typograph>
          <Button
            title="Modal Trigger center"
            onPress={() => getModalVisibleCenter(!modalVisibleCenter)}
            customStyleButton={{ marginBottom: Metrics[8] }}
          />
          <Button
            title="Modal Trigger bottom"
            onPress={() => getModalVisibleBottom(!modalVisibleBottom)}
            customStyleButton={{ marginBottom: Metrics[8] }}
          />
        </View>

        {/* RADIO BUTTON - 1.1.0 */}
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

        {/* RATING */}
        <View style={styles.box}>
          <Typograph customStyle={styles.title}>{'Rating'}</Typograph>
          <RatingTesting />
        </View>

        {/* TEXT INPUT - 1.0.0 */}
        <View style={styles.box}>
          <Typograph customStyle={styles.title}>{'Text Input Field'}</Typograph>
          <TextInputFieldTesting />
        </View>

        {/* TEXT INPUT SINGLE BOX TESTING */}
        <View style={styles.box}>
          <Typograph customStyle={styles.title}>
            {'TextInputSingleBoxTesting'}
          </Typograph>
          <TextInputSingleBoxTesting />
        </View>

        {/* SKELETON LOADER */}
        <View style={styles.box}>
          <Typograph customStyle={styles.title}>{'Skeleton Loader'}</Typograph>
          <SkeletonLoaderTesting />
        </View>

        {/* SNACK BAR */}
        <View style={styles.box}>
          <Typograph customStyle={styles.title}>{'SnackBar'}</Typograph>
          <SnackBarTesting />
        </View>

        {/* TOOL - 1.1.0 */}
        <View style={styles.box}>
          <Typograph customStyle={styles.title}>{'TOOL'}</Typograph>
          <View>
            <Typograph customStyle={{ fontWeight: '800' }}>
              {'- THEME SWITCH'}
            </Typograph>
            <Typograph>{`systemTheme: ${colorScheme}`}</Typograph>
            <ThemeSwitchTesting />
          </View>
          <View>
            <Typograph customStyle={{ fontWeight: '800' }}>
              {'- VIBRATION'}
            </Typograph>
            <VibrationTesting />
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

      <Modal
        type="center"
        isPopUp={modalVisibleCenter}
        onPressClose={() => getModalVisibleCenter(false)}
        title="Test"
      />
      <Modal
        type="bottom"
        isPopUp={modalVisibleBottom}
        onPressClose={() => getModalVisibleBottom(false)}
        title="Test"
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: 200,
            flex: 1,
          }}
        >
          <Typograph>{'Bottom'}</Typograph>
        </View>
      </Modal>
      {/* <ModalSheet
        type="center"
        isPopUp={modalSheetVisibleCenter}
        onPressClose={() => getModalSheetVisibleCenter(false)}
      >
        <Typograph>{'THIS IS MODAL SHEET CENTER'}</Typograph>
      </ModalSheet>
      <ModalSheet
        type="bottom"
        isPopUp={modalSheetVisibleBottom}
        onPressClose={() => getModalSheetVisibleBottom(false)}
      >
        <View
          style={{
            backgroundColor: themeColors.active,
            height: Metrics[50] * 3,
            width: Metrics.screenWidth * 0.8,
          }}
        >
          <Typograph>{'THIS IS MODAL SHEET BOTTOM'}</Typograph>
        </View>
      </ModalSheet> */}
    </View>
  );
}
