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
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({
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
    ...rest
  }, ref) => (
    <div className={`flex flex-col gap-1.5 ${className || ''}`}>
      <label className={`text-sm font-medium ${labelClassName || ''}`}>
        {label}
      </label>
      <div className='flex items-center'>
        {icon}
        <input
          ref={ref}
          type={type || 'text'}
          className={`w-full h-10 rounded-sm border border-gray-300 bg-white py-2 px-3 text-sm ${error ? 'border border-red-500' : ''} ${inputClassName || ''}`}
          value={value}
          onChange={(e) => {
            if (onChange) {
              // @ts-ignore - This allows both our custom handler and React Hook Form handler
              onChange(e);
            }
          }}
          {...rest}
        />
      </div>
      {error && <p className='text-red-500 text-xs'>{error}</p>}
      {helperText && !error && <p className='text-gray-500 text-xs'>{helperText}</p>}
    </div>
  )
);

TextInput.displayName = 'TextInput';
