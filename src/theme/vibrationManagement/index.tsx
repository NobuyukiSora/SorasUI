import React, { createContext, useContext, useState } from 'react';

interface VibrationContextProps {
  isVibrationEnabled: boolean;
  vibrationDuration: number;
  toggleVibration: () => void;
  setVibrationDuration: (duration: number) => void;
}

const VibrationContext = createContext<VibrationContextProps | undefined>(
  undefined
);

export const VibrationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isVibrationEnabled, setIsVibrationEnabled] = useState<boolean>(true);
  const [vibrationDuration, setVibrationDuration] = useState<number>(50);

  const toggleVibration = () => setIsVibrationEnabled((prev) => !prev);

  return (
    <VibrationContext.Provider
      value={{
        isVibrationEnabled,
        vibrationDuration,
        toggleVibration,
        setVibrationDuration,
      }}
    >
      {children}
    </VibrationContext.Provider>
  );
};

export const useVibration = () => {
  const context = useContext(VibrationContext);
  if (!context) {
    throw new Error('useVibration must be used within a VibrationProvider');
  }
  return context;
};
