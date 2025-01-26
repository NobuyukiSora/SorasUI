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
      <ExpandableView
        title={'Expand this component'}
        renderItem={renderExpandItem()}
        customHeader={
          <View>
            <Typograph>{'customize'}</Typograph>
          </View>
        }
        customHeaderStyle={{ backgroundColor: 'grey' }}
        customContainerStyle={{ marginTop: 10 }}
      />
    </View>
  );
};
