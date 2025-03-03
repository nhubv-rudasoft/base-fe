import { ReactNode, forwardRef, InputHTMLAttributes, ChangeEvent } from 'react';

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  type?: 'text' | 'email' | 'password';
  value?: string;
  icon?: ReactNode;
  onChange?: ((value: string) => void) | ((event: ChangeEvent<HTMLInputElement>) => void);
  error?: string;
  helperText?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      type,
      value,
      icon,
      onChange,
      error,
      helperText,
      className,
      inputClassName,
      labelClassName,
      onBlur,
      ...rest
    },
    ref,
  ) => (
    <div className={`flex flex-col gap-1.5 ${className || ''}`}>
      <label className={`text-sm font-medium ${labelClassName || ''}`}>{label}</label>
      <div className='flex items-center'>
        {icon}
        <input
          ref={ref}
          type={type || 'text'}
          className={`h-10 w-full rounded-sm border border-gray-300 bg-white px-3 py-2 text-sm ${error ? 'border border-red-500' : ''} ${inputClassName || ''}`}
          value={value}
          onChange={(e) => {
            if (onChange) {
              onChange(e as any);
            }
          }}
          onBlur={onBlur}
          {...rest}
        />
      </div>
      {error && <p className='text-xs text-red-500'>{error}</p>}
      {helperText && !error && <p className='text-xs text-gray-500'>{helperText}</p>}
    </div>
  ),
);

TextInput.displayName = 'TextInput';
