import ForgotPasswordForm from '../components/forgot-password-form';

export const ForgotPasswordPage = () => {
  return (
    <div className='mx-auto flex h-screen w-full flex-col gap-5 items-center justify-center'>
      <h1 className='text-2xl font-bold text-black'>Forgot Password</h1>
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPasswordPage;
