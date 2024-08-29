import * as React from 'react';

import { ThemeProvider } from '../../src/theme/themeManagement';
import Testing from './testingPage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SnackBar, TriggerProvider } from '../../src/components';

export default function App() {
  return (
    <ThemeProvider>
      <TriggerProvider>
        <SafeAreaProvider>
          <Testing />
          <SnackBar delay={5000} animatedHeight={80} />
        </SafeAreaProvider>
      </TriggerProvider>
    </ThemeProvider>
  );
}
