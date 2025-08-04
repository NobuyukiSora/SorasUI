import * as React from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Metrics, themeColors } from '../../theme';
import { PropsSingleCodeBox, PropsTextInputSingleBox } from './props';

const SingleCodeBox: React.FunctionComponent<PropsSingleCodeBox> = ({
  value,
  index,
  onTextChange,
  onKeyPress,
  inputRef,
  width,
  height,
  customTextinputStyles,
  customContainerStyles,
  ...textInputProps
}) => {
  const scale = useSharedValue(1);
  const borderColor = useSharedValue(themeColors.inActive);

  const onFocus = () => {
    scale.value = withSpring(1.05, { damping: 10, stiffness: 100 });
    borderColor.value = themeColors.active;
  };

  const onBlur = () => {
    scale.value = withSpring(1, { damping: 10, stiffness: 100 });
    borderColor.value = themeColors.inActive;
  };

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      borderColor: borderColor.value,
    };
  });

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
    textInput: {
      color: themeColors.text,
      textAlign: 'center',
      padding: Metrics[8],
      fontSize: Metrics[16],
      width: '100%',
    },
  });

  return (
    <Animated.View
      style={[
        styles.mainContainer,
        customContainerStyles,
        animatedContainerStyle,
      ]}
      key={index}
    >
      <TextInput
        onFocus={onFocus}
        onBlur={onBlur}
        maxLength={1}
        onChangeText={(text) => onTextChange(text, index)}
        onKeyPress={(e) => onKeyPress(e, index)}
        style={[styles.textInput, customTextinputStyles]}
        ref={(input) => {
          if (input) inputRef.current[index] = input;
        }}
        value={value}
        {...textInputProps}
      />
    </Animated.View>
  );
};

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
  const inputs = React.useRef<TextInput[]>([]);

  const handleTextChange = (text: string, index: number) => {
    if (text.length > 1) {
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

      const nextInputIndex = index + pastedText.length;
      if (nextInputIndex < length) {
        inputs.current[nextInputIndex]?.focus();
      } else {
        inputs.current[length - 1]?.blur();
      }
      return;
    }

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (onChange) {
      onChange(type === 'string' ? newCode.join('') : newCode);
    }

    if (text && text.length === 1 && index < length - 1) {
      inputs.current[index + 1]?.focus();
    } else if (!text && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleKeyPress = (
    input: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (input.nativeEvent.key === 'Backspace' && index > 0 && !code[index]) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
      {code.map((value, index) => (
        <SingleCodeBox
          key={index}
          value={value}
          index={index}
          onTextChange={handleTextChange}
          onKeyPress={handleKeyPress}
          inputRef={inputs}
          width={width}
          height={height}
          customTextinputStyles={customTextinputStyles}
          customContainerStyles={customContainerStyles}
          {...rest}
        />
      ))}
    </View>
  );
};
