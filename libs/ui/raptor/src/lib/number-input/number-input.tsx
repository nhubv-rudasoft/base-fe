'use client';

import * as React from 'react';
import { cn } from '@libs/utils';
import { debounce } from 'lodash-es';

/* ---------------------------------- Types ---------------------------------- */

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'size'> {
  /** Label hiển thị phía trên input */
  label?: string;
  /** Locale để format số, ảnh hưởng đến dấu phân cách thập phân và hàng nghìn */
  locale?: 'en-US' | 'vi-VN';
  /** Giá trị của input */
  value?: number | null;
  /** Callback được gọi khi giá trị thay đổi */
  onChange?: (value: number | null) => void;
  /** Số chữ số thập phân tối đa */
  decimalPlaces?: number;
  /** Cho phép nhập số âm */
  allowNegative?: boolean;
  /** Kích thước của input */
  size?: 'sm' | 'md' | 'lg';
  /** Variant của input */
  variant?: 'default' | 'outline' | 'filled';
  /** Icon hiển thị ở đầu input */
  startIcon?: React.ReactNode;
  /** Icon hiển thị ở cuối input */
  endIcon?: React.ReactNode;
  /** Custom className cho input */
  className?: string;
  /** Custom className cho container */
  containerClassName?: string;
  /** Thông báo lỗi */
  error?: string;
  /** Text gợi ý hiển thị phía dưới input */
  helperText?: string;
  /** Giá trị nhỏ nhất có thể nhập */
  min?: number;
  /** Giá trị lớn nhất có thể nhập */
  max?: number;
}

/* ---------------------------------- Styles --------------------------------- */

const styles = {
  base: {
    input: 'w-full rounded-md border transition-colors outline-none',
    container: 'flex flex-col space-y-1',
    label: 'text-sm font-medium text-neutral700',
    helperText: 'text-xs',
    iconWrapper: 'absolute flex items-center pointer-events-none text-neutral500',
  },
  size: {
    sm: 'h-8 text-xs px-2',
    md: 'h-10 text-sm px-3',
    lg: 'h-12 text-base px-4',
  },
  variant: {
    default: 'border-neutral300 focus:border-primary focus:ring-primary',
    outline: 'bg-transparent border-neutral300 focus:border-primary focus:ring-primary',
    filled: 'bg-neutral100 border-transparent focus:bg-white focus:border-primary',
  },
};

/* -------------------------------- Utilities ------------------------------- */

const formatNumber = (
  value: string,
  locale: 'en-US' | 'vi-VN',
  cursorPosition: number | null
): { formattedValue: string; newCursorPosition: number } => {
  if (!value) return { formattedValue: '', newCursorPosition: 0 };

  const decimalSeparator = locale === 'vi-VN' ? ',' : '.';
  const groupingSeparator = locale === 'vi-VN' ? '.' : ',';
  const isNegative = value.startsWith('-');

  // Split into integer and decimal parts
  const parts = value.split(decimalSeparator);
  const integerPart = (isNegative ? parts[0].slice(1) : parts[0]).replace(/\D/g, '') || '';
  const decimalPart = parts.length > 1 ? parts[1].replace(/\D/g, '') : '';

  // Format integer part (group 3 digits from right to left)
  let formattedInteger = '';
  for (let i = integerPart.length - 1, count = 0; i >= 0; i--) {
    formattedInteger = integerPart[i] + formattedInteger;
    count++;
    if (count % 3 === 0 && i > 0) {
      formattedInteger = groupingSeparator + formattedInteger;
    }
  }

  // Combine with negative sign and decimal part
  let formattedValue = '';
  if (value.endsWith(decimalSeparator)) {
    // Keep the decimal separator if it's the last character
    formattedValue = `${isNegative ? '-' : ''}${formattedInteger || '0'}${decimalSeparator}`;
  } else if (decimalPart || parts.length > 1) {
    // Include decimal part if it exists or if there was a decimal separator
    formattedValue = `${isNegative ? '-' : ''}${formattedInteger || '0'}${decimalSeparator}${decimalPart}`;
  } else {
    formattedValue = `${isNegative ? '-' : ''}${formattedInteger || ''}`;
  }

  // Calculate new cursor position
  let newCursorPosition = cursorPosition ?? formattedValue.length;
  if (cursorPosition !== null) {
    const digitsBeforeCursorInInteger = parts[0].replace(/\D/g, '').length;
    const separatorsBeforeCursor = integerPart
      ? Math.floor((digitsBeforeCursorInInteger - (isNegative ? 1 : 0) - 1) / 3)
      : 0;

    if (parts.length > 1 && cursorPosition > parts[0].length) {
      // Cursor in decimal part
      const decimalOffset = cursorPosition - parts[0].length - 1;
      newCursorPosition =
        (isNegative ? 1 : 0) + (formattedInteger || '0').length + 1 + decimalOffset;
    } else {
      // Cursor in integer part
      newCursorPosition = cursorPosition + Math.max(0, separatorsBeforeCursor);
    }
  }

  return {
    formattedValue,
    newCursorPosition: Math.min(newCursorPosition, formattedValue.length),
  };
};

/* -------------------------------- Component ------------------------------- */

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      label,
      className,
      containerClassName,
      locale = 'en-US',
      value = null,
      onChange,
      decimalPlaces = 2,
      allowNegative = true,
      size = 'md',
      variant = 'default',
      startIcon,
      endIcon,
      error,
      helperText,
      disabled,
      min,
      max,
      ...props
    },
    ref
  ) => {
    const [displayValue, setDisplayValue] = React.useState<string>('');
    const [isFocused, setIsFocused] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement | null>(null);

    // Cache formatter để tránh tạo mới mỗi lần render
    const formatter = React.useMemo(
      () =>
        new Intl.NumberFormat(locale, {
          minimumFractionDigits: 0,
          maximumFractionDigits: decimalPlaces,
          useGrouping: true,
        }),
      [locale, decimalPlaces]
    );

    // Debounce handleChange để tránh re-render quá nhiều
    const debouncedOnChange = React.useMemo(
      () =>
        debounce((value: number | null) => {
          onChange?.(value);
        }, 150),
      [onChange]
    );

    React.useEffect(() => {
      if (value !== null) {
        setDisplayValue(formatter.format(value));
      } else {
        setDisplayValue('');
      }
    }, [value, formatter]);

    // Cleanup debounce on unmount
    React.useEffect(() => {
      return () => {
        debouncedOnChange.cancel();
      };
    }, [debouncedOnChange]);

    const validateValue = (value: number): boolean => {
      if (min !== undefined && value < min) return false;
      if (max !== undefined && value > max) return false;
      return true;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let inputValue = e.target.value;
      const cursorPosition = e.target.selectionStart;
      const decimalSeparator = locale === 'vi-VN' ? ',' : '.';

      // Allow empty input
      if (!inputValue) {
        setDisplayValue('');
        debouncedOnChange(null);
        return;
      }

      // Filter input but preserve decimal separator
      const allowedChars = allowNegative ? `0-9\\${decimalSeparator}-` : `0-9\\${decimalSeparator}`;
      const regex = new RegExp(`[^${allowedChars}]`, 'g');

      // Special handling for decimal separator
      const decimalParts = inputValue.split(decimalSeparator);
      if (decimalParts.length > 2) {
        // Keep only first occurrence of decimal separator
        inputValue = decimalParts[0] + decimalSeparator + decimalParts.slice(1).join('');
      }

      inputValue = inputValue
        .replace(regex, '') // Remove invalid characters
        .replace(/^(-?)0+(\d)/, '$1$2') // Remove leading zeros after minus sign
        .replace(/(?!^)-/g, ''); // Only allow minus sign at the start

      // Format the number
      const { formattedValue, newCursorPosition } = formatNumber(
        inputValue,
        locale,
        cursorPosition
      );

      setDisplayValue(formattedValue);

      // Update cursor position
      requestAnimationFrame(() => {
        if (inputRef.current) {
          inputRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
        }
      });

      // Parse and call onChange
      if (
        formattedValue === '' ||
        formattedValue === '-' ||
        formattedValue.endsWith(decimalSeparator)
      ) {
        debouncedOnChange(null);
        return;
      }

      const cleanValue = formattedValue
        .replace(new RegExp(`[${locale === 'vi-VN' ? '.' : ','}]`, 'g'), '')
        .replace(decimalSeparator, '.');
      const parsedNumber = parseFloat(cleanValue);

      if (!isNaN(parsedNumber)) {
        // Validate min/max before calling onChange
        if (validateValue(parsedNumber)) {
          debouncedOnChange(parsedNumber);
        } else {
          // If value is invalid, keep the display value but don't call onChange
          setDisplayValue(formattedValue);
        }
      } else {
        debouncedOnChange(null);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);

      if (!displayValue) {
        setDisplayValue('');
        onChange?.(null);
        return;
      }

      const decimalSeparator = locale === 'vi-VN' ? ',' : '.';
      const groupingSeparator = locale === 'vi-VN' ? '.' : ',';

      // Remove grouping separators and normalize decimal separator
      const cleanValue = displayValue
        .replace(new RegExp(`\\${groupingSeparator}`, 'g'), '')
        .replace(decimalSeparator, '.');

      // Handle special cases
      if (cleanValue === '.' || cleanValue === '-' || cleanValue === '-.') {
        setDisplayValue('');
        onChange?.(null);
        return;
      }

      const parsedNumber = parseFloat(cleanValue);

      if (isNaN(parsedNumber)) {
        setDisplayValue('');
        onChange?.(null);
      } else {
        // Validate min/max
        if (validateValue(parsedNumber)) {
          const formattedValue = formatter.format(parsedNumber);
          setDisplayValue(formattedValue);
          onChange?.(parsedNumber);
        } else {
          // Reset to previous valid value or empty
          setDisplayValue('');
          onChange?.(null);
        }
      }
      props.onBlur?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const focusRingClasses = 'focus:ring-1 focus:ring-opacity-30';
    const hasError = !!error;

    return (
      <div className={cn(styles.base.container, containerClassName)}>
        {label && (
          <label htmlFor={props.id} className={styles.base.label}>
            {label}
          </label>
        )}
        <div className='relative flex items-center'>
          {startIcon && <div className={cn(styles.base.iconWrapper, 'left-3')}>{startIcon}</div>}

          <input
            {...props}
            ref={node => {
              inputRef.current = node;
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
            }}
            type='text'
            inputMode='decimal'
            value={displayValue}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            aria-label={!label ? props['aria-label'] || 'number input' : undefined}
            aria-invalid={hasError}
            aria-describedby={
              error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined
            }
            className={cn(
              styles.base.input,
              focusRingClasses,
              styles.size[size],
              styles.variant[variant],
              startIcon && 'pl-10',
              endIcon && 'pr-10',
              hasError && 'border-error focus:border-error focus:ring-error',
              disabled && 'bg-neutral100 text-neutral500 cursor-not-allowed',
              className
            )}
            disabled={disabled}
          />

          {endIcon && <div className={cn(styles.base.iconWrapper, 'right-3')}>{endIcon}</div>}
        </div>

        {(helperText || error) && (
          <p
            className={cn(styles.base.helperText, hasError ? 'text-error' : 'text-neutral500')}
            id={error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

NumberInput.displayName = 'NumberInput';
