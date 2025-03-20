import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { envConfig } from '@libs/config';
import { Button, TextInput } from '@libs/ui/raptor';
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

  // Submit user credentials
  const onSubmit = async (data: SignInRequestType) => {
    await loginUser(data);
  };

  // Login with Google
  const onGotoGoogle = () => {
    window.location.href = envConfig.oauth2.google;
  };

  return (
    <div className='w-full max-w-md space-y-4 rounded-2xl bg-white p-8'>
      <form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label='Email'
          size='md'
          placeholder='Medium size'
          {...register('email')}
          error={errors.email?.message}
        />

        <TextInput
          label='Password'
          type='password'
          size='md'
          placeholder='Medium size'
          {...register('password')}
          error={errors.password?.message}
        />
        <Button type='submit' size='md' variant='default'>
          Login
        </Button>

        <Button type='button' size='md' variant='outline' onClick={onGotoGoogle}>
          Login with Google
        </Button>
      </form>
    </div>
  );
};

export default SignInForm;
