import LoginForm from '../components/login-form';

const SignInPage = () => {
  return (
    <div className='mx-auto flex h-screen w-full flex-col items-center justify-center'>
      <h1 className='text-2xl font-bold text-black'>Login</h1>
      <LoginForm />
    </div>
  );
};

SignInPage.displayName = 'SignInPage';
export default SignInPage;
