import type { Meta, StoryObj } from '@storybook/react';
import { addDays } from 'date-fns';
import { Calendar } from './calendar';

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A calendar component that supports single date, date range, and multiple date selection.',
      },
    },
  },
  argTypes: {
    mode: {
      control: 'select',
      options: ['single', 'range', 'multiple'],
      description: 'Selection mode of the calendar',
      defaultValue: 'single',
    },
    selected: {
      control: 'date',
      description: 'The selected date(s)',
    },
    disabled: {
      description: 'Array of disabled dates or date ranges',
    },
    defaultMonth: {
      control: 'date',
      description: 'The month to display initially',
    },
    showOutsideDays: {
      control: 'boolean',
      description: 'Show days from the previous/next month',
      defaultValue: true,
    },
    footer: {
      description: 'Custom footer content',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic calendar story
export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Basic calendar with no selected date.',
      },
    },
  },
};

// Calendar with selected date
export const Selected: Story = {
  args: {
    mode: 'single',
    selected: new Date(),
    defaultMonth: new Date(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar with a single selected date.',
      },
    },
  },
};

// Calendar with date range
export const DateRange: Story = {
  args: {
    mode: 'range',
    selected: {
      from: new Date(),
      to: addDays(new Date(), 7),
    },
    defaultMonth: new Date(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar in range selection mode, allowing selection of a date range.',
      },
    },
  },
};

// Calendar with disabled dates
export const DisabledDates: Story = {
  args: {
    mode: 'single',
    disabled: [
      { from: new Date(), to: addDays(new Date(), 5) },
      { from: addDays(new Date(), 10), to: addDays(new Date(), 15) },
    ],
    defaultMonth: new Date(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar with certain dates disabled/unselectable.',
      },
    },
  },
};

// Calendar with footer
export const WithFooter: Story = {
  args: {
    mode: 'single',
    selected: new Date(),
    defaultMonth: new Date(),
    footer: <p className='text-sm text-center'>This is a custom footer</p>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar with a custom footer component.',
      },
    },
  },
};

// Multiple selection calendar
export const MultipleSelection: Story = {
  args: {
    mode: 'multiple',
    selected: [new Date(), addDays(new Date(), 3), addDays(new Date(), 7)],
    defaultMonth: new Date(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Calendar that allows selection of multiple dates.',
      },
    },
  },
};
