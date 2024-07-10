import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const Metrics = {
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  2: 2,
  4: 4,
  8: 8,
  16: 16,
  20: 20,
  24: 24,
};
