import * as React from 'react';
import { PropsCheckBox } from './props';
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import { Typograph } from '../Typograph';
import IconCheck from '../../Icon/Ico-Check.svg';
import { themeColors } from '../../theme/themeManagement';
import { Metrics } from '../../theme/metrics';
import { useVibration } from '../../theme/vibrationManagement';

export const CheckBox: React.FunctionComponent<PropsCheckBox> = (props) => {
  const {
    onPress = () => {},
    activeBoxStyles,
    inactiveBoxStyles,
    customBoxContainerStyles,
    icon,
    iconColor = themeColors.text,
    title,
    value,
    vibrate,
    vibrateDuration,
    ...rest
  } = props;
  const { isVibrationEnabled, vibrationDuration } = useVibration();

  const onPressIn = (event: GestureResponderEvent) => {
    if (vibrate ?? isVibrationEnabled) {
      Vibration.vibrate(vibrateDuration ?? vibrationDuration);
    }
    onPress(event);
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Metrics[8],
      height: Metrics[24],
    },
    boxContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      height: Metrics[24],
      width: Metrics[24],
    },
    inactiveBox: {
      backgroundColor: themeColors.inActive,
      height: Metrics[24],
      width: Metrics[24],
      borderRadius: Metrics[4],
    },
    activeBox: {
      backgroundColor: themeColors.inActive,
      height: Metrics[20],
      width: Metrics[20],
      borderRadius: Metrics[4],
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <TouchableOpacity {...rest} onPress={onPressIn} style={styles.container}>
      <View style={[styles.boxContainer, customBoxContainerStyles]}>
        {value ? (
          <View style={[styles.activeBox, activeBoxStyles]}>
            {!!icon ? icon : <IconCheck fill={iconColor} />}
          </View>
        ) : (
          <View style={[styles.inactiveBox, inactiveBoxStyles]}></View>
        )}
      </View>
      <View>
        <Typograph>{title}</Typograph>
      </View>
    </TouchableOpacity>
  );
};
