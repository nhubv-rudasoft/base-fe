import UserProfileForm from '../components/UserProfileForm.tsx';

export default function UserPage() {
  return (
    <div className='flex flex-col gap-5'>
      <div className='pt-16 font-bold antialiased'>
        <h2 className='text-xl font-extrabold'>User</h2>
        <p className='text-xs font-light text-gray-500'>Welcome back, John Doe</p>
      </div>
      <UserProfileForm />
    </div>
  );
}
