import * as React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Metrics, themeColors } from '../../theme';
import { PropsTextInputSingleBox } from './props';

export const TextInputSingleBox: React.FunctionComponent<
  PropsTextInputSingleBox
> = (props) => {
  const {
    onChange = () => {},
    type = 'string',
    length,
    width,
    height,
    customTextinputStyles,
    customContainerStyles,
    ...rest
  } = props;
  const [code, setCode] = React.useState<string[]>(Array(length).fill(''));
  const [isFocus, setIsFocus] = React.useState(false);
  const inputs = React.useRef<TextInput[]>([]);

  const handleTextChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (onChange) {
      onChange(type == 'string' ? code.join('') : code);
    }

    if (text && text.length === 1) {
      if (index < length - 1) {
        if (inputs.current[index + 1]) {
          inputs.current[index + 1]?.focus();
        }
      }
    }
  };

  const styles = StyleSheet.create({
    mainContainer: {
      borderWidth: 1,
      borderRadius: Metrics[8],
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: Metrics[8],
      borderColor: isFocus ? themeColors.active : themeColors.inActive,
      backgroundColor: themeColors.background,
      height: height,
      width: width,
    },
  });

  const renderTextInput = () => {
    const component = code.map((_, index) => {
      return (
        <View style={[styles.mainContainer, customContainerStyles]}>
          <TextInput
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChangeText={(set) => handleTextChange(set, index)}
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
              !!input && (inputs.current[index] = input);
            }}
            {...rest}
          />
        </View>
      );
    });
    return component;
  };

  return (
    <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
      {renderTextInput()}
    </View>
  );
};
