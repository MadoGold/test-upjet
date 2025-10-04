import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { userFormSchema, UserFormData } from '../../schemas/userSchema';

import { Button, Input, Select, PhoneInput } from '../../ui';

import { UserRole } from '../../types/user';

import { DEFAULT_VALUES } from '../../constants';

import styles from './index.module.css';

interface UserFormProps {
  onSubmit: (data: UserFormData) => void;
  onCancel?: () => void;
  initialData?: Partial<UserFormData>;
  submitButtonText?: string;
}

export const UserForm: React.FC<UserFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  submitButtonText = 'Добавить пользователя',
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      phone: DEFAULT_VALUES.PHONE_PREFIX,
      ...initialData,
    },
    mode: 'onBlur',
  });

  const handleFormSubmit = async (data: UserFormData) => {
    try {
      await onSubmit(data);
      reset({ phone: DEFAULT_VALUES.PHONE_PREFIX });
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
      <Input
        label="Имя"
        type="text"
        {...register('name')}
        placeholder="Введите имя"
        error={errors.name?.message}
        required
      />

      <Input
        label="Email"
        type="email"
        {...register('email')}
        placeholder="Введите email"
        error={errors.email?.message}
        required
      />

      <PhoneInput
        control={control}
        name="phone"
        label="Телефон"
        placeholder={DEFAULT_VALUES.PHONE_PLACEHOLDER}
        error={errors.phone?.message}
        required
      />

      <Select
        label="Роль"
        {...register('role')}
        placeholder="Выберите роль"
        error={
          typeof errors.role?.message === 'string'
            ? errors.role?.message
            : undefined
        }
        required
        options={Object.values(UserRole).map((role) => ({
          value: role,
          label: role,
        }))}
      />

      <div className={styles.actions}>
        {onCancel && (
          <Button type="button" onClick={onCancel}>
            Отмена
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Сохранение...' : submitButtonText}
        </Button>
      </div>
    </form>
  );
};
