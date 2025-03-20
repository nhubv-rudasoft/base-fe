import type { Meta, StoryObj } from '@storybook/react';
import { NumberInput } from './number-input';

const meta: Meta<typeof NumberInput> = {
  title: 'Forms/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
  args: {
    placeholder: 'Enter a number',
  },
  argTypes: {
    locale: {
      control: 'select',
      options: ['en-US', 'vi-VN'],
      description: 'The locale to use for number formatting',
      defaultValue: 'en-US',
    },
    value: {
      control: 'number',
      description: 'The current value of the input',
    },
    decimalPlaces: {
      control: 'number',
      description: 'Number of decimal places to show',
      defaultValue: 2,
    },
    allowNegative: {
      control: 'boolean',
      description: 'Allow negative numbers',
      defaultValue: true,
    },
    error: {
      control: 'boolean',
      description: 'Error state',
      defaultValue: false,
    },
    helperText: {
      control: 'text',
      description: 'Helper text to show below the input',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input',
      defaultValue: 'md',
    },
    variant: {
      control: 'select',
      options: ['default', 'outline', 'filled'],
      description: 'Visual variant of the input',
      defaultValue: 'default',
    },
  },
};

export default meta;
type Story = StoryObj<typeof NumberInput>;

export const Default: Story = {
  args: {
    value: 1234.56,
    onChange: value => console.log('Value changed:', value),
    helperText: 'Uses en-US locale (dot as decimal separator)',
  },
};

export const WithVietnameseLocale: Story = {
  args: {
    value: 10000.75,
    locale: 'vi-VN',
    onChange: value => console.log('Value changed:', value),
    helperText: 'Uses vi-VN locale (comma as decimal separator)',
  },
};

export const DecimalPlacesExample: Story = {
  render: () => (
    <div className='flex flex-col space-y-4'>
      <NumberInput
        value={1234.5678}
        decimalPlaces={0}
        helperText='No decimal places'
        onChange={value => console.log('Value changed:', value)}
      />
      <NumberInput
        value={1234.5678}
        decimalPlaces={2}
        helperText='2 decimal places (default)'
        onChange={value => console.log('Value changed:', value)}
      />
      <NumberInput
        value={1234.5678}
        decimalPlaces={4}
        helperText='4 decimal places'
        onChange={value => console.log('Value changed:', value)}
      />
    </div>
  ),
};

export const LocaleComparison: Story = {
  render: () => (
    <div className='flex flex-col space-y-4'>
      <NumberInput
        locale='en-US'
        value={1234567.89}
        helperText='en-US: 1,234,567.89'
        onChange={value => console.log('Value changed:', value)}
      />
      <NumberInput
        locale='vi-VN'
        value={1234567.89}
        helperText='vi-VN: 1.234.567,89'
        onChange={value => console.log('Value changed:', value)}
      />
    </div>
  ),
};

export const WithError: Story = {
  args: {
    value: -1234.56,
    error: 'Invalid amount',
    helperText: 'Amount must be positive',
    onChange: value => console.log('Value changed:', value),
  },
};

export const NoNegativeNumbers: Story = {
  args: {
    value: 1234.56,
    allowNegative: false,
    helperText: 'Negative numbers are not allowed',
    onChange: value => console.log('Value changed:', value),
  },
};

export const Variants: Story = {
  render: () => (
    <div className='flex flex-col space-y-4'>
      <NumberInput
        variant='default'
        value={1234.56}
        helperText='Default variant'
        onChange={value => console.log('Value changed:', value)}
      />
      <NumberInput
        variant='outline'
        value={1234.56}
        helperText='Outline variant'
        onChange={value => console.log('Value changed:', value)}
      />
      <NumberInput
        variant='filled'
        value={1234.56}
        helperText='Filled variant'
        onChange={value => console.log('Value changed:', value)}
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className='flex flex-col space-y-4'>
      <NumberInput
        size='sm'
        value={1234.56}
        helperText='Small size'
        onChange={value => console.log('Value changed:', value)}
      />
      <NumberInput
        size='md'
        value={1234.56}
        helperText='Medium size'
        onChange={value => console.log('Value changed:', value)}
      />
      <NumberInput
        size='lg'
        value={1234.56}
        helperText='Large size'
        onChange={value => console.log('Value changed:', value)}
      />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    value: 1234.56,
    disabled: true,
    helperText: 'This input is disabled',
    onChange: value => console.log('Value changed:', value),
  },
};

export const Playground: Story = {
  args: {
    value: 1234.56,
    placeholder: 'Enter amount',
    helperText: 'Try different configurations using the controls below',
    onChange: value => console.log('Value changed:', value),
  },
};
