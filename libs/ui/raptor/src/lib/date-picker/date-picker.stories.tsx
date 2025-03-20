import type { Meta, StoryObj } from '@storybook/react';
import { addDays, subDays } from 'date-fns';
import { DatePicker } from './date-picker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    locale: {
      control: 'select',
      options: ['en-US', 'vi-VN'],
      description: 'The locale for date formatting and calendar',
    },
    dateFormat: {
      control: 'text',
      description: 'The format string for displaying the date',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the date picker is disabled',
    },
    minDate: {
      control: 'date',
      description: 'Minimum selectable date',
    },
    maxDate: {
      control: 'date',
      description: 'Maximum selectable date',
    },
    value: {
      control: 'date',
      description: 'Currently selected date',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

// Base story with default props
export const Default: Story = {
  args: {
    label: 'Select Date',
  },
};

// With pre-selected date
export const WithValue: Story = {
  args: {
    label: 'Date',
    value: new Date(),
  },
};

// Vietnamese locale
export const VietnameseLocale: Story = {
  args: {
    label: 'Ngày tháng',
    locale: 'vi-VN',
    value: new Date(),
  },
};

// Custom date format
export const CustomFormat: Story = {
  args: {
    label: 'Custom Format',
    dateFormat: 'PPP',
    value: new Date(),
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    label: 'Disabled Date Picker',
    disabled: true,
    value: new Date(),
  },
};

// With min and max dates
export const WithDateRange: Story = {
  args: {
    label: 'Date Range Limited',
    minDate: subDays(new Date(), 5),
    maxDate: addDays(new Date(), 30),
  },
};

// With all features
export const FullFeatured: Story = {
  args: {
    label: 'Full Featured Date Picker',
    value: new Date(),
    dateFormat: 'PPP',
    minDate: subDays(new Date(), 7),
    maxDate: addDays(new Date(), 30),
    className: 'min-w-[280px]',
  },
};

// Error state example
export const WithError: Story = {
  args: {
    label: 'Date with Error',
    className: 'border-error',
  },
};

// Different widths
export const DifferentWidths: Story = {
  render: () => (
    <div className='space-y-4'>
      <DatePicker label='Default width' />
      <DatePicker label='Medium width' className='w-[240px]' />
      <DatePicker label='Full width' className='w-full' />
    </div>
  ),
};

// Responsive example
export const ResponsiveLayout: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => (
    <div className='space-y-4'>
      <DatePicker label='Mobile view' className='w-full' />
      <DatePicker label='With value' value={new Date()} className='w-full' />
    </div>
  ),
};
