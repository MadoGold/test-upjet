import styles from './index.module.css';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export const Button = ({
  onClick,
  children,
  className,
  ...props
}: ButtonProps) => {
  const buttonClassName = className
    ? `${styles.button} ${className}`
    : styles.button;

  return (
    <button
      className={buttonClassName}
      onClick={onClick}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};
