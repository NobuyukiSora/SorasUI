import * as React from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Vibration,
} from 'react-native';
import IconDown from '../../Icon/Ico.Down.svg';
import { themeColors } from '../../theme/themeManagement';
import { TextInputField } from '../TextInputField';
import { Typograph } from '../Typograph';
import { PropsDropDown } from './props';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Calendar } from '../Calendar';

export const DropDown: React.FunctionComponent<PropsDropDown> = (props) => {
  const {
    onSelect = () => {},
    title,
    height = 60,
    maxDropDownHeight = 300,
    mode = 'picker',
    options,
    vibrate = true,
    vibrateDuration = 100,
    textInputProps = {},
    calendarProps = {},
    modalContainerStyle,
    pressableStyle,
    ...rest
  } = props;

  const [value, setValue] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const [dropdownPosition, setDropdownPosition] = React.useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const inputRef = React.useRef<TouchableOpacity>(null);
  const translateY = useSharedValue(-10);
  const opacity = useSharedValue(0);

  const measureInput = () => {
    if (inputRef.current) {
      inputRef.current.measureInWindow((x, y, width, height) => {
        setDropdownPosition({
          top: y + height,
          left: x,
          width: width,
        });
      });
    }
  };

  React.useEffect(() => {
    translateY.value = withTiming(modalVisible ? 0 : -10, { duration: 300 });
    opacity.value = withTiming(modalVisible ? 1 : 0, { duration: 300 });
  }, [translateY, opacity, modalVisible]);

  const onPressDropDown = () => {
    if (vibrate) {
      Vibration.vibrate(vibrateDuration);
    }
    measureInput();
    setModalVisible(true);
  };

  const handleSelect = (selectedValue: string) => {
    setValue(selectedValue);
    onSelect(selectedValue);
    setModalVisible(false);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const styles = StyleSheet.create({
    inputContainer: {
      width: '100%',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.1)',
    },
    dropdownList: {
      position: 'absolute',
      backgroundColor: themeColors.background,
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 10,
      maxHeight: maxDropDownHeight,
    },
    option: {
      padding: 15,
      borderBottomWidth: 1,
      borderRadius: 5,
      borderBottomColor: themeColors.text,
    },
  });

  return (
    <View>
      <TouchableOpacity
        {...rest}
        ref={inputRef}
        onPress={() => onPressDropDown()}
        style={styles.inputContainer}
      >
        <TextInputField
          title={title}
          value={value}
          editable={false}
          customContainerStyles={{ height: height }}
          onTextChange={(set) => setValue(set)}
          RenderItemRight={
            <TouchableOpacity
              onPress={() => onPressDropDown()}
              style={{ padding: 10 }}
            >
              <IconDown stroke={themeColors.text} />
            </TouchableOpacity>
          }
          {...textInputProps}
        />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <Animated.View
              style={[
                styles.dropdownList,
                {
                  top: dropdownPosition.top,
                  left: dropdownPosition.left,
                  width: dropdownPosition.width,
                },
                mode == 'calendar' && { alignItems: 'center' },
                animatedStyle,
                modalContainerStyle,
              ]}
            >
              {mode === 'picker' ? (
                <FlatList
                  data={options}
                  renderItem={({ item, index }) => (
                    <Pressable
                      key={index}
                      style={[styles.option, pressableStyle]}
                      onPress={() => handleSelect(item.label)}
                    >
                      <Typograph>{item.label}</Typograph>
                    </Pressable>
                  )}
                />
              ) : (
                <Calendar
                  onPressDate={(set) => {
                    setValue(set);
                    onSelect(set);
                  }}
                  {...calendarProps}
                />
              )}
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};
