import type { Meta, StoryObj } from '@storybook/react';
import { Search, Mail } from 'lucide-react';
import { TextInput } from './text-input';

const meta: Meta<typeof TextInput> = {
  title: 'Forms/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input field',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'outline', 'filled'],
      description: 'Visual style variant of the input',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    label: {
      control: 'text',
      description: 'Label text for the input',
    },
    error: {
      control: 'text',
      description: 'Error message to display below the input',
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display below the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    isLoading: {
      control: 'boolean',
      description: 'Whether the input is in a loading state',
    },
    startIcon: {
      control: { type: 'select' },
      options: ['none', 'search', 'mail'],
      mapping: {
        none: undefined,
        search: <Search size={16} />,
        mail: <Mail size={16} />,
      },
      description: 'Icon to display at the start of the input',
    },
    endIcon: {
      control: { type: 'select' },
      options: ['none', 'search', 'mail'],
      mapping: {
        none: undefined,
        search: <Search size={16} />,
        mail: <Mail size={16} />,
      },
      description: 'Icon to display at the end of the input',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

// Default story
export const Default: Story = {
  args: {
    placeholder: 'Enter text',
    label: 'Label',
    size: 'md',
    variant: 'default',
  },
};

// Different sizes
export const Small: Story = {
  args: {
    placeholder: 'Small input',
    label: 'Small',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    placeholder: 'Medium input',
    label: 'Medium (default)',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    placeholder: 'Large input',
    label: 'Large',
    size: 'lg',
  },
};

// Different variants
export const OutlineVariant: Story = {
  args: {
    placeholder: 'Outline variant',
    label: 'Outline',
    variant: 'outline',
  },
};

export const FilledVariant: Story = {
  args: {
    placeholder: 'Filled variant',
    label: 'Filled',
    variant: 'filled',
  },
};

// With icons
export const WithStartIcon: Story = {
  args: {
    placeholder: 'Search...',
    label: 'Search',
    startIcon: <Search size={16} />,
  },
};

export const WithEndIcon: Story = {
  args: {
    placeholder: 'Enter email',
    label: 'Email',
    endIcon: <Mail size={16} />,
  },
};

export const WithBothIcons: Story = {
  args: {
    placeholder: 'Search with email',
    label: 'Search & Email',
    startIcon: <Search size={16} />,
    endIcon: <Mail size={16} />,
  },
};

// With validation
export const WithHelperText: Story = {
  args: {
    placeholder: 'Enter email',
    label: 'Email',
    helperText: 'We will never share your email',
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'Enter password',
    label: 'Password',
    type: 'password',
    error: 'Password must be at least 8 characters',
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    placeholder: 'This input is disabled',
    label: 'Disabled input',
    disabled: true,
  },
};

// Loading states
export const Loading: Story = {
  args: {
    placeholder: 'Loading...',
    label: 'Loading state',
    isLoading: true,
  },
};

export const LoadingWithStartIcon: Story = {
  args: {
    placeholder: 'Loading (has start icon)',
    label: 'Loading with start icon',
    startIcon: <Search size={16} />,
    isLoading: true,
  },
};

export const LoadingWithEndIcon: Story = {
  args: {
    placeholder: 'Loading (has end icon)',
    label: 'Loading with end icon',
    endIcon: <Mail size={16} />,
    isLoading: true,
  },
};

export const LoadingWithBothIcons: Story = {
  args: {
    placeholder: 'Loading (has both icons)',
    label: 'Loading with both icons',
    startIcon: <Search size={16} />,
    endIcon: <Mail size={16} />,
    isLoading: true,
  },
};

// Combined example showing different states
export const AllVariations: Story = {
  render: () => (
    <div className='flex flex-col space-y-6 max-w-md'>
      <TextInput label='Default' placeholder='Default input' />
      <TextInput label='Small size' placeholder='Small size input' size='sm' />
      <TextInput label='Outline variant' placeholder='Outline variant input' variant='outline' />
      <TextInput
        label='With search icon'
        placeholder='Search...'
        startIcon={<Search size={16} />}
      />
      <TextInput
        label='With helper text'
        placeholder='Enter email'
        helperText='We will never share your email'
      />
      <TextInput
        label='With error'
        placeholder='Enter password'
        type='password'
        error='Password is too short'
      />
      <TextInput label='Disabled' placeholder='Disabled input' disabled />

      <h3 className='text-lg font-medium mt-2'>Loading states</h3>
      <TextInput label='Basic loading' placeholder='Loading state' isLoading={true} />
      <TextInput
        label='Loading (has start icon)'
        placeholder='Icon is hidden, loading shown'
        startIcon={<Search size={16} />}
        isLoading={true}
      />
      <TextInput
        label='Loading (has end icon)'
        placeholder='Icon is hidden, loading shown'
        endIcon={<Mail size={16} />}
        isLoading={true}
      />
      <TextInput
        label='Loading (has both icons)'
        placeholder='Both icons hidden during loading'
        startIcon={<Search size={16} />}
        endIcon={<Mail size={16} />}
        isLoading={true}
      />
    </div>
  ),
};
