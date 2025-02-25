import { yupResolver } from '@hookform/resolvers/yup';
import { useProfile } from '../hooks/userHook';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone is required'),
});

export default function UserProfileForm() {
  const { profile } = useProfile();
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  useEffect(() => {
    if (profile) {
      setValue('name', profile.firstName);
      setValue('email', profile.email);
      setValue('phone', profile.phone);
    }
  }, [profile]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-5 rounded-md shadow-sm bg-white p-5'>
        <div className='flex flex-col gap-2'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            id='name'
            className='w-full rounded-md border border-gray-300 bg-white p-2'
            {...register('name')}
          />
          {errors.name && <p className='mt-1 text-sm text-red-500'>{errors.name.message}</p>}
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='email'>Email </label>
          <input
            type='email'
            id='email'
            className='w-full rounded-md border border-gray-300 bg-white p-2'
            {...register('email')}
          />
          {errors.email && <p className='mt-1 text-sm text-red-500'>{errors.email.message}</p>}
        </div>

        <div className='flex flex-col gap-2'>
          <label htmlFor='phone'>Phone </label>
          <input
            type='text'
            id='phone'
            className='w-full rounded-md border border-gray-300 bg-white p-2'
            {...register('phone')}
          />
          {errors.phone && <p className='mt-1 text-sm text-red-500'>{errors.phone.message}</p>}
        </div>
      </div>
    </form>
  );
}


