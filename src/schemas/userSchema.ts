import { z } from 'zod';

export const userRoleSchema = z
  .string()
  .refine((val) => ['Admin', 'User', 'Manager'].includes(val), {
    message: 'Выберите роль',
  });

export const userFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(50, 'Имя не должно превышать 50 символов'),
  email: z.string().email('Введите корректный email адрес'),
  phone: z.string().refine(
    (val) => {
      const clean = val.replace(/[^\d+]/g, '');
      return /^\+7\d{10}$/.test(clean);
    },
    { message: 'Введите корректный российский номер телефона' },
  ),
  role: userRoleSchema,
});

export type UserFormData = z.infer<typeof userFormSchema>;
