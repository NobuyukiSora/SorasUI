import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import IconClose from '../../Icon/Ico-Close.svg';
import IconCloseBold from '../../Icon/Ico-CloseBold.svg';
import IconSuccess from '../../Icon/Ico-Success.svg';
import IconUndo from '../../Icon/Ico-Undo.svg';
import IconWarning from '../../Icon/Ico-Warning.svg';
import { Colors } from '../../theme/colors';
import { Metrics } from '../../theme/metrics';
import { themeColors, useTheme } from '../../theme/themeManagement';
import { Typograph } from '../Typograph';
import { PropsSnackBar } from './props';
import { useTrigger } from './trigger';

export const SnackBar: React.FunctionComponent<PropsSnackBar> = (props) => {
  const {
    delay = 4000,
    animatedHeight = 100,
    undoButton = false,
    onUndo = () => {},
    onClose = () => {},
    ...rest
  } = props;
  const { theme } = useTheme();
  const { setTrigger, snackBarType, snackBarTitle } = useTrigger();
  const springValue = useSharedValue(0);
  const opacityValue = useSharedValue(0);

  const animatedSnackBar = useAnimatedStyle(() => ({
    transform: [{ translateY: springValue.value }],
    opacity: opacityValue.value,
  }));

  const isTriggeredClose = React.useCallback(() => {
    springValue.value = withSpring(0, {
      stiffness: 50,
      damping: 10,
      mass: 1,
    });
    setTimeout(() => {
      opacityValue.value = withTiming(0, { duration: 200 });
    }, 100);
  }, [springValue, opacityValue]);

  const isTriggered = React.useCallback(() => {
    springValue.value = withSpring(animatedHeight - animatedHeight * 2);
    opacityValue.value = withTiming(1, { duration: 400 });
    setTimeout(() => {
      isTriggeredClose();
    }, delay);
  }, [animatedHeight, delay, isTriggeredClose, springValue, opacityValue]);

  React.useEffect(() => {
    setTrigger(() => isTriggered);
  }, [setTrigger, isTriggered]);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme?.isDark ? Colors.darkGrey : Colors.cream,
      marginHorizontal: Metrics[8],
      minHeight: 50,
      borderRadius: Metrics[8],
      paddingHorizontal: Metrics[12],
      flexDirection: 'row',
      justifyContent: 'space-between',
      position: 'absolute',
      bottom: -50,
      right: 0,
      left: 0,
    },
    IconBox: {
      minHeight: 50,
      width: 50,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Metrics[16],
    },
    centerItem: {
      paddingVertical: Metrics[8],
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      flex: 1,
    },
    text: {
      flexWrap: 'wrap',
      maxWidth: '100%',
      color: theme?.isDark ? Colors.lightCream : Colors.black,
    },
  });

  const getIcon = () => {
    switch (snackBarType) {
      case 'success':
        return (
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <View style={[styles.IconBox, { backgroundColor: Colors.green }]}>
              <IconSuccess fill={Colors.lightGreen} />
            </View>
            <View style={styles.centerItem}>
              <Typograph style={styles.text}>{snackBarTitle}</Typograph>
            </View>
          </View>
        );
      case 'warning':
        return (
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <View
              style={[styles.IconBox, { backgroundColor: Colors.darkCream }]}
            >
              <IconWarning fill={Colors.yellow} />
            </View>
            <View style={styles.centerItem}>
              <Typograph style={styles.text}>{snackBarTitle}</Typograph>
            </View>
          </View>
        );
      case 'error':
        return (
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <View style={[styles.IconBox, { backgroundColor: Colors.pink }]}>
              <IconCloseBold fill={Colors.red} />
            </View>
            <View style={styles.centerItem}>
              <Typograph style={styles.text}>{snackBarTitle}</Typograph>
            </View>
          </View>
        );
      default:
        return (
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.centerItem}>
              <Typograph
                style={{
                  color: theme?.isDark ? Colors.lightCream : Colors.black,
                }}
              >
                {'Hellow There'}
              </Typograph>
            </View>
          </View>
        );
    }
  };
  return (
    <Animated.View style={[styles.container, animatedSnackBar]} {...rest}>
      <View style={{ flex: 1 }}>{getIcon()}</View>
      <View
        style={{
          flexDirection: 'row',
          gap: Metrics[8],
          height: '100%',
          minWidth: 25,
        }}
      >
        {undoButton && (
          <TouchableOpacity style={styles.centerItem} onPress={onUndo}>
            <IconUndo width={20} fill={themeColors.text} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.centerItem}
          onPress={() => {
            isTriggeredClose();
            onClose();
          }}
        >
          <IconClose height={15} fill={themeColors.text} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};
