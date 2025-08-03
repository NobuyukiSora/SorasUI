import React, { useCallback, useEffect, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import IconClose from '../../Icon/Ico-Close.svg';
import { Metrics, themeColors } from '../../theme';
import { Button } from '../Button';
import { Typograph } from '../Typograph';
import { ModalProps } from './props';

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
  const overlayOpacity = useSharedValue(0);

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
        overlayOpacity.value = withTiming(0, { duration: 300 });
      });
  }, [
    onPressClose,
    scrollTo,
    screenHeight,
    context,
    translateY,
    overlayOpacity,
  ]);

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
      overlayOpacity.value = withTiming(1, { duration: 300 });
    }
  }, [isPopUp, scrollTo, scaleTo, type, screenHeight, overlayOpacity]);

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

  const handleCloseModal = () => {
    if (onPressClose) {
      if (type === 'bottom') {
        scrollTo(screenHeight);
        scaleTo(1);
      } else if (type === 'center') {
        scrollTo(screenHeight);
        scaleTo(0.8);
        setTimeout(() => {
          runOnJS(scrollTo)(screenHeight);
        }, 200);
      }
      overlayOpacity.value = withTiming(0, { duration: 300 });
      onPressClose();
    }
  };

  const reanimatedOverlayStyle = useAnimatedStyle(() => {
    return {
      opacity: overlayOpacity.value,
    };
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
      <>
        <Animated.View
          style={[
            { backgroundColor: 'rgba(0, 0, 0, 0.1)' },
            styles.overlay,
            reanimatedOverlayStyle,
          ]}
        >
          <TouchableOpacity
            style={styles.overlay}
            onPress={handleCloseModal}
          ></TouchableOpacity>
        </Animated.View>
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
      </>
    );
  } else if (type === 'center') {
    return (
      <>
        <Animated.View
          style={[
            { backgroundColor: 'rgba(0, 0, 0, 0.1)' },
            styles.overlay,
            reanimatedOverlayStyle,
          ]}
        >
          <TouchableOpacity
            style={styles.overlay}
            onPress={handleCloseModal}
          ></TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.overlay]}>
          <TouchableOpacity style={styles.overlay} onPress={handleCloseModal} />
          <Animated.View
            style={[
              styles.centerModalContainer,
              customModalContainer,
              reanimatedStyle,
            ]}
          >
            <View style={styles.centerHeader}>
              <Typograph customStyle={customStyleTitle}>{title}</Typograph>
              <Button title="X" onPress={handleCloseModal}>
                <IconClose height={15} fill={themeColors.text} />
              </Button>
            </View>
            <View>{children}</View>
          </Animated.View>
        </Animated.View>
      </>
    );
  }

  return null;
};
