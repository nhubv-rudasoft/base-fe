'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { vi, enUS } from 'date-fns/locale';
import { cn } from '@libs/utils';
import { Button, buttonVariants } from '../button/button';
import { Popover, PopoverContent, PopoverTrigger } from '../popover/popover';

/* ---------------------------------- Types ---------------------------------- */

export interface DatePickerProps {
  /** Label hiển thị phía trên input */
  label?: string;
  /** Locale để format date */
  locale?: 'en-US' | 'vi-VN';
  /** Giá trị của input */
  value?: Date | null;
  /** Callback được gọi khi giá trị thay đổi */
  onChange?: (date: Date | null) => void;
  /** Format hiển thị ngày tháng (PPP, PP, P) nghĩa là (ngày tháng năm, ngày tháng, ngày tháng năm) */
  dateFormat?: 'PPP' | 'PP' | 'P';
  /** Custom className cho container */
  className?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Min date */
  minDate?: Date;
  /** Max date */
  maxDate?: Date;
  /** ID for the input */
  id?: string;
}

/* ---------------------------------- Styles --------------------------------- */

const styles = {
  calendar: {
    months: 'flex flex-col gap-4 space-y-4 sm:space-y-0 py-4 px-3',
    caption_label: 'absolute top-3.5 left-1/2 -translate-x-1/2 text-sm font-normal text-center',
    nav: 'space-x-0 flex items-center justify-between',
    nav_button: cn(
      buttonVariants({ variant: 'outline' }),
      'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
      'hover:bg-gray-100 hover:rounded-full',
      'hover:text-gray-900'
    ),
    weekdays: 'grid grid-cols-7 gap-1 mb-1',
    weekday: 'text-xs text-gray-600 font-light',
    table: 'w-full border-collapse space-y-1',
    head_row: 'grid grid-cols-7',
    head_cell: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] text-center',
    row: 'grid grid-cols-7 gap-1',
    cell: 'text-center text-sm p-0 relative focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50',
    day: cn(
      buttonVariants({ variant: 'ghost' }),
      'h-8 w-8 p-0 font-normal aria-selected:bg-gray-200 aria-selected:text-gray-900',
      '[&[aria-disabled="true"]]:bg-gray-300 [&[aria-disabled="true"]]:text-gray-400 [&[aria-disabled="true"]]:cursor-not-allowed [&[aria-disabled="true"]]:opacity-50'
    ),
    day_range_start: 'day-range-start',
    day_range_end: 'day-range-end',
    day_today: 'bg-accent text-accent-foreground',
    day_outside:
      'day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground',
    day_disabled: 'opacity-50',
    day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
    day_hidden: 'invisible',
    outside: 'text-gray-400',
  },
};

/* -------------------------------- Component ------------------------------- */

export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      label,
      locale = 'en-US',
      value,
      onChange,
      dateFormat = 'PPP',
      className,
      disabled,
      minDate,
      maxDate,
      id,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);

    const localeObj = React.useMemo(() => {
      return locale === 'vi-VN' ? vi : enUS;
    }, [locale]);

    const formattedDate = React.useMemo(() => {
      if (!value) return '';
      try {
        return format(value, dateFormat, { locale: localeObj });
      } catch (error) {
        console.error('Date formatting error:', error);
        return '';
      }
    }, [value, dateFormat, localeObj]);

    const handleSelect = React.useCallback(
      (date: Date | undefined) => {
        if (date) {
          const selectedDate = new Date(date);
          if (!isNaN(selectedDate.getTime())) {
            onChange?.(selectedDate);
          }
        } else {
          onChange?.(null);
        }
        setOpen(false);
      },
      [onChange]
    );

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant='outline'
            className={cn(
              'w-full justify-between text-left font-normal',
              !formattedDate && 'text-muted-foreground',
              className
            )}
            disabled={disabled}
          >
            {formattedDate || (locale === 'vi-VN' ? 'Chọn ngày' : 'Pick a date')}
            <CalendarIcon className='h-4 w-4' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start' side='bottom'>
          <DayPicker
            mode='single'
            selected={value || undefined}
            onSelect={handleSelect}
            locale={localeObj}
            disabled={[
              ...(minDate ? [{ before: minDate }] : []),
              ...(maxDate ? [{ after: maxDate }] : []),
            ]}
            showOutsideDays
            required={false}
            classNames={styles.calendar}
          />
        </PopoverContent>
      </Popover>
    );
  }
);

DatePicker.displayName = 'DatePicker';
