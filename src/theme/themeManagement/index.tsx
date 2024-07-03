import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { Colors } from '../navigatorTheme';

type ThemeContextType = {
  theme: { themeSameAsSystem: boolean; isDark: boolean };
  customColors: any;
  toggleTheme: (data: any) => void;
  toggleSystemTheme: (data: any, isDark: any) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

type ThemeProviderProps = {
  children: ReactNode;
};

// For default colors
export let themeColors = {
  background: Colors.lightCream,
  backgroundSecondary: Colors.cream,
  text: Colors.black,
  textSecondary: Colors.grey,
  active: Colors.brown,
  inActive: Colors.darkCream,
  navbarActive: Colors.lightBlue,
  green: Colors.lightGreen,
  red: Colors.red,
};

// If the color changed
const setThemeColors = (isDark: boolean, customColors: any) => {
  themeColors = {
    background: isDark ? Colors.black : Colors.lightCream,
    backgroundSecondary: isDark ? Colors.darkGrey : Colors.cream,
    text: isDark ? Colors.lightCream : Colors.black,
    textSecondary: isDark ? Colors.brown : Colors.grey,
    active: isDark ? Colors.darkBlue : Colors.brown,
    inActive: isDark ? Colors.lightBlue : Colors.darkCream,
    navbarActive: isDark ? Colors.lightBlue : Colors.lightBlue,
    green: Colors.lightGreen,
    red: Colors.red,
    ...customColors,
  };
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState({
    themeSameAsSystem: false,
    isDark: false,
  });

  useEffect(() => {
    const loadTheme = async () => {
      let storedTheme = { isDark: false, themeSameAsSystem: false };
      await AsyncStorage.getItem('APP_THEME').then((value: any) => {
        storedTheme = JSON.parse(value);
      });
      console.log('storedTheme', storedTheme);
      if (!!storedTheme) {
        setTheme(storedTheme);
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async (data: any) => {
    setTheme(() => ({ ...theme, isDark: !data }));
    await AsyncStorage.setItem(
      'APP_THEME',
      JSON.stringify({ ...theme, isDark: !data })
    );
  };

  const toggleSystemTheme = async (data: any, isDark: any) => {
    console.log('same as system: ', !data, isDark);
    setTheme({ isDark: isDark === 'dark', themeSameAsSystem: !data });
    await AsyncStorage.setItem(
      'APP_THEME',
      JSON.stringify({ isDark: isDark === 'dark', themeSameAsSystem: !data })
    );
  };

  const customColors = (getColors: any) => {
    setThemeColors(theme.isDark, getColors);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, customColors, toggleTheme, toggleSystemTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
