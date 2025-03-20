import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { Search, Mail } from 'lucide-react';
import { vi } from 'vitest';
import { TextInput } from './text-input';

describe('TextInput', () => {
  // Test render cơ bản
  it('renders correctly with default props', () => {
    render(<TextInput placeholder='Enter text' />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  // Test label
  it('renders with label when provided', () => {
    render(<TextInput label='Username' placeholder='Enter username' />);
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
  });

  // Test các kích thước khác nhau
  it('renders with different sizes', () => {
    const { rerender } = render(<TextInput size='sm' data-testid='input' />);
    expect(screen.getByTestId('input')).toHaveClass('h-8');

    rerender(<TextInput size='md' data-testid='input' />);
    expect(screen.getByTestId('input')).toHaveClass('h-10');

    rerender(<TextInput size='lg' data-testid='input' />);
    expect(screen.getByTestId('input')).toHaveClass('h-12');
  });

  // Test các variants
  it('renders with different variants', () => {
    const { rerender } = render(<TextInput variant='default' data-testid='input' />);
    expect(screen.getByTestId('input')).toHaveClass('border-neutral300');

    rerender(<TextInput variant='outline' data-testid='input' />);
    expect(screen.getByTestId('input')).toHaveClass('bg-transparent');

    rerender(<TextInput variant='filled' data-testid='input' />);
    expect(screen.getByTestId('input')).toHaveClass('bg-neutral100');
  });

  // Test start icon
  it('renders with start icon', () => {
    render(<TextInput startIcon={<Search data-testid='start-icon' />} />);
    expect(screen.getByTestId('start-icon')).toBeInTheDocument();
  });

  // Test end icon
  it('renders with end icon', () => {
    render(<TextInput endIcon={<Mail data-testid='end-icon' />} />);
    expect(screen.getByTestId('end-icon')).toBeInTheDocument();
  });

  // Test helper text
  it('renders helper text when provided', () => {
    render(<TextInput helperText='This is a hint' />);
    expect(screen.getByText('This is a hint')).toBeInTheDocument();
  });

  // Test lỗi
  it('renders error message when provided', () => {
    render(<TextInput error='This field is required' />);
    const errorMessage = screen.getByText('This field is required');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass('text-error');
  });

  // Test trạng thái disabled
  it('is disabled when disabled prop is true', () => {
    render(<TextInput disabled placeholder='Disabled input' />);
    expect(screen.getByPlaceholderText('Disabled input')).toBeDisabled();
    expect(screen.getByPlaceholderText('Disabled input')).toHaveClass('cursor-not-allowed');
  });

  // Test trạng thái loading
  describe('Loading state', () => {
    it('shows loading icon and disables input when isLoading is true', () => {
      render(<TextInput isLoading placeholder='Loading input' />);
      expect(screen.getByPlaceholderText('Loading input')).toBeDisabled();
      // Kiểm tra icon loading (Loader2) xuất hiện
      expect(document.querySelector('svg')).toBeInTheDocument();
    });

    it('hides start icon and shows loading icon when isLoading is true', () => {
      render(
        <TextInput
          isLoading
          startIcon={<Search data-testid='start-icon' />}
          placeholder='Loading input'
        />
      );

      // Start icon không hiển thị khi loading
      expect(screen.queryByTestId('start-icon')).not.toBeInTheDocument();

      // Icon loading xuất hiện
      expect(document.querySelector('svg')).toBeInTheDocument();
    });

    it('hides end icon and shows loading icon when isLoading is true with end icon', () => {
      render(
        <TextInput
          isLoading
          endIcon={<Mail data-testid='end-icon' />}
          placeholder='Loading input'
        />
      );

      // End icon không hiển thị khi loading
      expect(screen.queryByTestId('end-icon')).not.toBeInTheDocument();

      // Icon loading xuất hiện
      expect(document.querySelector('svg')).toBeInTheDocument();
    });

    it('shows loading icons at both positions when both icons exist', () => {
      render(
        <TextInput
          isLoading
          startIcon={<Search data-testid='start-icon' />}
          endIcon={<Mail data-testid='end-icon' />}
          placeholder='Loading input'
        />
      );

      // Cả hai icon gốc không hiển thị
      expect(screen.queryByTestId('start-icon')).not.toBeInTheDocument();
      expect(screen.queryByTestId('end-icon')).not.toBeInTheDocument();

      // Có 2 icon loading (left và right)
      const svgElements = document.querySelectorAll('svg');
      expect(svgElements.length).toBe(2);
    });
  });

  // Test sự kiện
  it('calls onChange when typing', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<TextInput onChange={handleChange} placeholder='Type here' />);

    const input = screen.getByPlaceholderText('Type here');
    await user.type(input, 'hello');

    expect(handleChange).toHaveBeenCalledTimes(5); // 5 ký tự = 5 lần gọi onChange
  });

  // Test ref
  it('forwards ref to the input element', () => {
    const ref = { current: null };
    render(<TextInput ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  // Test custom className
  it('applies custom className to input', () => {
    render(<TextInput className='custom-class' data-testid='input' />);
    expect(screen.getByTestId('input')).toHaveClass('custom-class');
  });

  // Test containerClassName
  it('applies containerClassName to container div', () => {
    render(<TextInput containerClassName='container-class' data-testid='input' />);
    // Container là thẻ div cha của input
    const container = screen.getByTestId('input').closest('div')?.parentElement;
    expect(container).toHaveClass('container-class');
  });
});
