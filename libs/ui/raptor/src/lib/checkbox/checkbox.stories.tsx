import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox, CheckboxGroup } from './checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['default', 'outline', 'filled'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// Default checkbox
export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

// Variants
export const DefaultVariant: Story = {
  args: {
    label: 'Default variant',
    variant: 'default',
  },
};

export const OutlineVariant: Story = {
  args: {
    label: 'Outline variant',
    variant: 'outline',
  },
};

export const FilledVariant: Story = {
  args: {
    label: 'Filled variant',
    variant: 'filled',
  },
};

// Sizes
export const Small: Story = {
  args: {
    label: 'Small size',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium size',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    label: 'Large size',
    size: 'lg',
  },
};

// With description
export const WithDescription: Story = {
  args: {
    label: 'Newsletter',
    description: 'Get notified about new updates and features',
  },
};

// With error
export const WithError: Story = {
  args: {
    label: 'Accept terms',
    error: 'You must accept the terms to continue',
  },
};

// With helper text
export const WithHelperText: Story = {
  args: {
    label: 'Subscribe',
    helperText: 'You can unsubscribe at any time',
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    disabled: true,
  },
};

// Checkbox Group
const meta2: Meta<typeof CheckboxGroup> = {
  title: 'Components/CheckboxGroup',
  component: CheckboxGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const CheckboxGroupStory: StoryObj<typeof CheckboxGroup> = {
  render: () => (
    <CheckboxGroup label='Select your interests'>
      <Checkbox label='Reading' value='reading' />
      <Checkbox label='Writing' value='writing' />
      <Checkbox label='Coding' value='coding' />
      <Checkbox label='Design' value='design' />
    </CheckboxGroup>
  ),
};

export const HorizontalCheckboxGroup: StoryObj<typeof CheckboxGroup> = {
  render: () => (
    <CheckboxGroup label='Select your interests' orientation='horizontal'>
      <Checkbox label='Reading' value='reading' />
      <Checkbox label='Writing' value='writing' />
      <Checkbox label='Coding' value='coding' />
      <Checkbox label='Design' value='design' />
    </CheckboxGroup>
  ),
};

export const CheckboxGroupWithError: StoryObj<typeof CheckboxGroup> = {
  render: () => (
    <CheckboxGroup label='Select your interests' error='Please select at least one option'>
      <Checkbox label='Reading' value='reading' />
      <Checkbox label='Writing' value='writing' />
      <Checkbox label='Coding' value='coding' />
      <Checkbox label='Design' value='design' />
    </CheckboxGroup>
  ),
};
