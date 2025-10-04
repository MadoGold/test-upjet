import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../store';
import { deleteUser, resetPaginationFlag } from '../../store/users/usersSlice';

import { Button, Pagination } from '../../ui';

import { UserModal } from '../../components';

import { usePagination } from '../../hooks/usePagination';

import { User } from '../../types/user';

import { PAGINATION } from '../../constants';

import styles from './index.module.css';

export const UsersTable = ({ users }: { users: User[] }) => {
  const dispatch = useDispatch();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const resetPagination = useSelector(
    (state: RootState) => state.users.resetPagination,
  );

  const { currentPage, totalPages, paginatedData, goToPage } = usePagination({
    data: users,
    itemsPerPage: PAGINATION.ITEMS_PER_PAGE,
  });

  useEffect(() => {
    if (resetPagination) {
      goToPage(1);
      dispatch(resetPaginationFlag());
    }
  }, [resetPagination, goToPage, dispatch]);

  const handleDeleteUser = (id: string) => {
    dispatch(deleteUser(id));
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.nameColumn}>Name</th>
            <th className={styles.emailColumn}>Email</th>
            <th className={styles.phoneColumn}>Phone</th>
            <th className={styles.roleColumn}>Role</th>
            <th className={styles.actionsColumn}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((user) => (
            <tr key={user.id}>
              <td className={styles.nameColumn}>{user.name}</td>
              <td className={styles.emailColumn}>{user.email}</td>
              <td className={styles.phoneColumn}>{user.phone}</td>
              <td className={styles.roleColumn}>{user.role}</td>
              <td className={styles.actionsColumn}>
                <div className={styles.actions}>
                  <Button onClick={() => handleDeleteUser(user.id)}>
                    Delete
                  </Button>
                  <Button onClick={() => handleEditUser(user)}>Edit</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
      />
      <UserModal
        isOpen={isUpdateModalOpen}
        onClose={handleCloseUpdateModal}
        mode="edit"
        user={selectedUser}
      />
    </>
  );
};
