import * as React from 'react';
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

/**
 * Demo component showcasing various features of the searchable Select component.
 * This demonstrates the improved search functionality with better focus handling.
 */
export function SelectSearchDemo() {
  const [value, setValue] = React.useState('');

  return (
    <div className='flex flex-col gap-8 p-6'>
      <h1 className='text-2xl font-bold mb-2'>Select với chức năng tìm kiếm cải tiến</h1>

      {/* Size demo section - Added new section */}
      <div className='flex flex-col gap-4'>
        <h2 className='text-lg font-medium mb-2'>Các kích thước của Select</h2>
        <div className='flex flex-wrap gap-6'>
          {/* Small Size */}
          <div className='min-w-[200px]'>
            <h3 className='text-sm font-medium mb-2'>Small (sm)</h3>
            <Select searchable size='sm' label='Small size' searchPlaceholder='Search...'>
              <SelectTrigger className='w-[200px]'>
                <SelectValue placeholder='Small size' />
              </SelectTrigger>
              <SelectContent searchable>
                <SelectItem value='option1'>Option 1</SelectItem>
                <SelectItem value='option2'>Option 2</SelectItem>
                <SelectItem value='option3'>Option 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Medium Size */}
          <div className='min-w-[200px]'>
            <h3 className='text-sm font-medium mb-2'>Medium (md)</h3>
            <Select searchable size='md' label='Medium size' searchPlaceholder='Search...'>
              <SelectTrigger className='w-[200px]'>
                <SelectValue placeholder='Medium size' />
              </SelectTrigger>
              <SelectContent searchable>
                <SelectItem value='option1'>Option 1</SelectItem>
                <SelectItem value='option2'>Option 2</SelectItem>
                <SelectItem value='option3'>Option 3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Large Size */}
          <div className='min-w-[200px]'>
            <h3 className='text-sm font-medium mb-2'>Large (lg)</h3>
            <Select searchable size='lg' label='Large size' searchPlaceholder='Search...'>
              <SelectTrigger className='w-[200px]'>
                <SelectValue placeholder='Large size' />
              </SelectTrigger>
              <SelectContent searchable>
                <SelectItem value='option1'>Option 1</SelectItem>
                <SelectItem value='option2'>Option 2</SelectItem>
                <SelectItem value='option3'>Option 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className='flex flex-wrap gap-8'>
        {/* Basic searchable select */}
        <div className='min-w-[300px]'>
          <h2 className='text-lg font-medium mb-4'>Tìm kiếm cơ bản</h2>
          <Select searchable label='Chọn quốc gia' searchPlaceholder='Tìm quốc gia...'>
            <SelectTrigger className='w-[250px]'>
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
            </SelectContent>
          </Select>
        </div>

        {/* Searchable select with groups */}
        <div className='min-w-[300px]'>
          <h2 className='text-lg font-medium mb-4'>Tìm kiếm với nhóm</h2>
          <Select searchable label='Chọn thực phẩm' searchPlaceholder='Tìm thực phẩm...'>
            <SelectTrigger className='w-[250px]'>
              <SelectValue placeholder='Chọn loại thực phẩm' />
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
        </div>

        {/* Controlled searchable select */}
        <div className='min-w-[300px]'>
          <h2 className='text-lg font-medium mb-4'>Controlled với tìm kiếm</h2>
          <Select
            searchable
            label='Chọn ngôn ngữ lập trình'
            searchPlaceholder='Tìm ngôn ngữ...'
            value={value}
            onValueChange={setValue}
          >
            <SelectTrigger className='w-[250px]'>
              <SelectValue placeholder='Chọn ngôn ngữ' />
            </SelectTrigger>
            <SelectContent searchable>
              <SelectItem value='javascript'>JavaScript</SelectItem>
              <SelectItem value='typescript'>TypeScript</SelectItem>
              <SelectItem value='python'>Python</SelectItem>
              <SelectItem value='java'>Java</SelectItem>
              <SelectItem value='csharp'>C#</SelectItem>
              <SelectItem value='cpp'>C++</SelectItem>
              <SelectItem value='go'>Go</SelectItem>
              <SelectItem value='rust'>Rust</SelectItem>
              <SelectItem value='ruby'>Ruby</SelectItem>
              <SelectItem value='php'>PHP</SelectItem>
              <SelectItem value='swift'>Swift</SelectItem>
              <SelectItem value='kotlin'>Kotlin</SelectItem>
            </SelectContent>
          </Select>
          {value && (
            <div className='mt-2 p-2 bg-neutral50 rounded text-sm'>
              Đã chọn: <span className='font-medium'>{value}</span>
            </div>
          )}
        </div>
      </div>

      {/* Extra examples */}
      <div className='flex flex-wrap gap-8 mt-8'>
        <div className='min-w-[300px]'>
          <h2 className='text-lg font-medium mb-4'>Với thanh tìm kiếm dài</h2>
          <Select searchable label='Chọn tỉnh thành' searchPlaceholder='Nhập tên tỉnh thành...'>
            <SelectTrigger className='w-[350px]'>
              <SelectValue placeholder='Chọn tỉnh thành' />
            </SelectTrigger>
            <SelectContent searchable className='w-[350px]'>
              <SelectItem value='hanoi'>Hà Nội</SelectItem>
              <SelectItem value='hochiminh'>Hồ Chí Minh</SelectItem>
              <SelectItem value='danang'>Đà Nẵng</SelectItem>
              <SelectItem value='haiphong'>Hải Phòng</SelectItem>
              <SelectItem value='cantho'>Cần Thơ</SelectItem>
              <SelectItem value='hue'>Huế</SelectItem>
              <SelectItem value='nhatrang'>Nha Trang</SelectItem>
              <SelectItem value='vungtau'>Vũng Tàu</SelectItem>
              <SelectItem value='dalat'>Đà Lạt</SelectItem>
              <SelectItem value='halong'>Hạ Long</SelectItem>
              <SelectItem value='phuquoc'>Phú Quốc</SelectItem>
              <SelectItem value='quynhon'>Quy Nhơn</SelectItem>
              <SelectItem value='haiduong'>Hải Dương</SelectItem>
              <SelectItem value='namdinh'>Nam Định</SelectItem>
              <SelectItem value='thaibinh'>Thái Bình</SelectItem>
              <SelectItem value='thanhhoa'>Thanh Hóa</SelectItem>
              <SelectItem value='nghean'>Nghệ An</SelectItem>
              <SelectItem value='hatinh'>Hà Tĩnh</SelectItem>
              <SelectItem value='quangbinh'>Quảng Bình</SelectItem>
              <SelectItem value='quangtri'>Quảng Trị</SelectItem>
              <SelectItem value='quangnam'>Quảng Nam</SelectItem>
              <SelectItem value='quangngai'>Quảng Ngãi</SelectItem>
              <SelectItem value='binhdinh'>Bình Định</SelectItem>
              <SelectItem value='phuyen'>Phú Yên</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className='min-w-[300px]'>
          <h2 className='text-lg font-medium mb-4'>Với lỗi validation</h2>
          <Select
            searchable
            label='Chọn chuyên ngành'
            searchPlaceholder='Tìm chuyên ngành...'
            error='Vui lòng chọn một chuyên ngành'
          >
            <SelectTrigger className='w-[250px]' error>
              <SelectValue placeholder='Chọn chuyên ngành' />
            </SelectTrigger>
            <SelectContent searchable>
              <SelectItem value='cntt'>Công nghệ thông tin</SelectItem>
              <SelectItem value='dtvt'>Điện tử viễn thông</SelectItem>
              <SelectItem value='ktdl'>Khoa học dữ liệu</SelectItem>
              <SelectItem value='attt'>An toàn thông tin</SelectItem>
              <SelectItem value='httt'>Hệ thống thông tin</SelectItem>
              <SelectItem value='ktmt'>Kỹ thuật máy tính</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='flex flex-col gap-4 mt-8'>
        <h2 className='text-lg font-medium'>Các tính năng tìm kiếm cải tiến:</h2>
        <ul className='list-disc ml-6 space-y-2'>
          <li>Không bị mất focus khi đang nhập liệu tìm kiếm</li>
          <li>Tìm kiếm theo từng ký tự, không phân biệt hoa thường</li>
          <li>Lọc cả trong các nhóm, chỉ hiển thị nhóm có kết quả phù hợp</li>
          <li>Hiển thị thông báo khi không tìm thấy kết quả</li>
          <li>ESC xóa nội dung tìm kiếm thay vì đóng dropdown ngay lập tức</li>
          <li>Các phím mũi tên không gây mất focus trong quá trình tìm kiếm</li>
          <li>Tự động reset trạng thái tìm kiếm khi đóng dropdown</li>
        </ul>
      </div>
    </div>
  );
}

export default SelectSearchDemo;
