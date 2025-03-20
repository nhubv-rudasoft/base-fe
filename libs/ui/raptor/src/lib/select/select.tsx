'use client';

import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp, Loader2, X } from 'lucide-react';

import { cn } from '@libs/utils';
import SelectSearch, { getItemText } from './select-search';

/* ---------------------------------- Types ---------------------------------- */

interface SelectProps extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Root> {
  /**
   * Enable search functionality in the select
   */
  searchable?: boolean;
  /**
   * Placeholder for the search input
   */
  searchPlaceholder?: string;
  /**
   * Size of the select
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Variant style of the select
   */
  variant?: 'default' | 'outline' | 'filled';
  /**
   * Whether the select is in a loading state
   */
  isLoading?: boolean;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Helper text to display below the select
   */
  helperText?: string;
  /**
   * Label for the select
   */
  label?: string;
  /**
   * Class name for the container
   */
  containerClassName?: string;
  /**
   * Whether to allow clearing the select value
   */
  clearable?: boolean;
}

type SelectContextType = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  searchable: boolean;
  size: 'sm' | 'md' | 'lg';
  variant: 'default' | 'outline' | 'filled';
  isLoading: boolean;
  error?: string;
  clearable?: boolean;
  onClear?: () => void;
};

/* ---------------------------------- Styles --------------------------------- */

const styles = {
  base: {
    trigger:
      'flex w-full items-center justify-between whitespace-nowrap rounded-md border transition-colors outline-none',
    focusRing: 'focus:ring-1 focus:ring-opacity-30',
    label: 'text-sm font-medium text-neutral700',
    helperText: 'text-xs',
    error: 'text-error',
    helperNeutral: 'text-neutral500',
    disabled: 'bg-neutral100 text-neutral500 cursor-not-allowed',
  },
  size: {
    trigger: {
      sm: 'h-8 text-sm px-3', // 32px height
      md: 'h-10 text-base px-3', // 40px height
      lg: 'h-12 text-base px-4', // 48px height
    },
    label: {
      sm: 'text-sm mb-1.5',
      md: 'text-sm mb-1.5',
      lg: 'text-base mb-2',
    },
    content: {
      sm: 'p-1',
      md: 'p-1.5',
      lg: 'p-2',
    },
    icon: {
      sm: 'h-3 w-3',
      md: 'h-4 w-4',
      lg: 'h-5 w-5',
    },
    clearButton: {
      sm: 'p-0.5',
      md: 'p-1',
      lg: 'p-1.5',
    },
    scrollButton: {
      sm: 'h-3.5 w-3.5',
      md: 'h-4 w-4',
      lg: 'h-4.5 w-4.5',
    },
  },
  variant: {
    default: 'border-neutral300 focus:border-primary focus:ring-primary',
    outline: 'bg-transparent border-neutral300 focus:border-primary focus:ring-primary',
    filled: 'bg-neutral100 border-transparent focus:bg-white focus:border-primary',
  },
};

/* --------------------------------- Context --------------------------------- */

const SelectContext = React.createContext<SelectContextType>({
  searchQuery: '',
  setSearchQuery: () => undefined,
  searchable: false,
  size: 'md',
  variant: 'default',
  isLoading: false,
  clearable: false,
});

/* -------------------------------- Components ------------------------------- */

const Select = React.forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
  const {
    children,
    searchable,
    searchPlaceholder = 'Search...',
    size = 'md',
    variant = 'default',
    isLoading,
    error,
    helperText,
    label,
    containerClassName,
    clearable = false,
    onValueChange,
    value,
    defaultValue,
    ...rootProps
  } = props;

  const [searchQuery, setSearchQuery] = React.useState('');

  const hasError = !!error;

  const handleClear = React.useCallback(() => {
    if (onValueChange) {
      onValueChange('');
    }
  }, [onValueChange]);

  const contextValue = React.useMemo(
    () => ({
      searchQuery,
      setSearchQuery,
      searchable: searchable || false,
      size,
      variant,
      isLoading: isLoading || false,
      error,
      clearable,
      onClear: handleClear,
    }),
    [searchQuery, searchable, size, variant, isLoading, error, clearable, handleClear]
  );

  return (
    <SelectContext.Provider value={contextValue}>
      <div ref={ref} className={cn('flex flex-col space-y-1', containerClassName)}>
        {label && <label className={styles.base.label}>{label}</label>}
        <SelectPrimitive.Root
          {...rootProps}
          value={value}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
        >
          {children}
        </SelectPrimitive.Root>
        {(helperText || error) && (
          <p
            className={cn(
              styles.base.helperText,
              hasError ? styles.base.error : styles.base.helperNeutral
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    </SelectContext.Provider>
  );
});
Select.displayName = 'Select';

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'filled';
  isLoading?: boolean;
  error?: boolean;
  /**
   * Whether to allow clearing the select value
   */
  clearable?: boolean;
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, size, variant, isLoading, error, clearable, ...props }, ref) => {
    const context = React.useContext(SelectContext);

    const finalSize = size || context.size;
    const finalVariant = variant || context.variant;
    const finalIsLoading = isLoading !== undefined ? isLoading : context.isLoading;
    const finalError = error !== undefined ? error : !!context.error;
    const finalClearable = clearable !== undefined ? clearable : context.clearable;
    const isDisabled = props.disabled || finalIsLoading;

    const handleClearClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (context.onClear) {
        context.onClear();
      }
    };

    const hasValue = React.Children.toArray(children).some(child => {
      if (!React.isValidElement(child)) return false;
      if (child.type === SelectPrimitive.Value) {
        const props = child.props as { placeholder?: string; children?: React.ReactNode };
        return (
          props.placeholder === undefined ||
          (props.children && props.children !== props.placeholder)
        );
      }
      return false;
    });

    return (
      <SelectPrimitive.Trigger
        ref={ref}
        className={cn(
          styles.base.trigger,
          styles.base.focusRing,
          styles.size.trigger[finalSize],
          styles.variant[finalVariant],
          finalError && 'border-error focus:border-error focus:ring-error',
          isDisabled && styles.base.disabled,
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        <div className='flex-1 text-left'>{children}</div>
        <div className='flex items-center'>
          {finalClearable && hasValue && !isDisabled && (
            <button
              type='button'
              className={cn(
                'mr-1 rounded-full text-neutral500 hover:text-neutral800 focus:outline-none',
                styles.size.clearButton[finalSize]
              )}
              onClick={handleClearClick}
              aria-label='Clear selection'
            >
              <X className={styles.size.icon[finalSize]} />
            </button>
          )}
          <SelectPrimitive.Icon asChild>
            {finalIsLoading ? (
              <Loader2 className={cn('animate-spin opacity-50', styles.size.icon[finalSize])} />
            ) : (
              <ChevronDown className={cn('opacity-50', styles.size.icon[finalSize])} />
            )}
          </SelectPrimitive.Icon>
        </div>
      </SelectPrimitive.Trigger>
    );
  }
);
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => {
  const context = React.useContext(SelectContext);
  const size = context.size || 'md';

  return (
    <SelectPrimitive.ScrollUpButton
      ref={ref}
      className={cn(
        'flex cursor-default items-center justify-center py-1',
        size === 'sm' ? 'py-0.5' : size === 'lg' ? 'py-1.5' : 'py-1',
        className
      )}
      {...props}
    >
      <ChevronUp className={styles.size.scrollButton[size]} />
    </SelectPrimitive.ScrollUpButton>
  );
});
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => {
  const context = React.useContext(SelectContext);
  const size = context.size || 'md';

  return (
    <SelectPrimitive.ScrollDownButton
      ref={ref}
      className={cn(
        'flex cursor-default items-center justify-center py-1',
        size === 'sm' ? 'py-0.5' : size === 'lg' ? 'py-1.5' : 'py-1',
        className
      )}
      {...props}
    >
      <ChevronDown className={styles.size.scrollButton[size]} />
    </SelectPrimitive.ScrollDownButton>
  );
});
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
    searchable?: boolean;
    searchPlaceholder?: string;
  }
>(({ className, children, position = 'popper', searchable, searchPlaceholder, ...props }, ref) => {
  // Get global context
  const context = React.useContext(SelectContext);

  // Use context values if not explicitly provided
  const finalSearchable = searchable !== undefined ? searchable : context.searchable;
  const finalSize = context.size || 'md';

  // Reference to search input for focusing
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  // Tạo danh sách đã lọc
  const filteredChildren = React.useMemo(() => {
    if (!finalSearchable || context.searchQuery.length === 0) {
      return children;
    }

    return React.Children.toArray(children).filter(child => {
      if (!React.isValidElement(child)) {
        return false;
      }

      // Skip non-selectable items like group and separators
      if (
        child.type === SelectGroup ||
        child.type === SelectSeparator ||
        child.type === SelectLabel
      ) {
        // Nếu là group, kiểm tra con bên trong
        if (child.type === SelectGroup) {
          const childProps = child.props as { children: React.ReactNode };
          // Lọc các item trong group
          const childItems = React.Children.toArray(childProps.children).filter(groupChild => {
            if (!React.isValidElement(groupChild)) return false;
            if (groupChild.type === SelectLabel) return true;
            if (groupChild.type === SelectItem) {
              const itemText = getItemText(groupChild as React.ReactElement);
              return itemText.includes(context.searchQuery);
            }
            return false;
          });

          // Nếu có ít nhất một item hoặc label, giữ lại group
          return childItems.length > 0;
        }

        return true;
      }

      // Filter SelectItem based on its text content
      if (child.type === SelectItem) {
        const itemText = getItemText(child as React.ReactElement);
        return itemText.includes(context.searchQuery);
      }

      return false;
    });
  }, [children, finalSearchable, context.searchQuery]);

  const handleOpenAutoFocus = (event: Event) => {
    // Ngăn auto focus vào item khi mở dropdown có tìm kiếm
    if (finalSearchable && 'preventDefault' in event) {
      event.preventDefault();
      // Focus ngay vào ô tìm kiếm khi mở
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 0);
    }
  };

  const handleCloseAutoFocus = () => {
    // Reset search query khi đóng dropdown
    if (finalSearchable) {
      context.setSearchQuery('');
    }
  };

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          'relative z-50 max-h-[300px] min-w-[8rem] overflow-hidden rounded-md border border-neutral300 bg-white text-neutral800 shadow-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          finalSize === 'sm' ? 'text-xs' : finalSize === 'lg' ? 'text-base' : 'text-sm',
          className
        )}
        position={position}
        // @ts-expect-error - Sử dụng ts-expect-error để tránh lỗi TypeScript
        onOpenAutoFocus={handleOpenAutoFocus}
        onCloseAutoFocus={handleCloseAutoFocus}
        {...props}
      >
        <SelectScrollUpButton />

        {finalSearchable && (
          <div
            data-searchbox-container
            onMouseDown={e => {
              e.stopPropagation();
            }}
          >
            <SelectSearch
              ref={searchInputRef}
              placeholder={searchPlaceholder}
              value={context.searchQuery}
              onChange={context.setSearchQuery}
              size={finalSize}
            />
          </div>
        )}

        <SelectPrimitive.Viewport
          className={cn(
            styles.size.content[finalSize],
            position === 'popper' &&
              'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
          )}
        >
          {filteredChildren}
        </SelectPrimitive.Viewport>

        {/* Hiển thị thông báo khi không có kết quả */}
        {finalSearchable &&
          context.searchQuery.length > 0 &&
          (!filteredChildren || React.Children.count(filteredChildren) === 0) && (
            <div
              className={cn(
                'px-3 py-4 text-neutral500 text-center',
                finalSize === 'sm'
                  ? 'px-2 py-3 text-xs'
                  : finalSize === 'lg'
                    ? 'px-4 py-5 text-base'
                    : 'px-3 py-4 text-sm'
              )}
            >
              Không tìm thấy kết quả
            </div>
          )}

        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
});
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => {
  const context = React.useContext(SelectContext);
  const size = context.size || 'md';

  return (
    <SelectPrimitive.Label
      ref={ref}
      className={cn(
        'px-2 py-1.5 font-medium text-neutral600',
        size === 'sm' ? 'py-1 px-1.5' : size === 'lg' ? 'py-2 px-2.5' : 'py-1.5 px-2',
        styles.size.label[size],
        className
      )}
      {...props}
    />
  );
});
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  // Lấy kích thước từ context
  const context = React.useContext(SelectContext);
  const size = context.size || 'md';

  // Kích thước icon check based on size
  const checkIconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  // Kích thước container check icon
  const checkContainerSizes = {
    sm: 'h-3 w-3 left-1.5',
    md: 'h-3.5 w-3.5 left-2',
    lg: 'h-4 w-4 left-2.5',
  };

  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        'relative flex w-full cursor-default select-none items-center rounded-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-neutral100 focus:bg-neutral100 focus:text-neutral800',
        size === 'sm'
          ? 'py-1 pl-6 pr-1.5 text-xs'
          : size === 'lg'
            ? 'py-2 pl-10 pr-2.5 text-base'
            : 'py-1.5 pl-8 pr-2 text-sm',
        className
      )}
      {...props}
    >
      <span className={cn('absolute flex items-center justify-center', checkContainerSizes[size])}>
        <SelectPrimitive.ItemIndicator>
          <Check className={cn('text-primary', checkIconSizes[size])} />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
});
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-neutral200', className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
