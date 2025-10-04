import { useEffect } from 'react';

// Хук для блокировки скролла при открытии модального окна
export const useScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    if (isLocked) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = 'hidden';

      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    };
  }, [isLocked]);
};
