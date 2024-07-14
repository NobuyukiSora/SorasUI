import * as React from 'react';
import { ScrollView } from 'react-native';
import { Metrics } from '../../theme/metrics';
import { PropsDynamicScrollView } from './props';

export const DynamicScrollView: React.FunctionComponent<
  PropsDynamicScrollView
> = (props) => {
  const {
    directionMode = {
      direction: 'column',
      width: Metrics.screenWidth,
      height: Metrics.screenHeight,
      justifyContent: 'flex-start',
    },
    children,
    ...rest
  } = props;

  return (
    <ScrollView
      contentContainerStyle={{
        flexDirection: directionMode.direction === 'row' ? 'row' : 'column',
        flexWrap: 'wrap',
        width: directionMode.width,
        height: directionMode.height,
        justifyContent: directionMode.justifyContent,
      }}
      {...rest}
    >
      {children}
    </ScrollView>
  );
};
