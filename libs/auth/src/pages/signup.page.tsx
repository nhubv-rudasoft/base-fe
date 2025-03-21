import SignupForm from '../components/signup-form';

export const SignupPage = () => {
  return (
    <div className='mx-auto flex h-screen w-full flex-col gap-5 items-center justify-center'>
      <h1 className='text-2xl font-bold text-black'>Signup Page</h1>
      <SignupForm />
    </div>
  );
};

SignupPage.displayName = 'SignupPage';
export default SignupPage;
