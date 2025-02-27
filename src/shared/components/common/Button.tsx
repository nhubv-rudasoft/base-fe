import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isFullWidth?: boolean;
  isLoading?: boolean;
}

const buttonVariants = {
  default: 'bg-white text-black hover:bg-gray-50 border border-gray-300',
  primary: 'bg-blue-500 text-white border border-blue-500 hover:bg-blue-600 hover:border-blue-600',
  secondary: 'bg-secondary text-primary border border-secondary hover:bg-secondary/80 hover:border-secondary/80',
  danger: 'bg-danger text-white border border-danger hover:bg-danger/80 hover:border-danger/80',
};

const buttonSizes = {
  small: 'h-8 px-4 py-1.5 text-xs',
  medium: 'h-10 px-6 py-2 text-sm',
  large: 'h-12 px-8 py-2.5 text-base',
};

const buttonIconPositions = {
  left: 'flex items-center gap-2',
  right: 'flex items-center gap-2',
};

const buttonFullWidth = {
  true: 'w-full',
  false: '',
};

export default function Button({ type = 'button', children, onClick, disabled, className, variant = 'primary', size = 'medium', icon, iconPosition = 'left', isFullWidth = true, isLoading = false }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-md font-medium flex items-center justify-center cursor-pointer hover:shadow-sm transition-all duration-300 ${buttonVariants[variant]} ${buttonSizes[size]} ${buttonIconPositions[iconPosition]} ${buttonFullWidth[isFullWidth ? 'true' : 'false']} ${className}`}
    >
      <>
        {icon && iconPosition === 'left' && (
          <>
            {isLoading ? (
              <div className='animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white' />
            ) : (
              icon
            )}
          </>
        )}
        {children}
        {icon && iconPosition === 'right' && icon}
      </>
    </button>
  );
}

