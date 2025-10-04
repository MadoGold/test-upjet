import React from 'react';
import { useDispatch } from 'react-redux';

import { addUser, updateUser } from '../../store/users/usersSlice';

import { Modal } from '../../ui/Modal';

import { UserForm } from '../UserForm';

import { UserFormData } from '../../schemas/userSchema';

import { User, UserRole } from '../../types/user';

import { generateUserId } from '../../utils/generateId';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  user?: User | null;
}

export const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  mode,
  user,
}) => {
  const dispatch = useDispatch();

  const handleSubmit = (formData: UserFormData) => {
    if (mode === 'add') {
      const newUser: User = {
        id: generateUserId(),
        ...formData,
        role: formData.role as UserRole,
      };
      dispatch(addUser(newUser));
    } else if (mode === 'edit' && user) {
      const updatedUser: User = {
        ...user,
        ...formData,
        role: formData.role as UserRole,
      };
      dispatch(updateUser(updatedUser));
    }
    onClose();
  };

  // Подготавливаем данные для формы
  const initialData: Partial<UserFormData> =
    mode === 'edit' && user
      ? {
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
        }
      : {};

  const getModalTitle = () => {
    return mode === 'add'
      ? 'Добавить пользователя'
      : 'Редактировать пользователя';
  };

  const getSubmitButtonText = () => {
    return mode === 'add' ? 'Добавить пользователя' : 'Сохранить изменения';
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={getModalTitle()}>
      <UserForm
        onSubmit={handleSubmit}
        onCancel={onClose}
        initialData={initialData}
        submitButtonText={getSubmitButtonText()}
      />
    </Modal>
  );
};
