import type { Meta, StoryObj } from '@storybook/react';
import { Mail, ChevronRight, Search, Plus } from 'lucide-react';
import { Button } from './button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'icon'],
    },
    disabled: {
      control: 'boolean',
    },
    isLoading: {
      control: 'boolean',
    },
    asChild: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Base button
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
    size: 'md',
  },
};

// Variants
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'default',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
  },
};

export const Link: Story = {
  args: {
    children: 'Link Button',
    variant: 'link',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Destructive Button',
    variant: 'destructive',
  },
};

// Sizes
export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    children: 'Medium Button',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
};

// Icon Examples
export const IconOnly: Story = {
  args: {
    size: 'icon',
    children: <Search className='h-4 w-4' />,
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-4'>
        <Button startIcon={<Mail className='h-4 w-4' />}>Login with Email</Button>
        <Button endIcon={<ChevronRight className='h-4 w-4' />}>Next</Button>
        <Button
          startIcon={<Plus className='h-4 w-4' />}
          endIcon={<ChevronRight className='h-4 w-4' />}
        >
          Add New Item
        </Button>
      </div>
      <div className='flex gap-4'>
        <Button size='sm' startIcon={<Mail className='h-4 w-4' />}>
          Small
        </Button>
        <Button size='lg' startIcon={<Mail className='h-4 w-4' />}>
          Large
        </Button>
      </div>
    </div>
  ),
};

// States
export const Loading: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-4'>
        <Button isLoading>Loading</Button>
        <Button isLoading variant='secondary'>
          Loading
        </Button>
        <Button isLoading variant='outline'>
          Loading
        </Button>
      </div>
      <div className='flex gap-4'>
        <Button isLoading size='sm'>
          Small
        </Button>
        <Button isLoading size='md'>
          Medium
        </Button>
        <Button isLoading size='lg'>
          Large
        </Button>
      </div>
      <div className='flex gap-4'>
        <Button isLoading startIcon={<Mail className='h-4 w-4' />}>
          With Start Icon
        </Button>
        <Button isLoading endIcon={<ChevronRight className='h-4 w-4' />}>
          With End Icon
        </Button>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

// Complex example showing all variants
export const AllVariants: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-4'>
        <Button variant='default'>Default</Button>
        <Button variant='secondary'>Secondary</Button>
        <Button variant='outline'>Outline</Button>
        <Button variant='ghost'>Ghost</Button>
        <Button variant='link'>Link</Button>
        <Button variant='destructive'>Destructive</Button>
      </div>
      <div className='flex gap-4'>
        <Button size='sm'>Small</Button>
        <Button size='md'>Medium</Button>
        <Button size='lg'>Large</Button>
        <Button size='icon'>
          <Search className='h-4 w-4' />
        </Button>
      </div>
      <div className='flex gap-4'>
        <Button disabled>Disabled</Button>
        <Button isLoading>Loading</Button>
        <Button startIcon={<Mail className='h-4 w-4' />}>With Icon</Button>
      </div>
    </div>
  ),
};
