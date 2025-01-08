import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import IconStar from '../../Icon/Ico.Star.svg';
import { Metrics, themeColors } from '../../theme';
import { PropsRender } from './props';

export const Rating: React.FunctionComponent<PropsRender> = (props) => {
  const {
    length = 5,
    width = 20,
    height = 40,
    value = 0,
    onChange = () => {},
    starColor = 'yellow',
    customIconActive,
    customIconInactive,
    justifyContent = 'space-around',
    customContainerStyles,
    disable = false,
  } = props;
  const [code, setCode] = React.useState<number[]>(Array(length).fill(0));

  const handleSplitNumber = React.useCallback(() => {
    if (value != 0) {
      setCode(() => {
        const newCode: number[] = Array(length).fill(0);
        const wholeParts = Math.floor(value);
        const remainder = value % 1;

        for (let loop = 0; loop <= wholeParts; loop++) {
          if (loop < wholeParts) {
            newCode[loop] = 1;
          } else {
            if (remainder > 0) {
              newCode[loop] = remainder;
            }
          }
        }
        return newCode;
      });
    }
  }, [value, length]);

  React.useEffect(() => {
    handleSplitNumber();
  }, [handleSplitNumber]);

  const handleChange = (number: number, index: number) => {
    const newCode = [...code];
    for (let loop = 0; loop < length; loop++) {
      newCode[loop] = loop <= index ? number : 0;
    }
    setCode(newCode);
    onChange(index + 1);
  };

  const styles = StyleSheet.create({
    mainContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: Metrics[8],
      height: height,
      width: width,
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  const renderStars = () => {
    return code.map((_, index) => (
      <TouchableOpacity
        style={[styles.mainContainer, customContainerStyles]}
        key={index}
        onPress={() => handleChange(1, index)}
        disabled={disable}
      >
        <View style={[{ width: width }]}>
          <View
            style={{ width: width * (code[index] ?? 0), overflow: 'hidden' }}
          >
            {!!customIconActive ? (
              customIconActive
            ) : (
              <IconStar
                fill={code[index] && 1 ? starColor : 'transparent'}
                stroke={code[index] && 1 ? starColor : themeColors.text}
                width={width}
                height={height}
              />
            )}
          </View>
        </View>
        {code[index] != 1 && (
          <View style={[{ position: 'absolute', width: width }, styles.center]}>
            {customIconInactive ? (
              customIconInactive
            ) : (
              <IconStar
                fill={code[index] == 1 ? starColor : 'transparent'}
                stroke={code[index] == 1 ? starColor : themeColors.text}
                width={width}
                height={height}
              />
            )}
          </View>
        )}
      </TouchableOpacity>
    ));
  };

  return (
    <View style={{ justifyContent: justifyContent, flexDirection: 'row' }}>
      {renderStars()}
    </View>
  );
};
