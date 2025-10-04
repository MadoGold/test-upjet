import { Routes, Route } from 'react-router-dom';

import { UsersPage, NotFoundPage } from './pages';

import { Layout } from './components';

export const App = () => {
  return (
    <Layout>
      <Routes>
        <Route index element={<UsersPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
};
