import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  ReactNode,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ALL_RATES_ENDPOINT =
  'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/latest/usd.json';
const BASE_CURRENCY_CODE = 'USD';

const STORAGE_KEY = 'selectedCurrencyCode';

const saveCurrencyAsync = async (code: string) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, code);
    console.log(`Saved new currency setting to AsyncStorage: ${code}`);
  } catch (e) {
    console.error('Failed to save currency to AsyncStorage:', e);
  }
};

const loadSavedCurrencyAsync = async (): Promise<string | null> => {
  try {
    const savedCode = await AsyncStorage.getItem(STORAGE_KEY);
    return savedCode;
  } catch (e) {
    console.error('Failed to load saved currency from AsyncStorage:', e);
    return null;
  }
};

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  locale: string;
  flag: string;
}

interface Rates {
  [key: string]: number;
}

/**
 * Simple lookup table to map common ISO 4217 Currency Codes to their primary
 * ISO 3166-1 alpha-2 Country Code for generating flags.
 * This is necessary because many currencies (like USD, EUR) are used by multiple countries.
 */
const getFlagByCurrencyCode = (currencyCode: string): string => {
  const countryCodeMap: { [key: string]: string } = {
    USD: 'US',
    EUR: 'DE',
    GBP: 'GB',
    JPY: 'JP',
    CNY: 'CN',
    IDR: 'ID',
    AUD: 'AU',

    SGD: 'SG',
    MYR: 'MY',

    CAD: 'CA',
    CHF: 'CH',
    NZD: 'NZ',
  };

  return (
    countryCodeMap[currencyCode.toUpperCase()] || currencyCode.substring(0, 2)
  );
};

/**
 * Converts a 2-letter ISO country code (e.g., 'US') into its native flag emoji (e.g., '🇺🇸').
 * This is a highly efficient, client-side conversion using Unicode Regional Indicator Symbols.
 */
const countryCodeToFlagEmoji = (countryCode: string): string => {
  if (countryCode.length !== 2) return '';

  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));

  return String.fromCodePoint(...codePoints);
};

const INITIAL_CURRENCIES: Currency[] = [
  {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    locale: 'en-US',
    flag: countryCodeToFlagEmoji('US'),
  },
  {
    code: 'GBP',
    name: 'British Pound',
    symbol: '£',
    locale: 'en-GB',
    flag: countryCodeToFlagEmoji('GB'),
  },

  {
    code: 'IDR',
    name: 'Indonesian Rupiah',
    symbol: 'Rp',
    locale: 'id-ID',
    flag: countryCodeToFlagEmoji('ID'),
  },
  {
    code: 'SGD',
    name: 'Singapore Dollar',
    symbol: 'S$',
    locale: 'en-SG',
    flag: countryCodeToFlagEmoji('SG'),
  },
  {
    code: 'MYR',
    name: 'Malaysian Ringgit',
    symbol: 'RM',
    locale: 'en-MY',
    flag: countryCodeToFlagEmoji('MY'),
  },

  {
    code: 'JPY',
    name: 'Japanese Yen',
    symbol: '¥',
    locale: 'ja-JP',
    flag: countryCodeToFlagEmoji('JP'),
  },
  {
    code: 'CNY',
    name: 'Chinese Yuan',
    symbol: '¥',
    locale: 'zh-CN',
    flag: countryCodeToFlagEmoji('CN'),
  },

  {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    locale: 'de-DE',
    flag: countryCodeToFlagEmoji('DE'),
  },
];

const getCurrencyDetails = (code: string): Partial<Currency> => {
  try {
    const formatter = new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: code,
    });
    const parts = formatter.formatToParts(0);
    const symbolPart = parts.find((p) => p.type === 'currency');
    const symbol = symbolPart ? symbolPart.value : code;
    const locale = formatter.resolvedOptions().locale;
    return { symbol, locale, name: code };
  } catch (e) {
    return { symbol: code, locale: 'en-US', name: code };
  }
};

interface CurrencyContextType {
  selectedCurrency: Currency;
  currencies: Currency[];
  rates: Rates;
  isLoaded: boolean;
  selectCurrency: (code: string) => void;
  formatCurrency: (
    amount: number,
    options?: Intl.NumberFormatOptions
  ) => string;
  convertCurrency: (
    amount: number,
    fromCode: string,
    toCode: string
  ) => number | null;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

interface CurrencyProviderProps {
  children: ReactNode;
  initialCurrencyCode?: string;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({
  children,
  initialCurrencyCode = BASE_CURRENCY_CODE,
}) => {
  const [rates, setRates] = useState<Rates>({});
  const [currencies, setCurrencies] = useState<Currency[]>(INITIAL_CURRENCIES);
  const [isLoaded, setIsLoaded] = useState(false);

  const DEFAULT_CURRENCY: Currency = {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    locale: '',
    flag: '',
  };

  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(
    INITIAL_CURRENCIES.find((c) => c.code === initialCurrencyCode) ??
      INITIAL_CURRENCIES[0] ??
      DEFAULT_CURRENCY
  );

  const findCurrencyByCode = useCallback(
    (code: string) => {
      return currencies.find((c) => c.code === code);
    },
    [currencies]
  );

  useEffect(() => {
    if (!isLoaded) return;

    const loadSavedCurrency = async () => {
      const savedCode = await loadSavedCurrencyAsync();

      if (savedCode) {
        const currency = findCurrencyByCode(savedCode);

        if (currency) {
          setSelectedCurrency(currency);
          return;
        }
      }

      const initial = findCurrencyByCode(initialCurrencyCode) || currencies[0];
      if (initial) {
        setSelectedCurrency(initial);
      }
    };

    loadSavedCurrency();
  }, [isLoaded, findCurrencyByCode, initialCurrencyCode, currencies]);

  const selectCurrency = useCallback(
    (code: string) => {
      const newCurrency = currencies.find((c) => c.code === code);
      if (newCurrency) {
        setSelectedCurrency(newCurrency);

        saveCurrencyAsync(code);
      } else {
        console.error(`Currency code ${code} not supported.`);
      }
    },
    [currencies]
  );

  const convertCurrency = useCallback(
    (amount: number, fromCode: string, toCode: string): number | null => {
      const lowerFromCode = fromCode.toLowerCase();
      const lowerToCode = toCode.toLowerCase();

      const rateFrom = rates[lowerFromCode];
      const rateTo = rates[lowerToCode];

      if (!rateFrom || !rateTo || !isLoaded) {
        console.warn(
          `Conversion failed: Rates for ${fromCode} or ${toCode} are missing or not loaded.`
        );
        return null;
      }

      const amountInBase = amount / rateFrom;
      const convertedAmount = amountInBase * rateTo;

      return parseFloat(convertedAmount.toFixed(4));
    },
    [rates, isLoaded]
  );

  const formatCurrency = useCallback(
    (amount: number, options?: Intl.NumberFormatOptions): string => {
      return new Intl.NumberFormat(selectedCurrency.locale, {
        style: 'currency',
        currency: selectedCurrency.code,
        ...options,
      }).format(amount);
    },
    [selectedCurrency]
  );

  useEffect(() => {
    const fetchRates = async () => {
      setIsLoaded(false);

      try {
        let maxRetries = 3;
        let delay = 1000;
        let data = null;

        for (let i = 0; i < maxRetries; i++) {
          try {
            const fetchResponse = await fetch(ALL_RATES_ENDPOINT);
            data = await fetchResponse.json();
            break;
          } catch (error) {
            if (i === maxRetries - 1) throw error;
            await new Promise((resolve) =>
              setTimeout(() => resolve(undefined), delay)
            );
            delay *= 2;
          }
        }

        if (!data) {
          throw new Error('Failed to fetch data after multiple retries.');
        }

        const fetchedRates = data[BASE_CURRENCY_CODE.toLowerCase()] || {};

        if (!fetchedRates[BASE_CURRENCY_CODE.toLowerCase()]) {
          fetchedRates[BASE_CURRENCY_CODE.toLowerCase()] = 1;
        }

        setRates(fetchedRates);

        const newCurrencies: Currency[] = Object.keys(fetchedRates)
          .map((code) => {
            const upperCode = code.toUpperCase();
            const details = getCurrencyDetails(upperCode);

            const countryCode = getFlagByCurrencyCode(upperCode);

            const flagEmoji = countryCodeToFlagEmoji(countryCode);

            return {
              code: upperCode,
              name: details.name || upperCode,
              symbol: details.symbol || upperCode,
              locale: details.locale || 'en-US',
              flag: flagEmoji,
            };
          })
          .sort((a, b) => a.code.localeCompare(b.code));

        setCurrencies(newCurrencies);

        setIsLoaded(true);
      } catch (error) {
        console.log('Failed to fetch exchange rates:', error);
        setIsLoaded(true);
      }
    };

    fetchRates();
  }, [initialCurrencyCode]);

  const contextValue = useMemo(
    () => ({
      selectedCurrency,
      currencies,
      rates,
      isLoaded,
      selectCurrency,
      formatCurrency,
      convertCurrency,
    }),
    [
      selectedCurrency,
      currencies,
      rates,
      isLoaded,
      selectCurrency,
      formatCurrency,
      convertCurrency,
    ]
  );

  return (
    <CurrencyContext.Provider value={contextValue}>
      {children}
    </CurrencyContext.Provider>
  );
};
