import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import IconStar from '../../Icon/Ico.Star.svg';
import { Metrics, themeColors } from '../../theme';
import { Typograph } from '../Typograph';
import { PropsRender } from './props';

export const Rating: React.FunctionComponent<PropsRender> = (props) => {
  const {
    length = 5,
    width = 30,
    height = 40,
    // customTextinputStyles,
    customContainerStyles,
  } = props;
  const [code, setCode] = React.useState<number[]>(Array(length).fill(0));
  let [value, setValue] = React.useState<number>(0);
  // const inputs = React.useRef<TextInput[]>([]);

  const handleChange = (number: number, index: number) => {
    const newCode = [...code];
    for (let loop = 0; loop < length; loop++) {
      newCode[loop] = loop <= index ? number : 0;
      setValue((value = value + 1));
    }
    setCode(newCode);
  };

  const styles = StyleSheet.create({
    mainContainer: {
      borderWidth: 1,
      borderRadius: Metrics[8],
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: Metrics[8],
      backgroundColor: themeColors.background,
      height: height,
      width: width,
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
        <IconStar />
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
