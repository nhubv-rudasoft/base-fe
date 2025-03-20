'use client';

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';
import { cn } from '@libs/utils';

export type RadioGroupSize = 'sm' | 'md' | 'lg';
export type RadioGroupVariant = 'default' | 'outline' | 'filled';
export type RadioGroupOrientation = 'horizontal' | 'vertical';

export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  /**
   * Size of the radio group items
   */
  size?: RadioGroupSize;
  /**
   * Variant style of the radio group
   */
  variant?: RadioGroupVariant;
  /**
   * Optional label for the radio group
   */
  label?: string;
  /**
   * Helper text to display below the radio group
   */
  helperText?: string;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Layout orientation of the radio group
   */
  orientation?: RadioGroupOrientation;
  /**
   * Additional class names for the container
   */
  containerClassName?: string;
  /**
   * Additional class names for the radio group
   */
  className?: string;
}

export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  /**
   * Size of the radio item
   */
  size?: RadioGroupSize;
  /**
   * Variant style of the radio item
   */
  variant?: RadioGroupVariant;
  /**
   * Label for the radio item
   */
  label: string;
  /**
   * Description text for the radio item
   */
  description?: string;
}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(
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
      ...props
    },
    ref
  ) => {
    // Size classes for radio items
    const sizeClasses: Record<RadioGroupSize, string> = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    };

    // Size classes for radio item labels
    const labelSizeClasses: Record<RadioGroupSize, string> = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    };

    // Variant classes
    const variantClasses: Record<RadioGroupVariant, string> = {
      default:
        'border-neutral300 text-neutral800 data-[state=checked]:border-primary data-[state=checked]:text-primary',
      outline:
        'border-2 border-neutral300 text-neutral800 data-[state=checked]:border-primary data-[state=checked]:text-primary',
      filled:
        'bg-neutral100 border-transparent text-neutral800 data-[state=checked]:bg-primary/10 data-[state=checked]:border-primary data-[state=checked]:text-primary',
    };

    // Determine if the group has an error
    const hasError = !!error;

    return (
      <div className={cn('flex flex-col space-y-2', containerClassName)}>
        {label && <label className='text-sm font-medium text-neutral700'>{label}</label>}
        <RadioGroupPrimitive.Root
          ref={ref}
          className={cn(
            'flex gap-3',
            orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
            className
          )}
          {...props}
        >
          {React.Children.map(children, child => {
            if (React.isValidElement<RadioGroupItemProps>(child)) {
              return React.cloneElement(child, {
                ...child.props,
                size: child.props.size || size,
                variant: child.props.variant || variant,
              });
            }
            return child;
          })}
        </RadioGroupPrimitive.Root>
        {(helperText || error) && (
          <p className={cn('text-xs', hasError ? 'text-error' : 'text-neutral500')}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ size = 'md', variant = 'default', label, description, className, ...props }, ref) => {
  // Size classes for radio items
  const sizeClasses: Record<RadioGroupSize, string> = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  // Size classes for indicator
  const indicatorSizeClasses: Record<RadioGroupSize, string> = {
    sm: 'h-2 w-2',
    md: 'h-2.5 w-2.5',
    lg: 'h-3 w-3',
  };

  // Size classes for labels
  const labelSizeClasses: Record<RadioGroupSize, string> = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  // Description size classes
  const descriptionSizeClasses: Record<RadioGroupSize, string> = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  // Variant classes
  const variantClasses: Record<RadioGroupVariant, string> = {
    default:
      'border-neutral300 text-neutral800 data-[state=checked]:border-primary data-[state=checked]:text-primary',
    outline:
      'border-2 border-neutral300 text-neutral800 data-[state=checked]:border-primary data-[state=checked]:text-primary',
    filled:
      'bg-neutral100 border-transparent text-neutral800 data-[state=checked]:bg-primary/10 data-[state=checked]:border-primary data-[state=checked]:text-primary',
  };

  return (
    <label htmlFor={props.id} className='flex items-center space-x-3 cursor-pointer'>
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(
          'aspect-square rounded-full border ring-offset-background transition-colors disabled:cursor-not-allowed disabled:opacity-50',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className='flex items-center justify-center'>
          <Circle className={cn('fill-current text-current', indicatorSizeClasses[size])} />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
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
          <p className={cn('text-neutral500 mt-1', descriptionSizeClasses[size])}>{description}</p>
        )}
      </div>
    </label>
  );
});

RadioGroupItem.displayName = 'RadioGroupItem';

export { RadioGroup, RadioGroupItem };
