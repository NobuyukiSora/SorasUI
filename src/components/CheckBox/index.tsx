import * as React from 'react';
import { PropsCheckBox } from './props';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Typograph } from '../Typograph';
import IconCheck from '../../Icon/Ico-Check.svg';
import { themeColors } from '../../theme/themeManagement';
import { Metrics } from '../../theme/metrics';

export const CheckBox: React.FunctionComponent<PropsCheckBox> = (props) => {
  const {
    onPress = () => {},
    activeBoxStyles = {
      backgroundColor: themeColors.inActive,
      height: Metrics[20],
      width: Metrics[20],
      borderRadius: Metrics[4],
      justifyContent: 'center',
      alignItems: 'center',
    },
    inactiveBoxStyles = {
      backgroundColor: themeColors.inActive,
      height: Metrics[24],
      width: Metrics[24],
      borderRadius: Metrics[4],
    },
    boxStyles = {
      justifyContent: 'center',
      alignItems: 'center',
      height: Metrics[24],
      width: Metrics[24],
    },
    iconColor = themeColors.text,
    children,
    title,
    value,
    ...rest
  } = props;

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Metrics[8],
      height: Metrics[24],
    },
  });

  return (
    <TouchableOpacity {...rest} onPress={onPress} style={styles.container}>
      <View style={boxStyles}>
        {value ? (
          <View style={activeBoxStyles}>
            {!!children ? children : <IconCheck fill={iconColor} />}
          </View>
        ) : (
          <View style={inactiveBoxStyles}></View>
        )}
      </View>
      <View>
        <Typograph>{title}</Typograph>
      </View>
    </TouchableOpacity>
  );
};
