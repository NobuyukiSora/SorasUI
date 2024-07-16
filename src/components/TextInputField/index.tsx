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

const TextInputField: React.FunctionComponent<PropsTextInput> = (props) => {
  const {
    title,
    value,
    placeHolder = '',
    onTextChange = () => {},
    editable = true,
    secureTextEntry = false,
    multiline = true,
    customStyles = {
      height: 50,
      backgroundColor: themeColors.background,
      activeOutlineColor: themeColors.active,
      inactiveOutlineColor: themeColors.inActive,
      textColor: themeColors.text,
      textAlign: 'left',
      placeholderTextColor: themeColors.textThird,
    },
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
    springValue.value = withSpring(
      value || isFocus ? customStyles.height / 2 - customStyles.height : 0
    );
  }, [isFocus, value, springValue, placeHolder, customStyles]);

  const animatedTitle = useAnimatedStyle(() => ({
    transform: [{ translateY: springValue.value }],
  }));

  const styles = StyleSheet.create({
    containerTitle: {
      position: 'absolute',
      paddingHorizontal: Metrics[4],
      marginHorizontal: Metrics[4],
      backgroundColor: customStyles.backgroundColor,
      borderRadius: Metrics[2],
    },
    mainContainer: {
      borderWidth: 1,
      borderRadius: Metrics[8],
      alignItems:
        customStyles.textAlign === 'left'
          ? 'flex-start'
          : customStyles.textAlign === 'right'
            ? 'flex-end'
            : 'center',
      justifyContent: 'center',
      marginVertical: Metrics[8],
      borderColor: isFocus
        ? customStyles.activeOutlineColor
        : customStyles.inactiveOutlineColor,
      backgroundColor: themeColors.background,
      height: customStyles.height,
    },
  });

  return (
    <View style={[styles.mainContainer, styles.mainContainer]}>
      <Animated.View style={[styles.containerTitle, animatedTitle]}>
        <Typograph>{title}</Typograph>
      </Animated.View>
      <TextInput
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        value={value}
        onChangeText={onTextChange}
        placeholder={thePlaceHolder}
        placeholderTextColor={customStyles.placeholderTextColor}
        textAlign={customStyles.textAlign}
        multiline={multiline}
        secureTextEntry={secureTextEntry}
        style={{
          color: themeColors.text,
          padding: Metrics[8],
          fontSize: Metrics[16],
          width: '100%',
        }}
        editable={editable}
        {...rest}
      />
    </View>
  );
};

export default TextInputField;
