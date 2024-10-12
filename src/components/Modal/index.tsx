import * as React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../theme';
import { Metrics } from '../../theme/metrics';
import { themeColors, useTheme } from '../../theme/themeManagement';
import { Button } from '../Button';
import { Typograph } from '../Typograph';
import { propsModal } from './props';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const Modal: React.FunctionComponent<propsModal> = (props) => {
  const {
    title,
    onPressClose = () => {},
    customStyleModal = {},
    type = 'bottom',
    isPopUp = false,
    children,
    customHeader,
    ...rest
  } = props;

  const { theme } = useTheme();

  const translateY = useSharedValue(-100);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  React.useEffect(() => {
    translateY.value = withTiming(isPopUp ? 0 : Metrics.screenHeight * 2, {
      duration: 500,
    });
  }, [isPopUp, translateY]);

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
      top: 0,
      justifyContent: 'center',
      alignContent: 'center',
    },
    customButton: {
      position: 'absolute',
      padding: Metrics[8],
      right: 0,
      margin: Metrics[8],
    },
    containerBottom: {
      borderTopLeftRadius: Metrics[12],
      borderTopRightRadius: Metrics[12],
      marginHorizontal: Metrics[16],
    },
    containerCenter: {
      borderRadius: Metrics[12],
      margin: Metrics[16],
    },
    modalContainerIOS: {
      shadowColor: theme.isDark ? Colors.darkBlue : Colors.grey,
      shadowOffset: { width: 0, height: -10 },
      shadowOpacity: 0.5,
      shadowRadius: 50,
      marginHorizontal: Metrics[8],
    },
    modalContainerAndroid: {
      borderTopWidth: 2,
      borderRightWidth: 2,
      borderLeftWidth: 2,
      borderBottomWidth: type === 'center' ? 2 : 0,
      borderColor: themeColors.inActive,
    },
  });

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          zIndex: 10,
          right: 0,
          left: 0,
          position: 'absolute',
          bottom: 0,
        },
        type === 'center' && styles.centerStyle,
      ]}
      {...rest}
    >
      {type === 'center' && (
        <TouchableOpacity
          style={styles.absoluteBack}
          onPress={() => onPressClose(false)}
        />
      )}
      <View
        style={[
          type === 'bottom' ? styles.containerBottom : styles.containerCenter,
          {
            backgroundColor: themeColors.backgroundSecondary,
          },
          Platform.OS == 'ios'
            ? styles.modalContainerIOS
            : styles.modalContainerAndroid,
          customStyleModal,
        ]}
      >
        {customHeader ? (
          customHeader
        ) : (
          <View style={{ height: 50, justifyContent: 'center' }}>
            <Typograph style={styles.title}>{title}</Typograph>
            <Button
              title="X"
              onPress={() => onPressClose(false)}
              customStyleButton={styles.customButton}
            ></Button>
          </View>
        )}
        <View>{children}</View>
      </View>
    </Animated.View>
  );
};