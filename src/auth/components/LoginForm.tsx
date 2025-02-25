import { useAuth } from '../hooks/authHook';
export function LoginForm() {
  const { loginUser } = useAuth();
  return (
    <div className='bg-primary prose flex h-screen items-center justify-center'>
      <button
        onClick={() =>
          loginUser({
            email: 'nhubv.it@gmail.com',
            password: 'HaNoi1234@#$',
          })
        }
        className='bg-secondary p-4 text-white'
      >
        Login
      </button>
    </div>
  );
}

export default LoginForm;
