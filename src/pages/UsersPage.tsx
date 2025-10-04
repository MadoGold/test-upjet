import { UsersTable } from '../components';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const UsersPage = () => {
  const users = useSelector((state: RootState) => state.users.value);

  return (
    <div className="container">
      <UsersTable users={users} />
    </div>
  );
};
