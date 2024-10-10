import * as React from 'react';
import {
  Modal as RNModal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Metrics } from '../../theme/metrics';
import { themeColors } from '../../theme/themeManagement';
import { Button } from '../Button';
import { Typograph } from '../Typograph';
import { propsModal } from './props';

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
      color: themeColors.text,
    },
    absoluteBack: {
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
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
      flex: 1,
      justifyContent: 'center',
      alignContent: 'center',
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
      width: Metrics.screenWidth,
    },
    containerCenter: {
      borderRadius: Metrics[12],
      margin: Metrics[16],
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
        <View
          style={[
            type === 'bottom' ? styles.containerBottom : styles.containerCenter,
            {
              backgroundColor: themeColors.backgroundSecondary,
            },
            customStyleModal,
          ]}
        >
          <View style={{ paddingTop: Metrics[16], height: 60 }}>
            <Typograph style={styles.title}>{title}</Typograph>
            <Button
              title="X"
              onPress={() => onPressClose(!isPopUp)}
              customStyleButton={styles.customButton}
            ></Button>
          </View>
          <View>
            <Typograph>{'sdadasda'}</Typograph>
          </View>
          {children}
        </View>
      </View>
    </RNModal>
  );
};
