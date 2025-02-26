import LoginForm from '../components/LoginForm.tsx';

export default function LoginPage() {
  return (
    <div className='mx-auto flex h-screen w-full flex-col items-center justify-center'>
      <h1 className='text-2xl font-bold text-black'>Login</h1>
      <LoginForm />
    </div>
  );
}
