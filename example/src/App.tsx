import * as React from 'react';

import { ThemeProvider } from '../../src/theme/themeManagement';
import Testing from './testingPage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SnackBar, TriggerProvider } from '../../src/components';
import { SecondScreen } from './secondScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { VibrationProvider } from '../../src/theme/vibrationManagement';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

type RootStackParamList = {
  Home: undefined;
  secondScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <VibrationProvider>
        <ThemeProvider>
          <TriggerProvider>
            <SafeAreaProvider>
              <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                  <Stack.Screen name="Home" component={Testing} />
                  <Stack.Screen name="secondScreen" component={SecondScreen} />
                </Stack.Navigator>
              </NavigationContainer>

              <SnackBar delay={5000} animatedHeight={80} />
            </SafeAreaProvider>
          </TriggerProvider>
        </ThemeProvider>
      </VibrationProvider>
    </GestureHandlerRootView>
  );
}
