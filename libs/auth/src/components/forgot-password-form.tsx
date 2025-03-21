import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, TextInput } from '@libs/ui/raptor';
import { Link } from 'react-router-dom';
import { ForgotPasswordRequestType } from '../types';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
});

const ForgotPasswordForm: React.FC = () => {
  const form = useForm<ForgotPasswordRequestType>({ resolver: yupResolver(schema) });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const [isLoading, setIsLoading] = useState(false);

  // Submit user credentials
  const onSubmit = async (data: ForgotPasswordRequestType) => {
    setIsLoading(true);
    setIsLoading(false);
  };

  return (
    <div className='w-full max-w-md rounded-lg bg-white border border-gray-200 px-10 py-8'>
      <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label='Email'
          type='email'
          size='md'
          placeholder='Email'
          {...register('email')}
          error={errors.email?.message}
        />

        <Button type='submit' size='md' variant='default' isLoading={isLoading}>
          Submit
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
