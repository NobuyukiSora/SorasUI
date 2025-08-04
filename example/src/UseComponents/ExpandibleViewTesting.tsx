import React from 'react';
import { View } from 'react-native';
import { ExpandableView, Typograph } from '../../../src/components';
import { Metrics, themeColors } from '../../../src/theme';

export const ExpandibleViewTesting = () => {
  const renderExpandItem = () => {
    return (
      <View
        style={{
          backgroundColor: themeColors.button,
          flex: 1,
          height: Metrics[50],
        }}
      >
        <Typograph customStyle={{ color: themeColors.background }}>
          {'Expanded'}
        </Typograph>
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
