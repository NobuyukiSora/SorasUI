import React, { useCallback, useEffect, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Metrics, themeColors } from '../../theme';
import { Button } from '../Button';
import { ModalProps } from './props';
import IconClose from '../../Icon/Ico-Close.svg';
import { Typograph } from '../Typograph';

export const Modal: React.FC<ModalProps> = (props) => {
  const {
    children,
    onPressClose,
    isPopUp,
    title,
    type = 'bottom',
    customModalContainer,
    customStyleHeader,
    customStyleTitle = { fontWeight: '800', fontSize: Metrics[16] },
  } = props;
  const screenHeight = Metrics.screenHeight;
  const centerModalWidth = Metrics.screenWidth * 0.8;
  const translateY = useSharedValue(screenHeight);
  const scale = useSharedValue(type === 'center' ? 0.8 : 1);
  const context = useSharedValue({ y: 0 });

  const scrollTo = useCallback(
    (destination: number) => {
      'worklet';
      translateY.value = withSpring(destination, { damping: 50 });
    },
    [translateY]
  );

  const scaleTo = useCallback(
    (destination: number) => {
      'worklet';
      scale.value = withSpring(destination, { damping: 20 });
    },
    [scale]
  );

  const panGesture = useMemo(() => {
    const modalCloseTreshold = 100;

    return Gesture.Pan()
      .onStart(() => {
        context.value = { y: translateY.value };
      })
      .onUpdate((event) => {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(
          0,
          Math.min(translateY.value, screenHeight)
        );
      })
      .onEnd(() => {
        'worklet';
        if (translateY.value - context.value.y > modalCloseTreshold) {
          scrollTo(screenHeight);
          if (onPressClose) {
            runOnJS(onPressClose)();
          }
        } else {
          scrollTo(0);
        }
      });
  }, [onPressClose, scrollTo, screenHeight, context, translateY]);

  useEffect(() => {
    'worklet';
    if (isPopUp) {
      if (type === 'bottom') {
        scrollTo(0);
        scaleTo(1);
      } else if (type === 'center') {
        scrollTo((screenHeight - screenHeight) / 2);
        scaleTo(1);
      }
    } else {
      if (type === 'bottom') {
        scrollTo(screenHeight);
        scaleTo(1);
      } else if (type === 'center') {
        scaleTo(0.8);
        setTimeout(() => {
          runOnJS(scrollTo)(screenHeight);
        }, 200);
      }
    }
  }, [isPopUp, scrollTo, scaleTo, type, screenHeight]);

  const reanimatedStyle = useAnimatedStyle(() => {
    if (type === 'bottom') {
      return {
        transform: [{ translateY: translateY.value }],
      };
    } else if (type === 'center') {
      return {
        transform: [{ translateY: translateY.value }, { scale: scale.value }],
        width: centerModalWidth,
      };
    }
    return {};
  });

  if (!isPopUp) {
    return null;
  }

  const styles = StyleSheet.create({
    bottomSheetContainer: {
      width: '100%',
      backgroundColor: themeColors.backgroundSecondary,
      position: 'absolute',
      bottom: 0,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: -2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      paddingHorizontal: 16,
      paddingBottom: 16,
    },
    overlay: {
      flex: 1,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    centerModalContainer: {
      backgroundColor: themeColors.backgroundSecondary,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      overflow: 'hidden',
    },
    header: {
      height: Metrics[30],
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: themeColors.textThird,
      padding: 8,
    },
    centerHeader: {
      padding: 8,
      borderBottomWidth: 1,
      borderBottomColor: themeColors.textThird,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    },
    gestureDot: {
      width: Metrics[50],
      height: Metrics[4],
      backgroundColor: themeColors.textThird,
      borderRadius: Metrics[12],
    },
  });

  if (type === 'bottom') {
    return (
      <Animated.View
        style={[
          styles.bottomSheetContainer,
          customModalContainer,
          reanimatedStyle,
        ]}
      >
        {panGesture && (
          <GestureDetector gesture={panGesture}>
            <View style={[styles.header, customStyleHeader]}>
              <View style={styles.gestureDot} />
            </View>
          </GestureDetector>
        )}
        <View>{children}</View>
      </Animated.View>
    );
  } else if (type === 'center') {
    return (
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.overlay} onPress={onPressClose} />
        <Animated.View
          style={[
            styles.centerModalContainer,
            customModalContainer,
            reanimatedStyle,
          ]}
        >
          <View style={styles.centerHeader}>
            <Typograph customStyle={customStyleTitle}>{title}</Typograph>
            <Button title="X" onPress={onPressClose}>
              <IconClose height={15} fill={themeColors.text} />
            </Button>
          </View>
          <View>{children}</View>
        </Animated.View>
      </View>
    );
  }

  return null;
};
