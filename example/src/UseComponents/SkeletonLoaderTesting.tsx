import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SkeletonLoader } from '../../../src/components';

export const SkeletonLoaderTesting = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'grey',
    },
  });

  return (
    <View style={styles.container}>
      <SkeletonLoader width={300} />
    </View>
  );
};
