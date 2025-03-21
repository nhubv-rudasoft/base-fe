import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, TextInput } from '@libs/ui/raptor';
import { Link, useNavigate } from 'react-router-dom';
import { ResetPasswordRequestType } from '../types';

const schema = yup.object().shape({
  token: yup.string().required('Token is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  newPassword: yup.string().required('New password is required'),
});

const ResetPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const form = useForm({ resolver: yupResolver(schema) });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState<number>(5000); // 5 seconds

  // Submit user credentials
  const onSubmit = async (data: ResetPasswordRequestType) => {
    setIsLoading(true);
    setIsSubmitted(true);
    setIsLoading(false);
  };

  useEffect(() => {
    const accessToken = new URLSearchParams(window.location.search).get('token');
    const email = new URLSearchParams(window.location.search).get('email');
    if (accessToken && email) {
      form.setValue('token', accessToken || '');
      form.setValue('email', email || '');
    }
  }, [form, navigate]);

  // auto back to sign in after 5 seconds
  useEffect(() => {
    if (isSubmitted) {
      const interval = setInterval(() => {
        setRedirectCountdown((prev: number) => prev - 1);
        if (redirectCountdown <= 0) {
          clearInterval(interval);
          handleBackToSignIn();
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isSubmitted]);

  const handleBackToSignIn = useCallback(() => {
    navigate('/auth/signin');
    setIsSubmitted(false);
  }, [navigate]);

  return (
    <div className='w-full max-w-md rounded-lg bg-white border border-gray-200 px-10 py-8'>
      {isSubmitted ? (
        <div className='flex flex-col gap-3 items-center justify-center'>
          <p className='text-gray-500 text-center text-sm'>
            Password reset successfully. Auto redirecting to Sign In in {redirectCountdown} seconds
          </p>
          <Button size='md' variant='default' onClick={handleBackToSignIn}>
            Back to Sign In
          </Button>
        </div>
      ) : (
        <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label='Password'
            type='password'
            size='md'
            placeholder='Password'
            {...register('password')}
            error={errors.password?.message}
          />

          <TextInput
            label='New Password'
            type='password'
            size='md'
            placeholder='New Password'
            {...register('newPassword')}
          />

          <Button type='submit' size='md' variant='default' isLoading={isLoading}>
            Reset Password
          </Button>

          <p className='text-gray-500 text-center text-sm'>
            <Link className='text-primary hover:underline' to='/auth/signin'>
              Back to login
            </Link>
          </p>
        </form>
      )}
    </div>
  );
};

export default ResetPasswordForm;
