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

export const DropDown: React.FunctionComponent<PropsDropDown> = (props) => {
  const {
    onSelect = () => {},
    title,
    height = 60,
    maxDropDownHeight = 250,
    options,
    vibrate = true,
    vibrateDuration = 100,
    ...rest
  } = props;

  const [value, setValue] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  const inputRef = React.useRef<TouchableOpacity>(null);
  const [dropdownPosition, setDropdownPosition] = React.useState({
    top: 0,
    left: 0,
    width: 0,
  });

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
      backgroundColor: themeColors.textThird,
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
        />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View
              style={[
                styles.dropdownList,
                {
                  top: dropdownPosition.top,
                  left: dropdownPosition.left,
                  width: dropdownPosition.width,
                },
              ]}
            >
              <FlatList
                data={options}
                renderItem={({ item, index }) => (
                  <Pressable
                    key={index}
                    style={styles.option}
                    onPress={() => handleSelect(item.label)}
                  >
                    <Typograph>{item.label}</Typograph>
                  </Pressable>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};
