import * as React from 'react';
import {
  Modal as RNModal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '../../theme/colors';
import { Metrics } from '../../theme/metrics';
import { themeColors } from '../../theme/themeManagement';
import { propsModal } from './props';
import { Typograph } from '../Typograph';
import { Button } from '../Button';

export const Modal: React.FunctionComponent<propsModal> = (props) => {
  const {
    title,
    onPressClose = () => {},
    customStyleModal = {},
    type = 'bottom',
    isPopUp = false,
    children,
    ...rest
  } = props;

  const styles = StyleSheet.create({
    title: {
      fontWeight: '800',
      textAlign: 'center',
      color: Colors.black,
    },
    absoluteBack: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    bottomstyle: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    centerStyle: {
      borderRadius: Metrics[12],
    },
    customButton: {
      position: 'absolute',
      padding: Metrics[8],
      right: 0,
      margin: Metrics[12],
    },
    containerBottom: {
      borderTopLeftRadius: Metrics[12],
      borderTopRightRadius: Metrics[12],
    },
    containerCenter: {
      borderTopLeftRadius: Metrics[12],
      borderTopRightRadius: Metrics[12],
    },
  });

  return (
    <RNModal
      visible={isPopUp}
      animationType="slide"
      transparent={true}
      {...rest}
    >
      <View
        style={[type === 'bottom' ? styles.bottomstyle : styles.centerStyle]}
      >
        <TouchableOpacity
          style={styles.absoluteBack}
          onPress={() => onPressClose(!isPopUp)}
        />
        {/* <BlurView
        style={styles.absolute}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      /> */}
        <View
          style={[
            type === 'bottom' ? styles.containerBottom : styles.containerCenter,
            {
              height: 100,
              width: Metrics.screenWidth,
              backgroundColor: themeColors.backgroundSecondary,
            },
            customStyleModal,
          ]}
        >
          <View style={{ paddingTop: Metrics[16] }}>
            <Typograph style={styles.title}>{title}</Typograph>
            <Button
              title="X"
              onPress={() => onPressClose(!isPopUp)}
              customStyleButton={styles.customButton}
            ></Button>
          </View>
          {children}
        </View>
      </View>
    </RNModal>
  );
};
