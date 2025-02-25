import { ReactNode } from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

export const Button = ({ type = 'button', children, onClick, disabled }: ButtonProps) => (
  <button
    type={type}
    className='bg-primary text-secondary rounded-md px-4 py-2 font-sans text-lg'
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);
