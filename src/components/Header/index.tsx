import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../../ui';

import { UserModal } from '../../components';

import styles from './index.module.css';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAddUser = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <header>
      <div className="container">
        <div className={styles.header}>
          <Link to="/" className={styles.title}>
            Users
          </Link>
          <Button onClick={handleAddUser}>Add User</Button>
        </div>
      </div>
      <UserModal isOpen={isOpen} onClose={handleCloseModal} mode="add" />
    </header>
  );
};
