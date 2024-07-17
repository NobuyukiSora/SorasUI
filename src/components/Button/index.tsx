import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { themeColors } from '../../theme/themeManagement';
import { Typograph } from '../Typograph';
import type { PropsButton } from './props';
import { Metrics } from '../../theme/metrics';
import { Colors } from '../../theme/colors';

export const Button: React.FunctionComponent<PropsButton> = (props) => {
  const {
    title,
    onPress = () => {},
    customStyleButton = {},
    customStyleTitle = {},
    children,
    ...rest
  } = props;

  const styles = StyleSheet.create({
    title: {
      fontWeight: '800',
      textAlign: 'center',
      color: Colors.black,
    },
    button: {
      backgroundColor: themeColors.button,
      borderRadius: Metrics[8],
      justifyContent: 'center',
      padding: Metrics[16],
    },
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, customStyleButton]}
      {...rest}
    >
      <View style={customStyleButton}>
        {!!children ? (
          children
        ) : (
          <Typograph style={[styles.title, customStyleTitle]}>
            {title}
          </Typograph>
        )}
      </View>
    </TouchableOpacity>
  );
};
