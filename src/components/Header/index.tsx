import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { themeColors } from '../../theme/themeManagement';
import { Typograph } from '../Typograph';
import type { PropsHeader } from './props';
import { Metrics } from '../../theme/metrics';
import IconBack from '../../Icon/Ico-Back.svg';

export const Header: React.FunctionComponent<PropsHeader> = (props) => {
  const {
    title,
    onPress = () => {},
    customButtonStyles,
    customTitleStyles,
    iconColor = themeColors.text,
    icon,
    ...rest
  } = props;

  const styles = StyleSheet.create({
    button: {
      position: 'absolute',
      flex: 1,
      justifyContent: 'center',
      marginLeft: Metrics[4],
    },
    title: {
      textAlign: 'center',
      color: themeColors.text,
      fontWeight: '800',
    },
  });

  return (
    <View style={{ height: 50, justifyContent: 'center' }} {...rest}>
      {!!title ? (
        <Typograph style={[styles.title, customTitleStyles]}>{title}</Typograph>
      ) : null}
      <TouchableOpacity
        style={[styles.button, customButtonStyles]}
        onPress={onPress}
      >
        {!!icon ? (
          icon
        ) : (
          <View style={{ justifyContent: 'center', padding: Metrics[4] }}>
            <IconBack fill={iconColor} />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};
