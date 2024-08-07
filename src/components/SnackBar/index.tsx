import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { themeColors } from '../../theme/themeManagement';
import { Typograph } from '../Typograph';
import { Metrics } from '../../theme/metrics';
import { PropsSnackBar } from './props';
import IconUndo from '../../Icon/Ico-Undo.svg';
import IconWarning from '../../Icon/Ico-Warning.svg';
import IconClose from '../../Icon/Ico-Close.svg';
import IconCloseBold from '../../Icon/Ico-CloseBold.svg';
import IconSuccess from '../../Icon/Ico-Success.svg';
import { Colors } from '../../theme/colors';

export const SnackBar: React.FunctionComponent<PropsSnackBar> = (props) => {
  const {
    type,
    // triggered = () => {},
    onUndo = () => {},
    onClose = () => {},
    ...rest
  } = props;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: themeColors.backgroundSecondary,
      marginHorizontal: Metrics[8],
      height: 50,
      borderRadius: Metrics[8],
      paddingHorizontal: Metrics[12],
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    IconBox: {
      height: 50,
      width: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Metrics[16],
    },
    centerItem: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.IconBox, { backgroundColor: Colors.green }]}>
              <IconSuccess fill={Colors.lightGreen} />
            </View>
            <View style={styles.centerItem}>
              <Typograph>{'Success'}</Typograph>
            </View>
          </View>
        );
      case 'warning':
        return (
          <View style={{ flexDirection: 'row' }}>
            <View
              style={[styles.IconBox, { backgroundColor: Colors.darkCream }]}
            >
              <IconWarning fill={Colors.yellow} />
            </View>
            <View style={styles.centerItem}>
              <Typograph>{'Warning'}</Typograph>
            </View>
          </View>
        );
      case 'error':
        return (
          <View style={{ flexDirection: 'row' }}>
            <View style={[styles.IconBox, { backgroundColor: Colors.pink }]}>
              <IconCloseBold fill={Colors.red} />
            </View>
            <View style={styles.centerItem}>
              <Typograph>{'Error'}</Typograph>
            </View>
          </View>
        );
      default:
        break;
    }
  };
  return (
    <View style={styles.container} {...rest}>
      {getIcon()}
      <View style={{ flexDirection: 'row', gap: Metrics[8] }}>
        <TouchableOpacity style={styles.centerItem} onPress={onUndo}>
          <IconUndo width={20} fill={themeColors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.centerItem} onPress={onClose}>
          <IconClose height={15} fill={themeColors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
