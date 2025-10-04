import React from 'react';
import { createPortal } from 'react-dom';

import { useScrollLock } from '../../hooks/useScrollLock';

import styles from './index.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
}) => {
  useScrollLock(isOpen);

  if (!isOpen) return null;

  const modalContent = (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Закрыть"
          >
            X
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
