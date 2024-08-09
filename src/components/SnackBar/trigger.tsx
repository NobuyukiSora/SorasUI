import React, { createContext, ReactNode, useContext, useState } from 'react';

interface TriggerContextType {
  trigger: () => void;
  setTrigger: (fn: () => void) => void;
}

const TriggerContext = createContext<TriggerContextType | undefined>(undefined);

type TriggerProviderProps = {
  children: ReactNode;
};

export const TriggerProvider: React.FunctionComponent<TriggerProviderProps> = ({
  children,
}) => {
  const [trigger, setTrigger] = useState<() => void>(() => () => {});

  return (
    <TriggerContext.Provider value={{ trigger, setTrigger }}>
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
