import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { themeColors } from '../../theme/themeManagement';
import { Typograph } from '../Typograph';
import type { PropsHeader } from './props';
import { Metrics } from '../../theme/metrics';
import IconBack from '../../Icon/Ico-Back.svg';
export const Header: React.FunctionComponent<PropsHeader> = (props) => {
  const {
    title,
    onPress = () => {},
    customStyleButton = {
      position: 'absolute',
      flex: 1,
      justifyContent: 'center',
      marginLeft: Metrics[4],
    },
    customStyleTitle = {
      textAlign: 'center',
      color: themeColors.text,
      fontWeight: '800',
    },
    iconColor = themeColors.text,
    children,
    ...rest
  } = props;
  return (
    <View style={{ height: 50, justifyContent: 'center' }} {...rest}>
      {!!title ? <Typograph style={customStyleTitle}>{title}</Typograph> : null}
      <TouchableOpacity style={customStyleButton} onPress={onPress}>
        {!!children ? (
          children
        ) : (
          <View style={{ justifyContent: 'center', padding: Metrics[4] }}>
            <IconBack fill={iconColor} />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};
