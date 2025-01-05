import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import IconStar from '../../Icon/Ico.Star.svg';
import { Metrics, themeColors } from '../../theme';
import { Typograph } from '../Typograph';
import { PropsRender } from './props';

export const Rating: React.FunctionComponent<PropsRender> = (props) => {
  const {
    length = 5,
    width = 20,
    height = 40,
    value = 0,
    onChange = () => {},
    // customTextinputStyles,
    customContainerStyles,
  } = props;
  const [code, setCode] = React.useState<number[]>(Array(length).fill(0));
  // let [value, setValue] = React.useState<number>(0);

  const handleSplitNumber = React.useCallback(() => {
    setCode((prevCode) => {
      const newCode = [...prevCode];
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
  }, [value]);

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

  const renderTextInput = () => {
    return code.map((_, index) => (
      <TouchableOpacity
        style={[styles.mainContainer, customContainerStyles]}
        key={index}
        onPress={() => handleChange(1, index)}
      >
        {/* <TextInput
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          maxLength={1}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(set) => handleKeyPress(set, index)}
          style={[
            {
              color: themeColors.text,
              textAlign: 'center',
              padding: Metrics[8],
              fontSize: Metrics[16],
              width: '100%',
            },
            customTextinputStyles,
          ]}
          ref={(input) => {
            if (input) inputs.current[index] = input;
          }}
          {...rest}
        /> */}
        <View style={[{ width: width }]}>
          <View
            style={{ width: width * (code[index] ?? 0), overflow: 'hidden' }}
          >
            <IconStar
              fill={code[index] && 1 ? 'yellow' : 'transparent'}
              stroke={code[index] && 1 ? 'yellow' : themeColors.text}
              width={width}
              height={height}
            />
            {/* <Typograph>{`${code[index]}`}</Typograph> */}
          </View>
        </View>
        {code[index] != 1 && (
          <View style={[{ position: 'absolute', width: width }, styles.center]}>
            <IconStar
              fill={code[index] == 1 ? 'yellow' : 'transparent'}
              stroke={code[index] == 1 ? 'yellow' : themeColors.text}
              width={width}
              height={height}
            />
          </View>
        )}
      </TouchableOpacity>
    ));
  };

  return (
    <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
      <Typograph>{`${code}`}</Typograph>
      {renderTextInput()}
    </View>
  );
};
