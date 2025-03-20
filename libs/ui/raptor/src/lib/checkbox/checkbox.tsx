'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import { cn } from '@libs/utils';

export type CheckboxSize = 'sm' | 'md' | 'lg';
export type CheckboxVariant = 'default' | 'outline' | 'filled';

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  /**
   * Size of the checkbox
   */
  size?: CheckboxSize;
  /**
   * Variant style of the checkbox
   */
  variant?: CheckboxVariant;
  /**
   * Label for the checkbox
   */
  label: string;
  /**
   * Description text for the checkbox
   */
  description?: string;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Helper text to display
   */
  helperText?: string;
}

export interface CheckboxGroupProps {
  /**
   * Size of the checkbox group items
   */
  size?: CheckboxSize;
  /**
   * Variant style of the checkbox group
   */
  variant?: CheckboxVariant;
  /**
   * Optional label for the checkbox group
   */
  label?: string;
  /**
   * Helper text to display below the checkbox group
   */
  helperText?: string;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Layout orientation of the checkbox group
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Additional class names for the container
   */
  containerClassName?: string;
  /**
   * Additional class names for the checkbox group
   */
  className?: string;
  /**
   * Children elements
   */
  children: React.ReactNode;
}

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  (
    {
      size = 'md',
      variant = 'default',
      label,
      description,
      error,
      helperText,
      className,
      ...props
    },
    ref
  ) => {
    // Size classes for checkbox
    const sizeClasses: Record<CheckboxSize, string> = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    };

    // Size classes for indicator
    const indicatorSizeClasses: Record<CheckboxSize, string> = {
      sm: 'h-3 w-3',
      md: 'h-4 w-4',
      lg: 'h-5 w-5',
    };

    // Size classes for labels
    const labelSizeClasses: Record<CheckboxSize, string> = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    };

    // Description size classes
    const descriptionSizeClasses: Record<CheckboxSize, string> = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    };

    // Variant classes
    const variantClasses: Record<CheckboxVariant, string> = {
      default:
        'border-neutral300 text-neutral800 data-[state=checked]:border-primary data-[state=checked]:bg-primary',
      outline:
        'border-2 border-neutral300 text-neutral800 data-[state=checked]:border-primary data-[state=checked]:bg-primary',
      filled: 'bg-neutral100 border-transparent text-neutral800 data-[state=checked]:bg-primary',
    };

    // Determine if the checkbox has an error
    const hasError = !!error;

    return (
      <div className='flex flex-col space-y-2'>
        <label className='flex items-center space-x-3 cursor-pointer'>
          <CheckboxPrimitive.Root
            ref={ref}
            className={cn(
              'aspect-square rounded border transition-colors disabled:cursor-not-allowed disabled:opacity-50',
              sizeClasses[size],
              variantClasses[variant],
              hasError && 'border-error',
              className
            )}
            {...props}
          >
            <CheckboxPrimitive.Indicator className='flex items-center justify-center text-white'>
              <Check className={indicatorSizeClasses[size]} />
            </CheckboxPrimitive.Indicator>
          </CheckboxPrimitive.Root>
          <div className='flex flex-col justify-center'>
            <span
              className={cn(
                'font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
                labelSizeClasses[size]
              )}
            >
              {label}
            </span>
            {description && (
              <p className={cn('text-neutral500 mt-1', descriptionSizeClasses[size])}>
                {description}
              </p>
            )}
          </div>
        </label>
        {(helperText || error) && (
          <p className={cn('text-xs', hasError ? 'text-error' : 'text-neutral500')}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  (
    {
      size = 'md',
      variant = 'default',
      label,
      helperText,
      error,
      orientation = 'vertical',
      containerClassName,
      className,
      children,
    },
    ref
  ) => {
    // Determine if the group has an error
    const hasError = !!error;

    return (
      <div ref={ref} className={cn('flex flex-col space-y-2', containerClassName)}>
        {label && <label className='text-sm font-medium text-neutral700'>{label}</label>}
        <div
          className={cn(
            'flex gap-3',
            orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
            className
          )}
        >
          {React.Children.map(children, child => {
            if (React.isValidElement<CheckboxProps>(child)) {
              return React.cloneElement(child, {
                ...child.props,
                size: child.props.size || size,
                variant: child.props.variant || variant,
              });
            }
            return child;
          })}
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

CheckboxGroup.displayName = 'CheckboxGroup';

export { Checkbox, CheckboxGroup };
