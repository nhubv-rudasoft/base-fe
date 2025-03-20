import React from 'react';
import { TextInput } from './text-input';

export const TextInputExample = () => {
  return (
    <div className='flex flex-col space-y-6 p-6'>
      <h1 className='text-2xl font-bold text-neutral800'>Text Input Examples</h1>

      {/* Basic usage */}
      <div className='space-y-2'>
        <h2 className='text-xl font-semibold text-neutral700'>Basic Text Input</h2>
        <TextInput placeholder='Enter your name' label='Name' />
      </div>

      {/* Sizes */}
      <div className='space-y-2'>
        <h2 className='text-xl font-semibold text-neutral700'>Sizes</h2>
        <div className='space-y-4'>
          <TextInput size='sm' placeholder='Small input' label='Small' />
          <TextInput size='md' placeholder='Medium input' label='Medium (default)' />
          <TextInput size='lg' placeholder='Large input' label='Large' />
        </div>
      </div>

      {/* Variants */}
      <div className='space-y-2'>
        <h2 className='text-xl font-semibold text-neutral700'>Variants</h2>
        <div className='space-y-4'>
          <TextInput variant='default' placeholder='Default variant' label='Default' />
          <TextInput variant='outline' placeholder='Outline variant' label='Outline' />
          <TextInput variant='filled' placeholder='Filled variant' label='Filled' />
        </div>
      </div>

      {/* With Icons */}
      <div className='space-y-2'>
        <h2 className='text-xl font-semibold text-neutral700'>With Icons</h2>
        <div className='space-y-4'>
          <TextInput
            startIcon={<SearchIcon className='h-4 w-4' />}
            placeholder='Search...'
            label='Search with start icon'
          />
          <TextInput
            endIcon={<EmailIcon className='h-4 w-4' />}
            placeholder='Enter your email'
            label='Email with end icon'
          />
          <TextInput
            startIcon={<UserIcon className='h-4 w-4' />}
            endIcon={<CheckIcon className='h-4 w-4' />}
            placeholder='Username'
            label='With both icons'
          />
        </div>
      </div>

      {/* With error and helper text */}
      <div className='space-y-2'>
        <h2 className='text-xl font-semibold text-neutral700'>Validation & Helper Text</h2>
        <div className='space-y-4'>
          <TextInput
            placeholder='Enter your email'
            label='Email'
            helperText='We will never share your email'
          />
          <TextInput
            placeholder='Enter your password'
            label='Password'
            type='password'
            error='Password must be at least 8 characters'
          />
        </div>
      </div>

      {/* Disabled state */}
      <div className='space-y-2'>
        <h2 className='text-xl font-semibold text-neutral700'>Disabled</h2>
        <TextInput placeholder='This input is disabled' label='Disabled input' disabled />
      </div>
    </div>
  );
};

// Icon components for examples
const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    {...props}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
    />
  </svg>
);

const EmailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    {...props}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
    />
  </svg>
);

const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    {...props}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
    />
  </svg>
);

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    {...props}
  >
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
  </svg>
);
