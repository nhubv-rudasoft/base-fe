import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './select';
import { SelectSearchDemo } from './select.example';

const meta: Meta<typeof Select> = {
  title: 'Forms/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
      defaultValue: 'md',
    },
    variant: {
      options: ['default', 'outline', 'filled'],
      control: { type: 'radio' },
      defaultValue: 'default',
    },
    searchable: {
      control: 'boolean',
      defaultValue: false,
    },
    isLoading: {
      control: 'boolean',
      defaultValue: false,
    },
    clearable: {
      control: 'boolean',
      defaultValue: false,
      description: 'Cho phép xóa giá trị đã chọn',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

// Ví dụ cơ bản
export const Basic: Story = {
  render: args => (
    <Select {...args}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Chọn một loại trái cây' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='apple'>Táo</SelectItem>
        <SelectItem value='banana'>Chuối</SelectItem>
        <SelectItem value='orange'>Cam</SelectItem>
        <SelectItem value='grape'>Nho</SelectItem>
        <SelectItem value='melon'>Dưa hấu</SelectItem>
      </SelectContent>
    </Select>
  ),
};

// Tính năng tìm kiếm cải tiến
export const ImprovedSearch: Story = {
  render: () => <SelectSearchDemo />,
  parameters: {
    layout: 'fullscreen',
  },
};

// Với các kích thước khác nhau
export const Sizes: Story = {
  render: () => (
    <div className='flex flex-col space-y-4'>
      <div className='flex items-end gap-4'>
        <div>
          <p className='text-sm font-medium mb-2'>Small</p>
          <Select size='sm'>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Size sm' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='option1'>Option 1</SelectItem>
              <SelectItem value='option2'>Option 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <p className='text-sm font-medium mb-2'>Medium (Default)</p>
          <Select size='md'>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Size md' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='option1'>Option 1</SelectItem>
              <SelectItem value='option2'>Option 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <p className='text-sm font-medium mb-2'>Large</p>
          <Select size='lg'>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Size lg' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='option1'>Option 1</SelectItem>
              <SelectItem value='option2'>Option 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  ),
};

// Với các biến thể khác nhau
export const Variants: Story = {
  render: () => (
    <div className='flex flex-col space-y-4'>
      <div className='flex gap-4'>
        <div>
          <p className='text-sm font-medium mb-2'>Default</p>
          <Select variant='default'>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Default variant' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='option1'>Option 1</SelectItem>
              <SelectItem value='option2'>Option 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <p className='text-sm font-medium mb-2'>Outline</p>
          <Select variant='outline'>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Outline variant' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='option1'>Option 1</SelectItem>
              <SelectItem value='option2'>Option 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <p className='text-sm font-medium mb-2'>Filled</p>
          <Select variant='filled'>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Filled variant' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='option1'>Option 1</SelectItem>
              <SelectItem value='option2'>Option 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  ),
};

// Với label và helper text
export const WithLabelAndHelperText: Story = {
  render: () => (
    <Select label='Chọn quốc gia' helperText='Vui lòng chọn quốc gia của bạn'>
      <SelectTrigger className='w-[220px]'>
        <SelectValue placeholder='Chọn quốc gia' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='vietnam'>Việt Nam</SelectItem>
        <SelectItem value='usa'>Mỹ</SelectItem>
        <SelectItem value='uk'>Anh</SelectItem>
        <SelectItem value='japan'>Nhật Bản</SelectItem>
        <SelectItem value='france'>Pháp</SelectItem>
      </SelectContent>
    </Select>
  ),
};

// Với tính năng tìm kiếm
export const Searchable: Story = {
  render: () => (
    <Select searchable searchPlaceholder='Tìm kiếm quốc gia...'>
      <SelectTrigger className='w-[220px]'>
        <SelectValue placeholder='Chọn quốc gia' />
      </SelectTrigger>
      <SelectContent searchable>
        <SelectItem value='vietnam'>Việt Nam</SelectItem>
        <SelectItem value='usa'>Mỹ</SelectItem>
        <SelectItem value='uk'>Anh</SelectItem>
        <SelectItem value='japan'>Nhật Bản</SelectItem>
        <SelectItem value='france'>Pháp</SelectItem>
        <SelectItem value='germany'>Đức</SelectItem>
        <SelectItem value='italy'>Ý</SelectItem>
        <SelectItem value='spain'>Tây Ban Nha</SelectItem>
        <SelectItem value='canada'>Canada</SelectItem>
        <SelectItem value='australia'>Úc</SelectItem>
        <SelectItem value='brazil'>Brazil</SelectItem>
        <SelectItem value='india'>Ấn Độ</SelectItem>
        <SelectItem value='china'>Trung Quốc</SelectItem>
        <SelectItem value='singapore'>Singapore</SelectItem>
      </SelectContent>
    </Select>
  ),
};

// Với label và nhóm
export const WithLabelAndGroups: Story = {
  render: () => (
    <Select label='Chọn thực phẩm'>
      <SelectTrigger className='w-[220px]'>
        <SelectValue placeholder='Chọn một loại thực phẩm' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Trái cây</SelectLabel>
          <SelectItem value='apple'>Táo</SelectItem>
          <SelectItem value='banana'>Chuối</SelectItem>
          <SelectItem value='orange'>Cam</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Rau củ</SelectLabel>
          <SelectItem value='carrot'>Cà rốt</SelectItem>
          <SelectItem value='potato'>Khoai tây</SelectItem>
          <SelectItem value='cucumber'>Dưa chuột</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

// Với searchable và nhóm
export const SearchableWithGroups: Story = {
  render: () => (
    <Select searchable label='Chọn thực phẩm' searchPlaceholder='Tìm kiếm thực phẩm...'>
      <SelectTrigger className='w-[220px]'>
        <SelectValue placeholder='Chọn một loại thực phẩm' />
      </SelectTrigger>
      <SelectContent searchable>
        <SelectGroup>
          <SelectLabel>Trái cây</SelectLabel>
          <SelectItem value='apple'>Táo</SelectItem>
          <SelectItem value='banana'>Chuối</SelectItem>
          <SelectItem value='orange'>Cam</SelectItem>
          <SelectItem value='grape'>Nho</SelectItem>
          <SelectItem value='watermelon'>Dưa hấu</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Rau củ</SelectLabel>
          <SelectItem value='carrot'>Cà rốt</SelectItem>
          <SelectItem value='potato'>Khoai tây</SelectItem>
          <SelectItem value='cucumber'>Dưa chuột</SelectItem>
          <SelectItem value='tomato'>Cà chua</SelectItem>
          <SelectItem value='broccoli'>Bông cải xanh</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

// Với disabled items
export const WithDisabledItems: Story = {
  render: () => (
    <Select>
      <SelectTrigger className='w-[200px]'>
        <SelectValue placeholder='Chọn một quốc gia' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='vietnam'>Việt Nam</SelectItem>
        <SelectItem value='usa'>Mỹ</SelectItem>
        <SelectItem value='uk'>Anh</SelectItem>
        <SelectItem value='japan' disabled>
          Nhật Bản (Không khả dụng)
        </SelectItem>
        <SelectItem value='france'>Pháp</SelectItem>
      </SelectContent>
    </Select>
  ),
};

// Select bị disabled
export const Disabled: Story = {
  render: () => (
    <Select disabled label='Chọn option'>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Chọn một option' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='option1'>Option 1</SelectItem>
        <SelectItem value='option2'>Option 2</SelectItem>
        <SelectItem value='option3'>Option 3</SelectItem>
      </SelectContent>
    </Select>
  ),
};

// Select với lỗi
export const WithError: Story = {
  render: () => (
    <Select label='Chọn option' error='Vui lòng chọn một option'>
      <SelectTrigger className='w-[180px]' error>
        <SelectValue placeholder='Chọn một option' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='option1'>Option 1</SelectItem>
        <SelectItem value='option2'>Option 2</SelectItem>
        <SelectItem value='option3'>Option 3</SelectItem>
      </SelectContent>
    </Select>
  ),
};

// Select trong trạng thái loading
export const Loading: Story = {
  render: () => (
    <Select isLoading label='Đang tải...'>
      <SelectTrigger className='w-[180px]' isLoading>
        <SelectValue placeholder='Đang tải dữ liệu...' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='option1'>Option 1</SelectItem>
        <SelectItem value='option2'>Option 2</SelectItem>
        <SelectItem value='option3'>Option 3</SelectItem>
      </SelectContent>
    </Select>
  ),
};

// Trạng thái đã chọn giá trị
export const WithDefaultValue: Story = {
  render: () => (
    <Select defaultValue='banana' label='Trái cây yêu thích'>
      <SelectTrigger className='w-[180px]'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='apple'>Táo</SelectItem>
        <SelectItem value='banana'>Chuối</SelectItem>
        <SelectItem value='orange'>Cam</SelectItem>
        <SelectItem value='grape'>Nho</SelectItem>
      </SelectContent>
    </Select>
  ),
};

// Với nhiều lựa chọn (danh sách dài)
export const WithManyOptions: Story = {
  render: () => (
    <Select searchable label='Chọn tháng' searchPlaceholder='Tìm tháng...'>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Chọn một tháng' />
      </SelectTrigger>
      <SelectContent searchable>
        <SelectItem value='jan'>Tháng 1</SelectItem>
        <SelectItem value='feb'>Tháng 2</SelectItem>
        <SelectItem value='mar'>Tháng 3</SelectItem>
        <SelectItem value='apr'>Tháng 4</SelectItem>
        <SelectItem value='may'>Tháng 5</SelectItem>
        <SelectItem value='jun'>Tháng 6</SelectItem>
        <SelectItem value='jul'>Tháng 7</SelectItem>
        <SelectItem value='aug'>Tháng 8</SelectItem>
        <SelectItem value='sep'>Tháng 9</SelectItem>
        <SelectItem value='oct'>Tháng 10</SelectItem>
        <SelectItem value='nov'>Tháng 11</SelectItem>
        <SelectItem value='dec'>Tháng 12</SelectItem>
      </SelectContent>
    </Select>
  ),
};

// Controlled example
export const Controlled: Story = {
  render: function ControlledSelect() {
    const [value, setValue] = React.useState('apple');

    return (
      <div className='flex flex-col space-y-4 items-start'>
        <Select
          value={value}
          onValueChange={newValue => {
            setValue(newValue);
            console.log('Selected:', newValue);
          }}
          label='Chọn trái cây'
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Chọn một trái cây' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='apple'>Táo</SelectItem>
            <SelectItem value='banana'>Chuối</SelectItem>
            <SelectItem value='orange'>Cam</SelectItem>
            <SelectItem value='grape'>Nho</SelectItem>
          </SelectContent>
        </Select>

        <div className='text-sm p-2 bg-neutral50 rounded-md w-[180px]'>
          Đã chọn: <span className='font-medium'>{value}</span>
        </div>
      </div>
    );
  },
};

// Với tính năng xóa giá trị
export const Clearable: Story = {
  render: function ClearableExample() {
    const [value, setValue] = React.useState('apple');

    return (
      <div className='flex flex-col space-y-6'>
        <div className='flex flex-col gap-6 items-start'>
          <Select value={value} onValueChange={setValue} clearable label='Với nút xóa'>
            <SelectTrigger className='w-[250px]'>
              <SelectValue placeholder='Chọn một loại trái cây' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='apple'>Táo</SelectItem>
              <SelectItem value='banana'>Chuối</SelectItem>
              <SelectItem value='orange'>Cam</SelectItem>
              <SelectItem value='grape'>Nho</SelectItem>
            </SelectContent>
          </Select>

          <div className='text-sm p-2 bg-neutral50 rounded-md'>
            Đã chọn: <span className='font-medium'>{value ? value : 'chưa chọn'}</span>
          </div>
        </div>

        <div className='flex flex-row gap-6 items-start'>
          <div>
            <p className='text-sm font-medium mb-2'>Size nhỏ</p>
            <Select clearable size='sm' defaultValue='apple'>
              <SelectTrigger className='w-[180px]'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='apple'>Táo</SelectItem>
                <SelectItem value='banana'>Chuối</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <p className='text-sm font-medium mb-2'>Size vừa</p>
            <Select clearable size='md' defaultValue='apple'>
              <SelectTrigger className='w-[180px]'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='apple'>Táo</SelectItem>
                <SelectItem value='banana'>Chuối</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <p className='text-sm font-medium mb-2'>Size lớn</p>
            <Select clearable size='lg' defaultValue='apple'>
              <SelectTrigger className='w-[180px]'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='apple'>Táo</SelectItem>
                <SelectItem value='banana'>Chuối</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <p className='text-sm font-medium'>Kết hợp với tìm kiếm</p>
          <Select clearable searchable label='Tìm và xóa' defaultValue='china'>
            <SelectTrigger className='w-[250px]'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent searchable>
              <SelectItem value='vietnam'>Việt Nam</SelectItem>
              <SelectItem value='usa'>Mỹ</SelectItem>
              <SelectItem value='uk'>Anh</SelectItem>
              <SelectItem value='japan'>Nhật Bản</SelectItem>
              <SelectItem value='china'>Trung Quốc</SelectItem>
              <SelectItem value='korea'>Hàn Quốc</SelectItem>
              <SelectItem value='france'>Pháp</SelectItem>
              <SelectItem value='germany'>Đức</SelectItem>
              <SelectItem value='italy'>Ý</SelectItem>
              <SelectItem value='russia'>Nga</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  },
};
