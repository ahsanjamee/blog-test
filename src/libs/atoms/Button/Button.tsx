import type { FC } from 'react';

type Props = {
  variant: 'primary';
  text?: string;
  height?: string;
  onClick?: (e?: any) => void;
  padding?: string;
  width?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  type?: 'submit' | 'button';
  margin?: string;
};

const Button: FC<Props> = ({ variant, height, onClick, padding, width, text, icon, type, margin, disabled }) => {
  const buttonClasses = ['button', `button--${variant}`, `${disabled ? 'button--disabled' : ''}`];
  const iconClasses = ['button__icon'];
  const textClasses = ['button__text'];

  if (text) {
    textClasses.push(`button__text--${variant}`);
  }

  return (
    <button
      disabled={disabled}
      className={buttonClasses.join(' ')}
      type={type}
      style={{
        height,
        width,
        padding,
        margin,
      }}
      onClick={onClick}
    >
      {icon && (
        <>
          <span className={iconClasses.join(' ')}>{icon}</span>&nbsp;
        </>
      )}
      {text && <span className={textClasses.join(' ')}>{text}</span>}
    </button>
  );
};

export default Button;
