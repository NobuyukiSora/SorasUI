import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

type ThemeContextType = {
  theme: any;
  customColors: any;
  toggleTheme: (data: any) => void;
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
export let themeColors = { background: '', text: '' };

// If the color changed
const setThemeColors = (isDark: boolean, customColors: any) => {
  themeColors = {
    background: isDark ? 'black' : 'white',
    ...customColors,
  };
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState({
    isDark: true,
  });

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('APP_THEME');
      if (storedTheme) {
        setTheme({ isDark: storedTheme === 'true' ? true : false });
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async (data: any) => {
    setTheme(() => ({ isDark: !data }));
    await AsyncStorage.setItem('APP_THEME', JSON.stringify(!data));
  };

  const customColors = (getColors: any) => {
    setThemeColors(theme.isDark, getColors);
  };

  return (
    <ThemeContext.Provider value={{ theme, customColors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
