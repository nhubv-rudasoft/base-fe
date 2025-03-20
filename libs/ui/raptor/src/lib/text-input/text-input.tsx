'use client';

import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@libs/utils';

export type TextInputLoadingMode = 'replace' | 'append' | 'icon-only';

export interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Optional label for the input
   */
  label?: string;
  /**
   * Size of the input field
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Variant style of the input
   */
  variant?: 'default' | 'outline' | 'filled';
  /**
   * Icon to display at the start of the input
   */
  startIcon?: React.ReactNode;
  /**
   * Icon to display at the end of the input
   */
  endIcon?: React.ReactNode;
  /**
   * Additional class names to apply
   */
  className?: string;
  /**
   * Container class for the entire component including label
   */
  containerClassName?: string;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Helper text to display below the input
   */
  helperText?: string;
  /**
   * Whether the input is in a loading state
   */
  isLoading?: boolean;
  /**
   * How to display loading state when icons exist
   * - replace: Replace existing icon with loading icon (default)
   * - append: Show loading icon next to existing icon
   * - icon-only: Only animate existing icon without loading icon
   */
  loadingMode?: TextInputLoadingMode;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      size = 'md',
      variant = 'default',
      startIcon,
      endIcon,
      className,
      containerClassName,
      error,
      helperText,
      isLoading = false,
      loadingMode = 'replace',
      disabled,
      ...props
    },
    ref
  ) => {
    // Size classes
    const sizeClasses = {
      sm: 'h-8 text-xs px-2',
      md: 'h-10 text-sm px-3',
      lg: 'h-12 text-base px-4',
    };

    // Icon size based on input size
    const iconSizes = {
      sm: 14,
      md: 16,
      lg: 18,
    };

    // Variant classes with reduced focus-ring
    const variantClasses = {
      default: 'border-neutral300 focus:border-primary focus:ring-primary',
      outline: 'bg-transparent border-neutral300 focus:border-primary focus:ring-primary',
      filled: 'bg-neutral100 border-transparent focus:bg-white focus:border-primary',
    };

    // Determine if the input has an error
    const hasError = !!error;

    // Adjusted focus ring styles - reduced opacity and thickness
    const focusRingClasses = 'focus:ring-1 focus:ring-opacity-30';

    // Handle loading or disabled states
    const isDisabled = disabled || isLoading;

    return (
      <div className={cn('flex flex-col space-y-1', containerClassName)}>
        {label && (
          <label htmlFor={props.id} className='text-sm font-medium text-neutral700'>
            {label}
          </label>
        )}
        <div className='relative flex items-center'>
          {/* Show start icon only when not loading */}
          {startIcon && !isLoading && (
            <div className='absolute left-3 flex items-center pointer-events-none text-neutral500'>
              {startIcon}
            </div>
          )}

          {/* Show loading icon when in loading state */}
          {isLoading && (
            <div className='absolute left-3 flex items-center pointer-events-none text-primary animate-spin'>
              <Loader2 size={iconSizes[size]} />
            </div>
          )}

          <input
            ref={ref}
            className={cn(
              'w-full rounded-md border transition-colors outline-none',
              focusRingClasses,
              sizeClasses[size],
              variantClasses[variant],
              (startIcon || isLoading) && 'pl-10',
              endIcon && !isLoading && 'pr-10',
              isLoading && endIcon && 'pr-10',
              hasError && 'border-error focus:border-error focus:ring-error',
              isDisabled && 'bg-neutral100 text-neutral500 cursor-not-allowed',
              className
            )}
            disabled={isDisabled}
            {...props}
          />

          {/* Show end icon only when not loading */}
          {endIcon && !isLoading && (
            <div className='absolute right-3 flex items-center pointer-events-none text-neutral500'>
              {endIcon}
            </div>
          )}

          {/* Show loading at end if we have end icon and we're in loading state */}
          {isLoading && endIcon && (
            <div className='absolute right-3 flex items-center pointer-events-none text-primary animate-spin'>
              <Loader2 size={iconSizes[size]} />
            </div>
          )}
        </div>

        {(helperText || error) && (
          <p className={cn('text-xs', hasError ? 'text-error' : 'text-neutral500')}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';

export { TextInput };
