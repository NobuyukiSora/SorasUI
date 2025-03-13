import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Colors } from '../../theme';
import { Metrics } from '../../theme/metrics';
import { themeColors, useTheme } from '../../theme/themeManagement';
import { Button } from '../Button';
import { Typograph } from '../Typograph';
import { propsModal } from './props';

export const Modal: React.FunctionComponent<propsModal> = (props) => {
  const {
    title,
    onPressClose = () => {},
    customStyleModal = {},
    customModalContainer = {},
    customCloseIcon,
    type = 'bottom',
    isPopUp = false,
    children,
    customHeader,
    ...rest
  } = props;

  const { theme } = useTheme();
  const translateY = useSharedValue(Metrics.screenHeight);

  React.useEffect(() => {
    if (isPopUp) {
      translateY.value = withTiming(0, { duration: 300 });
    } else {
      translateY.value = withTiming(Metrics.screenHeight);
    }
  }, [isPopUp, translateY]);

  const swipeGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationY > 0) {
        translateY.value = event.translationY;
      }
    })
    .onEnd((event) => {
      if (event.translationY > 100) {
        translateY.value = withTiming(
          Metrics.screenHeight,
          { duration: 300 },
          () => {
            runOnJS(onPressClose)(false);
          }
        );
      } else {
        translateY.value = withTiming(0);
      }
    });

  const gestureHandler =
    type === 'bottom' ? swipeGesture : Gesture.Simultaneous();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const styles = StyleSheet.create({
    title: {
      fontWeight: '800',
      textAlign: 'center',
      color: themeColors.text,
    },
    absoluteBack: {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
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
      padding: Metrics[8],
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
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 10,
    },
    modalContainer: {
      shadowColor: theme.isDark ? Colors.darkBlue : Colors.grey,
      shadowOffset: { width: 0, height: -10 },
      shadowOpacity: 0.5,
      shadowRadius: 50,
      marginHorizontal: Metrics[8],
      elevation: 5,
    },
    headerModal: {
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    dragHandle: {
      width: 40,
      height: 5,
      backgroundColor: '#ccc',
      alignSelf: 'center',
      borderRadius: 10,
      marginVertical: 10,
    },
  });

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          opacity: isPopUp ? 1 : 0,
          zIndex: 10,
          right: 0,
          left: 0,
          position: 'absolute',
          bottom: 0,
        },
        type === 'center' ? styles.centerStyle : styles.bottomstyle,
        customModalContainer,
      ]}
      {...rest}
    >
      {type === 'center' && (
        <TouchableOpacity
          style={styles.absoluteBack}
          onPress={() => onPressClose(false)}
        />
      )}

      <GestureDetector gesture={gestureHandler}>
        <Animated.View
          style={[
            type === 'bottom' ? styles.containerBottom : styles.containerCenter,
            styles.modalContainer,
            {
              backgroundColor: themeColors.backgroundSecondary,
            },
            customStyleModal,
          ]}
        >
          {type === 'bottom' && <View style={styles.dragHandle} />}

          {customHeader ? (
            customHeader
          ) : (
            <View style={styles.headerModal}>
              <Typograph style={styles.title}>{title}</Typograph>
              {customCloseIcon ? (
                customCloseIcon
              ) : (
                <View style={{ position: 'absolute', right: 0 }}>
                  <Button
                    title="X"
                    onPress={() => onPressClose(false)}
                    customStyleButton={{
                      padding: Metrics[8],
                      margin: Metrics[8],
                    }}
                  />
                </View>
              )}
            </View>
          )}

          <View>{children}</View>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
};
