import { Button } from '../Button';

import styles from './index.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getVisiblePages = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div>
      <div className={styles.pagination}>
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.pageButton}
        >
          Prev
        </Button>

        {visiblePages.map((page) => (
          <Button
            key={page}
            onClick={() => onPageChange(page)}
            className={`${styles.pageButton} ${
              page === currentPage ? styles.activePage : ''
            }`}
          >
            {page}
          </Button>
        ))}

        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.pageButton}
        >
          Next
        </Button>
      </div>
      <p>Total pages: {totalPages}</p>
    </div>
  );
};
