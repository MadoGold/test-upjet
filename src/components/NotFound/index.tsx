import { Link } from 'react-router-dom';

import styles from './index.module.css';

export const NotFound = () => {
  return (
    <div className={styles.content}>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.subtitle}>Страница не найдена</h2>
      <p className={styles.description}>
        Извините, запрашиваемая страница не существует или была перемещена.
      </p>
      <Link to="/" className={styles.link}>
        Вернуться на главную
      </Link>
    </div>
  );
};
