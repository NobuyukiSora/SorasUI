import * as React from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from 'react-native';
import { Metrics, themeColors } from '../../theme';
import { PropsTextInputSingleBox } from './props';

export const TextInputSingleBox: React.FunctionComponent<
  PropsTextInputSingleBox
> = (props) => {
  const {
    onChange = () => {},
    type = 'string',
    length,
    width = 30,
    height = 40,
    customTextinputStyles,
    customContainerStyles,
    ...rest
  } = props;
  const [code, setCode] = React.useState<string[]>(Array(length).fill(''));
  const [isFocus, setIsFocus] = React.useState(false);
  const inputs = React.useRef<TextInput[]>([]);

  const handleTextChange = (text: string, index: number) => {
    if (text.length > 1) {
      // paste
      const pastedText = text.slice(0, length - index);
      const newCode = [...code];
      pastedText.split('').forEach((char, idx) => {
        if (index + idx < length) {
          newCode[index + idx] = char;
        }
      });
      setCode(newCode);
      if (onChange) {
        onChange(type === 'string' ? newCode.join('') : newCode);
      }

      // next input
      const nextInputIndex = index + pastedText.length;
      if (nextInputIndex < length) {
        inputs.current[nextInputIndex]?.focus();
      }
      return;
    }

    // single input
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (onChange) {
      onChange(type === 'string' ? newCode.join('') : newCode);
    }

    if (text && text.length === 1 && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    input: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (input.nativeEvent.key === 'Backspace' && index > 0) {
      inputs.current[index - 1]?.focus();
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
    return code.map((_, index) => (
      <View style={[styles.mainContainer, customContainerStyles]} key={index}>
        <TextInput
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          maxLength={1}
          onChangeText={(text) => handleTextChange(text, index)}
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
        />
      </View>
    ));
  };

  return (
    <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
      {renderTextInput()}
    </View>
  );
};
