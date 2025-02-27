import { yupResolver } from '@hookform/resolvers/yup';
import { useGetUserProfile, useUpdateUserAvatar, useUpdateUserProfile } from '../hooks/userHook';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { UserUpdateAvatarRequest, UserUpdateProfileRequest } from '../types';
import { IoCameraReverseOutline } from 'react-icons/io5';
import { getFirstChar } from '@/utils/string-utils';
import { useMutateGetFile } from '@/shared/hooks/fileHook';
import { TextInput } from '@/shared/components/common/TextInput';

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: yup.string().required('Phone is required'),
});

export default function UserProfileForm() {

  const { profile } = useGetUserProfile();

  // Mutations
  const { mutation: updateProfileMutation } = useUpdateUserProfile();
  const { mutation: updateAvatarMutation } = useUpdateUserAvatar();
  const { mutation: getFileMutation, file: avatarData } = useMutateGetFile();

  // Form
  const form = useForm({ resolver: yupResolver(schema) });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  // Update profile
  const onSubmit = (data: UserUpdateProfileRequest) => {
    updateProfileMutation.mutate({ payload: data });
  };

  // Update avatar
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentFile = e.target.files?.[0];
    if (currentFile) {
      const payload: UserUpdateAvatarRequest = {
        file: currentFile,
      };
      updateAvatarMutation.mutate({ payload });
    }
  };

  useEffect(() => {
    if (profile) {
      getFileMutation.mutate({ fileId: profile.photoId });

      console.log(avatarData);
      if (avatarData) {
        const objectURL = URL.createObjectURL(avatarData);
        console.log(objectURL);
      }

      form.reset(profile);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, profile]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-col gap-5 rounded-xl bg-white p-10 shadow-sm'>
        <div className='relative flex flex-col gap-6'>
          <label
            className={`group relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-full ${
              profile?.avatar ? 'bg-transparent' : 'bg-orange-900'
            }`}
          >
            <IoCameraReverseOutline
              size={24}
              className='absolute z-10 hidden text-2xl text-white group-hover:block'
            />
            {profile?.avatar == null && (
              <span className='text-2xl text-white uppercase'>
                {getFirstChar(profile?.firstName || '')}
              </span>
            )}
            <input
              type='file'
              className='hidden'
              accept='image/jpeg,image/jpg,image/png'
              onChange={handleAvatarChange}
            />
          </label>
        </div>

        <div className='grid grid-cols-2 gap-5'>
          <TextInput
            label='First Name'
            error={errors.firstName?.message}
            {...register('firstName')}
          />
          <TextInput
            label='Last Name'
            error={errors.lastName?.message}
            {...register('lastName')}
          />
        </div>

        <TextInput
          type='email'
          label='Email'
          error={errors.email?.message}
          {...register('email')}
        />

        <TextInput
          type='text'
          label='Phone Number'
          error={errors.phoneNumber?.message}
          {...register('phoneNumber')}
        />

        <button type='submit' className='rounded-md bg-blue-500 p-2 text-sm text-white'>
          Update
        </button>
      </div>
    </form>
  );
}
