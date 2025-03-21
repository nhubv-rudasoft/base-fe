import LoginForm from '../components/login-form';

const SignInPage = () => {
  return (
    <div className='mx-auto flex h-screen w-full flex-col gap-5 items-center justify-center'>
      <h1 className='text-2xl font-bold text-black'>Login to your account</h1>
      <LoginForm />
    </div>
  );
};

SignInPage.displayName = 'SignInPage';
export default SignInPage;
