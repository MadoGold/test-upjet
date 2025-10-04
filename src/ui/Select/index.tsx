import React from 'react';

import styles from './index.module.css';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  required?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  required = false,
  options,
  placeholder,
  className = '',
  id,
  ...props
}) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={selectId} className={styles.label}>
          {label} {required && '*'}
        </label>
      )}
      <select
        id={selectId}
        className={`${styles.select} ${
          error ? styles.inputError : ''
        } ${className}`}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};
