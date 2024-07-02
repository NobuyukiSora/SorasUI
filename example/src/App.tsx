import * as React from 'react';

import { ThemeProvider } from '../../src/theme/themeManagement';
import Testing from './testingPage';

export default function App() {
  return (
    <ThemeProvider>
      <Testing></Testing>
    </ThemeProvider>
  );
}
