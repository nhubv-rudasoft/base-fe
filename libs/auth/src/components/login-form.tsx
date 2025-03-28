import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { envConfig } from '@libs/config';
import { Button, TextInput } from '@libs/ui/raptor';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth.hook';
import { SignInRequestType } from '../types';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const SignInForm: React.FC = () => {
  const { loginUser } = useAuth();
  const form = useForm<SignInRequestType>({ resolver: yupResolver(schema) });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const [isLoading, setIsLoading] = useState(false);

  // Submit user credentials
  const onSubmit = async (data: SignInRequestType) => {
    setIsLoading(true);
    await loginUser(data);
    setIsLoading(false);
  };

  // Login with Google
  const onGotoGoogle = () => {
    window.location.href = envConfig.oauth2.google;
  };

  return (
    <div className='w-full max-w-md rounded-lg bg-white border border-gray-200 px-10 py-8'>
      <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label='Email'
          size='md'
          placeholder='Email address'
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
          Login
        </Button>

        <div className='flex items-center justify-center gap-2'>
          <div className='h-[1px] w-full bg-gray-200' />
          <span className='text-gray-500 font-mono'>Or</span>
          <div className='h-[1px] w-full bg-gray-200' />
        </div>

        <Button
          type='button'
          size='md'
          variant='outline'
          onClick={onGotoGoogle}
          disabled={isLoading}
        >
          Login with Google
        </Button>

        <p className='text-gray-500 text-center text-sm'>
          Don't have an account?{' '}
          <Link className='text-primary hover:underline' to='/auth/signup'>
            Sign up
          </Link>
          . If you forgot your password, please{' '}
          <Link className='text-primary hover:underline' to='/auth/forgot-password'>
            click here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignInForm;
