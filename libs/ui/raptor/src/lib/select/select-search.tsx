import * as React from 'react';
import { cn } from '@libs/utils';
import { Search } from 'lucide-react';

export interface SelectSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// Lấy text từ React Element để tìm kiếm
export function getItemText(element: React.ReactElement): string {
  // Sử dụng type casting để tránh lỗi TypeScript
  const props = element.props as { children?: React.ReactNode };
  const { children } = props;

  if (!children) {
    return '';
  }

  if (typeof children === 'string') {
    return children.toLowerCase();
  }

  if (Array.isArray(children)) {
    return children
      .map(child => {
        if (typeof child === 'string') {
          return child;
        }
        if (React.isValidElement(child)) {
          return getItemText(child);
        }
        return '';
      })
      .join(' ')
      .toLowerCase();
  }

  if (React.isValidElement(children)) {
    return getItemText(children);
  }

  return '';
}

// Component input dùng để tìm kiếm trong Select
const SelectSearch = React.forwardRef<HTMLInputElement, SelectSearchProps>(
  ({ className, onChange, value, placeholder = 'Search...', size = 'md', ...props }, ref) => {
    // Size classes cho input - Tăng sự khác biệt giữa các kích thước
    const sizeClasses = {
      sm: 'h-6 text-xs px-2',
      md: 'h-8 text-sm px-3',
      lg: 'h-12 text-base px-4', // Tăng chiều cao cho size large
    };

    // Icon size và position classes dựa theo kích thước - Điều chỉnh cho rõ sự khác biệt
    const iconSizeClasses = {
      sm: 'h-3 w-3 left-1.5',
      md: 'h-4 w-4 left-2',
      lg: 'h-6 w-6 left-3', // Tăng kích thước icon
    };

    // Input padding left dựa theo kích thước - Điều chỉnh tăng khoảng cách
    const inputPaddingLeft = {
      sm: 'pl-6',
      md: 'pl-8',
      lg: 'pl-12', // Tăng padding cho phù hợp với icon lớn hơn
    };

    // Container padding và kích thước dựa theo size
    const containerStyles = {
      sm: 'px-1.5 py-1 min-h-[32px]',
      md: 'px-2 py-1.5 min-h-[40px]',
      lg: 'px-4 py-3 min-h-[56px]', // Tăng chiều cao tối thiểu cho size lớn
    };

    // Container border width dựa theo size
    const containerBorder = {
      sm: 'border-b border-neutral200',
      md: 'border-b border-neutral200',
      lg: 'border-b-2 border-neutral200', // Tăng độ dày border cho size lớn
    };

    // Xử lý khi người dùng gõ
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value.toLowerCase();
      onChange(newValue);
    };

    // Ngăn sự kiện keydown và mousedown làm đóng dropdown
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Ngăn các phím arrow, enter, escape, tab làm đóng dropdown
      if (
        e.key === 'ArrowUp' ||
        e.key === 'ArrowDown' ||
        e.key === 'Enter' ||
        e.key === 'Escape' ||
        e.key === 'Tab'
      ) {
        e.stopPropagation();
      }
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLInputElement>) => {
      e.stopPropagation();
    };

    return (
      <div
        className={cn('sticky top-0 bg-white z-10', containerBorder[size], containerStyles[size])}
      >
        <div className='relative h-full flex items-center'>
          <Search
            className={cn(
              'absolute top-1/2 -translate-y-1/2 text-neutral500',
              iconSizeClasses[size]
            )}
          />
          <input
            ref={ref}
            type='text'
            className={cn(
              'w-full rounded border border-neutral300 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary focus:ring-opacity-30',
              sizeClasses[size],
              inputPaddingLeft[size],
              className
            )}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onMouseDown={handleMouseDown}
            placeholder={placeholder}
            role='searchbox'
            aria-label='Search options'
            {...props}
          />
        </div>
      </div>
    );
  }
);

SelectSearch.displayName = 'SelectSearch';

export default SelectSearch;
