import React, { createContext, ReactNode, useContext, useState } from 'react';

interface TriggerContextType {
  trigger: () => void;
  setTrigger: (fn: () => void) => void;
  snackBarType: string;
  setSnackBarType: (type: string) => void;
  snackBarTitle: string;
  setSnackBarTitle: (type: string) => void;
}

const TriggerContext = createContext<TriggerContextType | undefined>(undefined);

type TriggerProviderProps = {
  children: ReactNode;
};

export const TriggerProvider: React.FunctionComponent<TriggerProviderProps> = ({
  children,
}) => {
  const [trigger, setTrigger] = useState<() => void>(() => () => {});
  const [snackBarType, setSnackBarType] = useState<string>('');
  const [snackBarTitle, setSnackBarTitle] = useState<string>('');

  return (
    <TriggerContext.Provider
      value={{
        trigger,
        setTrigger,
        snackBarType,
        setSnackBarType,
        snackBarTitle,
        setSnackBarTitle,
      }}
    >
      {children}
    </TriggerContext.Provider>
  );
};

export const useTrigger = () => {
  const context = useContext(TriggerContext);
  if (!context) {
    throw new Error('useTrigger must be used within a TriggerProvider');
  }
  return context;
};
