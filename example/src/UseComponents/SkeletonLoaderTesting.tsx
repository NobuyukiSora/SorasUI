import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  CardSkeletonLoader,
  CircleSkeletonLoader,
  SkeletonLoader,
  Typograph,
} from '../../../src/components';

export const SkeletonLoaderTesting = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

  return (
    <View style={styles.container}>
      <Typograph>{'SkeletonLoader: '}</Typograph>
      <View style={{ paddingBottom: 10, paddingLeft: 10 }}>
        <Typograph>{`animation: 'wave'`}</Typograph>
        <SkeletonLoader width={300} />
        <Typograph>{`animation: 'breathing'`}</Typograph>
        <SkeletonLoader width={300} animation="breathing" />
      </View>
      <Typograph>{'CircleSkeletonLoader: '}</Typograph>
      <CircleSkeletonLoader width={100} />
      <Typograph>{'CardSkeletonLoader: '}</Typograph>
      <CardSkeletonLoader width={100} />
    </View>
  );
};
