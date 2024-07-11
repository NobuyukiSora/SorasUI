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
  26: 26,
  30: 30,
  36: 36,
  40: 40,
  50: 50,
};
