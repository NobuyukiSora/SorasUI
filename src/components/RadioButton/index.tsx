import * as React from 'react';
import { themeColors } from '../../theme/themeManagement';
import { Metrics } from '../../theme/metrics';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { PropsRadioButton } from './props';
import { Typograph } from '../Typograph';

export const RadioButton: React.FunctionComponent<PropsRadioButton> = (
  props
) => {
  const {
    data,
    onPress = () => {},
    selectedId,
    activeCircleStyles = {
      backgroundColor: themeColors.inActive,
      height: Metrics[24],
      width: Metrics[24],
      borderRadius: Metrics[20],
      justifyContent: 'center',
      alignItems: 'center',
    },
    inactiveCircleStyles = {
      backgroundColor: themeColors.inActive,
      height: Metrics[24],
      width: Metrics[24],
      borderRadius: Metrics[20],
      justifyContent: 'center',
      alignItems: 'center',
    },
    circleContainerStyles = {
      justifyContent: 'center',
      alignItems: 'center',
      height: Metrics[24],
      width: Metrics[24],
    },
    iconColor = themeColors.active,
    directionMode = { direction: 'column', width: Metrics.screenWidth },
    children,

    ...rest
  } = props;

  const styles = StyleSheet.create({
    circleIcon: {
      backgroundColor: iconColor,
      borderRadius: Metrics[16],
      height: Metrics[16],
      width: Metrics[16],
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Metrics[8],
      height: Metrics[24],
      marginVertical: Metrics[2],
      marginHorizontal: directionMode.direction === 'row' ? Metrics[4] : 0,
    },
  });

  return (
    <View>
      <ScrollView
        contentContainerStyle={{
          flexDirection: directionMode.direction === 'row' ? 'row' : 'column',
          flexWrap: 'wrap',
          width: directionMode.width,
          justifyContent: 'space-between',
        }}
      >
        {data.map((item) => (
          <TouchableOpacity
            onPress={() => {
              onPress(item);
            }}
            {...rest}
            style={styles.container}
            key={item.id}
          >
            <View style={circleContainerStyles}>
              {selectedId === item.id ? (
                <View style={inactiveCircleStyles}>
                  {!!children ? (
                    children
                  ) : (
                    <View style={styles.circleIcon}></View>
                  )}
                </View>
              ) : (
                <View style={activeCircleStyles}></View>
              )}
            </View>
            <View>
              <Typograph>{item.title}</Typograph>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
