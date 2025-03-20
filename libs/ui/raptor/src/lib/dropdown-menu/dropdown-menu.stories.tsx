import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Settings2, User, CreditCard, LogOut, Plus, ChevronRight } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from './dropdown-menu';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
  argTypes: {
    size: {
      description: 'Kích thước của dropdown menu',
      control: 'select',
      options: ['sm', 'md', 'lg'],
      defaultValue: 'md',
      table: {
        type: { summary: 'sm | md | lg' },
        defaultValue: { summary: 'md' },
      },
    },
    open: {
      description: 'Trạng thái mở/đóng của dropdown menu',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'undefined' },
      },
    },
    onOpenChange: {
      description: 'Callback được gọi khi trạng thái mở/đóng thay đổi',
      table: {
        type: { summary: '(open: boolean) => void' },
      },
    },
    defaultOpen: {
      description: 'Trạng thái mở/đóng mặc định',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    modal: {
      description: 'Có chặn tương tác với các phần tử bên ngoài khi mở hay không',
      control: 'boolean',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Dropdown Menu là một component hiển thị menu thả xuống với nhiều tính năng:

- Hỗ trợ 3 kích thước: sm, md, lg
- Có thể chứa các loại items: thông thường, checkbox, radio
- Hỗ trợ submenu
- Có thể thêm shortcut keys
- Có thể nhóm các items
- Hỗ trợ keyboard navigation
- Tự động điều chỉnh vị trí để luôn hiển thị trong viewport
`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

/**
 * Menu cơ bản với các items thông thường, icons và shortcuts.
 * Sử dụng DropdownMenuGroup để nhóm các items liên quan.
 */
export const Basic: Story = {
  args: {
    size: 'lg',
  },
  render: ({ size }) => (
    <DropdownMenu size={size}>
      <DropdownMenuTrigger asChild>
        <button className='px-4 py-2 rounded-md border border-neutral300 hover:bg-neutral100'>
          Open Menu
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className='mr-2 h-4 w-4' />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className='mr-2 h-4 w-4' />
            <span>Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings2 className='mr-2 h-4 w-4' />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='text-error'>
          <LogOut className='mr-2 h-4 w-4' />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/**
 * Menu với submenu.
 * Sử dụng DropdownMenuSub, DropdownMenuSubTrigger và DropdownMenuSubContent để tạo submenu.
 */
export const WithSubmenu: Story = {
  args: {
    size: 'md',
  },
  render: ({ size }) => (
    <DropdownMenu size={size}>
      <DropdownMenuTrigger asChild>
        <button className='px-4 py-2 rounded-md border border-neutral300 hover:bg-neutral100'>
          Open Menu
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuItem>
          <User className='mr-2 h-4 w-4' />
          <span>My Profile</span>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Plus className='mr-2 h-4 w-4' />
            <span>New</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className='w-48'>
            <DropdownMenuItem>
              <span>Project</span>
              <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Team</span>
              <DropdownMenuShortcut>⇧⌘N</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

interface CheckboxItemsProps {
  size?: 'sm' | 'md' | 'lg';
  defaultOpen?: boolean;
  modal?: boolean;
}

/**
 * Menu với checkbox items.
 * Sử dụng DropdownMenuCheckboxItem để tạo các items có thể check/uncheck.
 * Mỗi item có state riêng và có thể được controlled thông qua checked và onCheckedChange props.
 */
const CheckboxItems = ({ size, defaultOpen, modal }: CheckboxItemsProps) => {
  const [showStatusBar, setShowStatusBar] = React.useState(true);
  const [showActivityBar, setShowActivityBar] = React.useState(false);
  const [showPanel, setShowPanel] = React.useState(false);

  return (
    <DropdownMenu size={size} defaultOpen={defaultOpen} modal={modal}>
      <DropdownMenuTrigger asChild>
        <button className='px-4 py-2 rounded-md border border-neutral300 hover:bg-neutral100'>
          Open Menu
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
          Status Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={showActivityBar} onCheckedChange={setShowActivityBar}>
          Activity Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
          Panel
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const WithCheckboxItems: Story = {
  args: {
    size: 'md',
    defaultOpen: false,
    modal: true,
  },
  render: args => <CheckboxItems {...args} />,
};

interface RadioItemsProps {
  size?: 'sm' | 'md' | 'lg';
  defaultOpen?: boolean;
  modal?: boolean;
}

/**
 * Menu với radio items.
 * Sử dụng DropdownMenuRadioGroup và DropdownMenuRadioItem để tạo nhóm các radio items.
 * Các items trong cùng một RadioGroup chỉ có thể chọn một giá trị tại một thời điểm.
 */
const RadioItems = ({ size, defaultOpen, modal }: RadioItemsProps) => {
  const [position, setPosition] = React.useState('bottom');

  return (
    <DropdownMenu size={size} defaultOpen={defaultOpen} modal={modal}>
      <DropdownMenuTrigger asChild>
        <button className='px-4 py-2 rounded-md border border-neutral300 hover:bg-neutral100'>
          Open Menu
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value='top'>Top</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='right'>Right</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='bottom'>Bottom</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='left'>Left</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const WithRadioItems: Story = {
  args: {
    size: 'md',
    defaultOpen: false,
    modal: true,
  },
  render: args => <RadioItems {...args} />,
};
