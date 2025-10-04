import React from 'react';

import styles from './index.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  required = false,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label} {required && '*'}
        </label>
      )}
      <input
        id={inputId}
        className={`${styles.input} ${
          error ? styles.inputError : ''
        } ${className}`}
        {...props}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};
