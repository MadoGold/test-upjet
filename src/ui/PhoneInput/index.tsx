import React, { useCallback } from 'react';
import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form';

import styles from './index.module.css';

import { DEFAULT_VALUES } from '../../constants';

interface PhoneInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
}

export const PhoneInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder = DEFAULT_VALUES.PHONE_PLACEHOLDER,
  error,
  required = false,
}: PhoneInputProps<T>) => {
  const inputId = `phone-input-${Math.random().toString(36).substr(2, 9)}`;

  const formatPhoneNumber = useCallback((value: string) => {
    // Убираем все символы кроме цифр
    const digits = value.replace(/\D/g, '');

    // Обрабатываем разные форматы
    let cleanDigits = digits;
    if (digits.startsWith('8')) {
      cleanDigits = '7' + digits.slice(1);
    } else if (digits.startsWith('7')) {
      cleanDigits = digits;
    } else if (digits.length > 0) {
      cleanDigits = '7' + digits;
    }

    // Форматируем номер
    if (cleanDigits.length >= 1) {
      if (cleanDigits.length <= 1) {
        return '+7';
      } else if (cleanDigits.length <= 4) {
        return `+7 (${cleanDigits.slice(1)}`;
      } else if (cleanDigits.length <= 7) {
        return `+7 (${cleanDigits.slice(1, 4)}) ${cleanDigits.slice(4)}`;
      } else if (cleanDigits.length <= 9) {
        return `+7 (${cleanDigits.slice(1, 4)}) ${cleanDigits.slice(
          4,
          7,
        )}-${cleanDigits.slice(7)}`;
      } else {
        return `+7 (${cleanDigits.slice(1, 4)}) ${cleanDigits.slice(
          4,
          7,
        )}-${cleanDigits.slice(7, 9)}-${cleanDigits.slice(9, 11)}`;
      }
    }

    return value;
  }, []);

  const handleInputChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      onChange: (value: string) => void,
    ) => {
      const formatted = formatPhoneNumber(e.target.value);
      onChange(formatted);
    },
    [formatPhoneNumber],
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={styles.field}>
          {label && (
            <label htmlFor={inputId} className={styles.label}>
              {label} {required && '*'}
            </label>
          )}
          <input
            {...field}
            id={inputId}
            type="tel"
            className={`${styles.input} ${error ? styles.inputError : ''}`}
            placeholder={placeholder}
            onChange={(e) => handleInputChange(e, field.onChange)}
            value={field.value || DEFAULT_VALUES.PHONE_PREFIX}
          />
          {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
      )}
    />
  );
};
