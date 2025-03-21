import ResetPasswordForm from '../components/reset-password-form';

export const ResetPasswordPage = () => {
  return (
    <div className='mx-auto flex h-screen w-full flex-col gap-5 items-center justify-center'>
      <h1 className='text-2xl font-bold text-black'>Reset Password</h1>
      <ResetPasswordForm />
    </div>
  );
};

export default ResetPasswordPage;
