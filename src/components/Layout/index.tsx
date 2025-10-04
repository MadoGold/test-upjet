import { Header } from '../../components';

import styles from './index.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main>{children}</main>
    </div>
  );
};
