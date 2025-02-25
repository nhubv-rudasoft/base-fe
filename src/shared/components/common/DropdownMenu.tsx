import React, { useCallback, useEffect, useRef, useState } from 'react';

interface DropdownMenuProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'right';
  width?: number | string;
  onOpenChange?: (isOpen: boolean) => void;
  offset?: number;
}

interface Position {
  top: number;
  left: number;
  placement: 'top' | 'bottom';
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  trigger,
  children,
  className = '',
  align = 'left',
  width = 220,
  onOpenChange,
  offset = 4,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<Position>({ top: 0, left: 0, placement: 'bottom' });

  const handleToggle = useCallback(() => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    onOpenChange?.(newIsOpen);
  }, [isOpen, onOpenChange]);

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !dropdownRef.current || !containerRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const dropdownRect = dropdownRef.current.getBoundingClientRect();

    const spaceBelow = window.innerHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;
    const shouldShowAbove = spaceBelow < dropdownRect.height && spaceAbove > dropdownRect.height;

    let top: number;
    let left: number;

    // Calculate vertical position with offset
    if (shouldShowAbove) {
      top = -(dropdownRect.height + offset);
    } else {
      top = triggerRect.height + offset;
    }

    // Calculate horizontal position
    if (align === 'right') {
      // Align right edge of dropdown with right edge of trigger
      left = triggerRect.width - dropdownRect.width;
    } else {
      // Align left edge of dropdown with left edge of trigger
      left = 0;
    }

    setPosition({
      top,
      left,
      placement: shouldShowAbove ? 'top' : 'bottom',
    });
  }, [align, offset]);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        onOpenChange?.(false);
      }
    },
    [onOpenChange],
  );

  useEffect(() => {
    if (isOpen) {
      calculatePosition();
      document.addEventListener('click', handleClickOutside);
      window.addEventListener('scroll', calculatePosition, true);
      window.addEventListener('resize', calculatePosition);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', calculatePosition, true);
      window.removeEventListener('resize', calculatePosition);
    };
  }, [isOpen, calculatePosition, handleClickOutside]);

  return (
    <div ref={containerRef} className='relative inline-block'>
      <div
        ref={triggerRef}
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggle();
          }
        }}
        role='button'
        tabIndex={0}
        className='inline-block'
      >
        {trigger}
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          style={{
            position: 'absolute',
            top: `${position.top}px`,
            left: `${position.left}px`,
            width: typeof width === 'number' ? `${width}px` : width,
          }}
          className={`z-50 transform rounded-xl bg-white py-1 shadow-lg transition-transform duration-150 ${
            position.placement === 'top' ? 'origin-bottom' : 'origin-top'
          } ${className}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

interface DropdownItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  disabled?: boolean;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  className = '',
  icon,
  disabled = false,
  onClick,
  ...props
}) => (
  <div
    role='menuitem'
    tabIndex={disabled ? -1 : 0}
    onClick={disabled ? undefined : onClick}
    onKeyDown={(e) => {
      if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick?.(e as any);
      }
    }}
    className={`relative flex items-center px-4 py-2 text-xs ${
      disabled
        ? 'cursor-not-allowed text-gray-400'
        : 'cursor-pointer text-gray-700 hover:bg-gray-100'
    } first:rounded-t-lg last:rounded-b-lg ${className}`}
    {...props}
  >
    {icon && <span className='mr-2'>{icon}</span>}
    {children}
  </div>
);

export const DropdownDivider: React.FC = () => <div className='my-1 h-[1px] bg-gray-200' />;
