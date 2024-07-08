import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { themeColors } from '../../theme/themeManagement';
import { Typograph } from '../Typograph';
import type { PropsButton } from './props';
import { Metrics } from '../../theme/metrics';
import { Colors } from '../../theme/colors';

export const Button: React.FunctionComponent<PropsButton> = (props) => {
  const {
    title,
    onPress = () => {},
    customStyleButton = {
      backgroundColor: themeColors.button,
      borderRadius: Metrics[8],
      justifyContent: 'center',
      padding: Metrics[16],
    },
    customStyleTitle = {
      fontWeight: '800',
      textAlign: 'center',
      color: Colors.black,
    },
    ...rest
  } = props;
  return (
    <TouchableOpacity onPress={onPress} {...rest}>
      <View style={customStyleButton}>
        <Typograph style={customStyleTitle}>{title}</Typograph>
      </View>
    </TouchableOpacity>
  );
};
