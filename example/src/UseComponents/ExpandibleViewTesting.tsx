import React from 'react';
import { View } from 'react-native';
import { ExpandableView, Typograph } from '../../../src/components';

export const ExpandibleViewTesting = () => {
  const renderExpandItem = () => {
    return (
      <View>
        <Typograph>{'Expanded'}</Typograph>
      </View>
    );
  };
  return (
    <View>
      <ExpandableView
        title={'Expand this component'}
        renderItem={renderExpandItem()}
      />
    </View>
  );
};
