import * as React from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
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
    // value,
    // vibrate = true,
    // vibrateDuration = 100,
    ...rest
  } = props;

  const [value, setValue] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);

  const handleSelect = (value: string) => {
    setValue(value);
    onSelect(value);
    setModalVisible(false);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: 'flex',
      overflow: 'visible',
    },
    modal: {
      width: '100%',
      height: maxDropDownHeight,
      backgroundColor: 'red',
      position: 'absolute',
      top: height + 10,
      zIndex: 9999,
      elevation: 10,
    },
    option: {
      padding: 15,
    },
    dropdownList: {
      position: 'absolute',
      top: height + 10,
      left: 0,
      width: '100%',
      backgroundColor: themeColors.textThird,
      borderRadius: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 4,
      zIndex: 10,
    },
  });

  return (
    <TouchableOpacity
      {...rest}
      onPress={() => setModalVisible(!modalVisible)}
      style={styles.container}
    >
      <TextInputField
        title={title}
        value={value}
        editable={false}
        customContainerStyles={{ height: height }}
        onTextChange={(set) => setValue(set)}
        RenderItemRight={
          <TouchableOpacity
            onPress={() => setModalVisible(!modalVisible)}
            style={{ padding: 10 }}
          >
            <IconDown stroke={themeColors.text} />
          </TouchableOpacity>
        }
      />
      {modalVisible && (
        <View style={styles.dropdownList}>
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <Pressable
                style={styles.option}
                onPress={() => handleSelect(item.label)}
              >
                <Typograph>{item.label}</Typograph>
              </Pressable>
            )}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};
