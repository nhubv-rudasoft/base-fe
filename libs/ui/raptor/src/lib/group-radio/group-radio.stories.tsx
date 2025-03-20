import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, RadioGroupItem } from './group-radio';

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'filled'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
  {
    id: 'option1',
    label: 'Option 1',
    value: 'option1',
    description: 'This is option 1',
  },
  {
    id: 'option2',
    label: 'Option 2',
    value: 'option2',
    description: 'This is option 2',
  },
  {
    id: 'option3',
    label: 'Option 3',
    value: 'option3',
    description: 'This is option 3',
  },
];

// Base radio group
export const Default: Story = {
  args: {
    children: defaultItems.map(item => (
      <RadioGroupItem key={item.value} value={item.value} label={item.label} size='sm' />
    )),
  },
};

// Variants
export const DefaultVariant: Story = {
  args: {
    variant: 'default',
    children: defaultItems.map(item => (
      <RadioGroupItem
        key={item.value}
        value={item.value}
        label={item.label}
        description={item.description}
      />
    )),
  },
};

export const OutlineVariant: Story = {
  args: {
    variant: 'outline',
    children: defaultItems.map(item => (
      <RadioGroupItem
        key={item.value}
        value={item.value}
        label={item.label}
        description={item.description}
      />
    )),
  },
};

export const FilledVariant: Story = {
  args: {
    variant: 'filled',
    children: defaultItems.map(item => (
      <RadioGroupItem
        key={item.value}
        value={item.value}
        label={item.label}
        description={item.description}
      />
    )),
  },
};

// Sizes
export const Small: Story = {
  args: {
    size: 'sm',
    children: defaultItems.map(item => (
      <RadioGroupItem
        key={item.value}
        value={item.value}
        label={item.label}
        description={item.description}
      />
    )),
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    children: defaultItems.map(item => (
      <RadioGroupItem
        key={item.value}
        value={item.value}
        label={item.label}
        description={item.description}
      />
    )),
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: defaultItems.map(item => (
      <RadioGroupItem
        key={item.value}
        value={item.value}
        label={item.label}
        description={item.description}
      />
    )),
  },
};

// With label and helper text
export const WithLabelAndHelper: Story = {
  args: {
    label: 'Select an option',
    helperText: 'Please choose one of the options below',
    children: defaultItems.map(item => (
      <RadioGroupItem
        key={item.value}
        value={item.value}
        label={item.label}
        description={item.description}
      />
    )),
  },
};

// With error
export const WithError: Story = {
  args: {
    label: 'Select an option',
    error: 'Please select an option to continue',
    children: defaultItems.map(item => (
      <RadioGroupItem
        key={item.value}
        value={item.value}
        label={item.label}
        description={item.description}
      />
    )),
  },
};

// Horizontal layout
export const HorizontalLayout: Story = {
  args: {
    orientation: 'horizontal',
    children: defaultItems.map(item => (
      <RadioGroupItem key={item.value} value={item.value} label={item.label} />
    )),
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    disabled: true,
    children: defaultItems.map(item => (
      <RadioGroupItem
        key={item.value}
        value={item.value}
        label={item.label}
        description={item.description}
      />
    )),
  },
};

// Complex example showing all variants
export const AllVariants: Story = {
  render: () => (
    <div className='flex flex-col gap-8 w-[600px]'>
      <div>
        <h3 className='text-lg font-medium mb-4'>Default Variant</h3>
        <RadioGroup defaultValue='option1' variant='default'>
          {defaultItems.map(item => (
            <RadioGroupItem
              key={item.value}
              value={item.value}
              label={item.label}
              description={item.description}
            />
          ))}
        </RadioGroup>
      </div>

      <div>
        <h3 className='text-lg font-medium mb-4'>Outline Variant</h3>
        <RadioGroup defaultValue='option1' variant='outline'>
          {defaultItems.map(item => (
            <RadioGroupItem
              key={item.value}
              value={item.value}
              label={item.label}
              description={item.description}
            />
          ))}
        </RadioGroup>
      </div>

      <div>
        <h3 className='text-lg font-medium mb-4'>Filled Variant</h3>
        <RadioGroup defaultValue='option1' variant='filled'>
          {defaultItems.map(item => (
            <RadioGroupItem
              key={item.value}
              value={item.value}
              label={item.label}
              description={item.description}
            />
          ))}
        </RadioGroup>
      </div>

      <div>
        <h3 className='text-lg font-medium mb-4'>Sizes</h3>
        <div className='flex flex-col gap-4'>
          <RadioGroup size='sm' defaultValue='option1'>
            <RadioGroupItem value='option1' label='Small Size' />
          </RadioGroup>
          <RadioGroup size='md' defaultValue='option1'>
            <RadioGroupItem value='option1' label='Medium Size' />
          </RadioGroup>
          <RadioGroup size='lg' defaultValue='option1'>
            <RadioGroupItem value='option1' label='Large Size' />
          </RadioGroup>
        </div>
      </div>

      <div>
        <h3 className='text-lg font-medium mb-4'>With Label and Error</h3>
        <RadioGroup label='Select an option' error='Please select an option' defaultValue='option1'>
          {defaultItems.map(item => (
            <RadioGroupItem
              key={item.value}
              value={item.value}
              label={item.label}
              description={item.description}
            />
          ))}
        </RadioGroup>
      </div>
    </div>
  ),
};
