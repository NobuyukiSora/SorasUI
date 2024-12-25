import * as React from 'react';
import type { PropsTextInput } from './props';
import { StyleSheet, TextInput, View } from 'react-native';
import { themeColors } from '../../theme/themeManagement';
import { Typograph } from '../Typograph';
import { Metrics } from '../../theme/metrics';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export const TextInputField: React.FunctionComponent<PropsTextInput> = (
  props
) => {
  const {
    title,
    value,
    placeHolder = '',
    onTextChange = () => {},
    editable = true,
    secureTextEntry = false,
    multiline = true,
    align = 'left',
    height = 50,
    customTextinputStyles,
    customContainerStyles,
    customTitleSyle,
    ...rest
  } = props;
  const [isFocus, setIsFocus] = React.useState(false);
  const [thePlaceHolder, setThePlaceHolder] = React.useState('');

  const springValue = useSharedValue(0);

  React.useEffect(() => {
    if (isFocus) {
      setThePlaceHolder(placeHolder);
    } else {
      setThePlaceHolder('');
    }
    springValue.value = withSpring(value || isFocus ? height / 2 - height : 0);
  }, [isFocus, value, springValue, placeHolder, height]);

  const animatedTitle = useAnimatedStyle(() => ({
    transform: [{ translateY: springValue.value }],
  }));

  const styles = StyleSheet.create({
    containerTitle: {
      position: 'absolute',
      paddingHorizontal: Metrics[4],
      marginHorizontal: Metrics[4],
      backgroundColor: themeColors.background,
      borderRadius: Metrics[2],
    },
    mainContainer: {
      borderWidth: 1,
      borderRadius: Metrics[8],
      alignItems:
        align === 'center'
          ? 'center'
          : align === 'right'
            ? 'flex-end'
            : 'flex-start',
      justifyContent: 'center',
      marginVertical: Metrics[8],
      borderColor: isFocus ? themeColors.active : themeColors.inActive,
      backgroundColor: themeColors.background,
      height: height,
    },
  });

  return (
    <View style={[styles.mainContainer, customContainerStyles]}>
      <Animated.View
        style={[styles.containerTitle, animatedTitle, customTitleSyle]}
      >
        <Typograph>{title}</Typograph>
      </Animated.View>
      <TextInput
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        value={value}
        onChangeText={onTextChange}
        placeholder={thePlaceHolder}
        placeholderTextColor={themeColors.textThird}
        textAlign={align}
        multiline={multiline}
        secureTextEntry={secureTextEntry}
        style={[
          {
            color: themeColors.text,
            padding: Metrics[8],
            fontSize: Metrics[16],
            width: '100%',
          },
          customTextinputStyles,
        ]}
        editable={editable}
        {...rest}
      />
    </View>
  );
};
