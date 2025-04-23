import { ReactNode } from 'react';

export interface ModalSheetProps {
  children: ReactNode;
  onClose?: () => void;
  isVisible: boolean;
  type?: 'bottom' | 'center';
}
