import * as React from 'react';
import { ScrollView } from 'react-native';
import { Metrics } from '../../theme/metrics';
import { PropsDynamicScrollView } from './props';

export const DynamicScrollView: React.FunctionComponent<
  PropsDynamicScrollView
> = (props) => {
  const {
    direction = 'column',
    width = Metrics.screenWidth,
    height = Metrics.screenHeight,
    justifyContent = 'flex-start',
    children,
    ...rest
  } = props;

  return (
    <ScrollView
      contentContainerStyle={{
        flexDirection: direction === 'row' ? 'row' : 'column',
        flexWrap: 'wrap',
        width: width,
        height: height,
        justifyContent: justifyContent,
      }}
      {...rest}
    >
      {children}
    </ScrollView>
  );
};
