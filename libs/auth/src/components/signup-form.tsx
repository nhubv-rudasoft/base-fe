import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, TextInput } from '@libs/ui/raptor';
import { Link } from 'react-router-dom';
import { SignUpRequestType } from '../types';
import { useSignup } from '../auth.hook';
const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const ForgotPasswordForm: React.FC = () => {
  const form = useForm<SignUpRequestType>({ resolver: yupResolver(schema) });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const [isLoading, setIsLoading] = useState(false);
  const { mutate, isPending, isError, error } = useSignup();

  // Submit user credentials
  const onSubmit = async (data: SignUpRequestType) => {
    setIsLoading(true);
    await mutate(data);
    setIsLoading(false);
  };

  return (
    <div className='w-full max-w-md rounded-lg bg-white border border-gray-200 px-10 py-8'>
      <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex gap-4'>
          <div className='flex-1'>
            <TextInput
              label='First Name'
              type='text'
              size='md'
              placeholder='First Name'
              {...register('firstName')}
              error={errors.firstName?.message}
            />
          </div>
          <div className='flex-1'>
            <TextInput
              label='Last Name'
              type='text'
              size='md'
              placeholder='Last Name'
              {...register('lastName')}
              error={errors.lastName?.message}
            />
          </div>
        </div>

        <TextInput
          label='Email'
          type='email'
          size='md'
          placeholder='Email'
          {...register('email')}
          error={errors.email?.message}
        />

        <TextInput
          label='Password'
          type='password'
          size='md'
          placeholder='Password'
          {...register('password')}
          error={errors.password?.message}
        />

        <Button type='submit' size='md' variant='default' isLoading={isLoading}>
          Sign Up
        </Button>

        <p className='text-gray-500 text-center text-sm'>
          Already have an account?{' '}
          <Link className='text-primary hover:underline' to='/auth/signin'>
            Back to login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
