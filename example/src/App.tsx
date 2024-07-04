import * as React from 'react';

import { ThemeProvider } from '../../src/theme/themeManagement';
import Testing from './testingPage';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <Testing></Testing>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
