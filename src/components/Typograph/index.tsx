import * as React from 'react';
import { Text } from 'react-native';
import { themeColors } from '../../theme/themeManagement';
import type { PropsTypograph } from './props';

export const Typograph: React.FunctionComponent<PropsTypograph> = (props) => {
  const { type = 'primary', customStyle, children = '', ...rest } = props;
  const textStyle = {
    textColors:
      type == 'primary' ? themeColors.text : themeColors.textSecondary,
  };
  return (
    <Text
      style={[
        customStyle,
        {
          color: textStyle.textColors,
        },
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};
