import { useAuth } from '../hooks/authHook';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LoginRequest } from '../types';
import { Link } from 'react-router-dom';
import { OAUTH2_GOOGLE_URL } from '@/config/env.ts';
import { TextInput } from '@/shared/components/common/TextInput';
import googleIcon from '@/assets/icons/google.svg';
import Button from '@/shared/components/common/Button';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export function LoginForm() {
  const { loginUser, isLoading } = useAuth();
  const form = useForm<LoginRequest>({ resolver: yupResolver(schema) });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  // Submit user credentials
  const onSubmit = (data: LoginRequest) => {
    loginUser(data);
  };

  // Login with Google
  const onGotoGoogle = () => {
    window.location.href = OAUTH2_GOOGLE_URL;
  };

  return (
    <div className='w-full max-w-md space-y-4 rounded-2xl bg-white p-8 shadow-xl'>
      <form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          inputClassName='h-12 !text-base'
          label='Email'
          type='email'
          error={errors.email?.message}
          {...register('email')}
        />

        <TextInput
          inputClassName='h-12 !text-base'
          label='Password'
          type='password'
          error={errors.password?.message}
          {...register('password')}
        />

        <div className='flex flex-col items-center justify-center gap-4'>
          <Button
            type='submit'
            size='large'
            isLoading={isLoading}
            disabled={isLoading}
          >
            Login
          </Button>

          <Button
            variant='default'
            onClick={onGotoGoogle}
            type='button'
            size='large'
            icon={<img src={googleIcon} alt='Login with Google' height={18} width={18} />}
          >
            Login with Google
          </Button>

          <Link
            to='/register'
            className='text-xs text-gray-700 hover:underline'
          >
            Don&apos;t have an account? Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
