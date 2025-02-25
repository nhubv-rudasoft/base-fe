import { useAuth } from '../hooks/authHook';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LoginRequest } from '../types';
import { Link } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa6';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export function LoginForm() {
  const { loginUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: LoginRequest) => {
    loginUser(data);
  };

  return (
    <div className='w-full max-w-md space-y-4 rounded-2xl bg-white p-8 shadow-xl'>
      <form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='email' className='mb-1 block text-sm font-medium text-gray-700'>
            Email
          </label>
          <input
            type='email'
            id='email'
            {...register('email')}
            className='mt-1 h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs text-gray-700 focus:border-yellow-500 focus:ring-yellow-500'
          />
          {errors.email && <p className='mt-1 text-sm text-red-500'>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor='password' className='mb-1 block text-sm font-medium text-gray-700'>
            Password
          </label>
          <input
            type='password'
            id='password'
            {...register('password')}
            className='mt-1 h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs text-gray-700 focus:border-yellow-500 focus:ring-yellow-500'
          />
          {errors.password && (
            <p className='mt-1 text-sm text-red-500'>{errors.password.message}</p>
          )}
        </div>

        <div className='flex flex-col items-center justify-center gap-4'>
          <button
            type='submit'
            className='w-full rounded-lg bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600'
          >
            Login
          </button>

          <button
            type='button'
            className='flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border bg-white px-4 py-2 text-sm text-gray-500 hover:bg-gray-50'
          >
            <FaGoogle size={20} />
            <span>Login with Google</span>
          </button>

          <Link to='/register' className='text-xs text-gray-500'>
            Don&apos;t have an account? Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
