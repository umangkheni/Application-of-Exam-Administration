import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/studentSlice';

const Login = () => {
  const dispatch = useDispatch();
  const { isLoading, currentStudent } = useSelector(state => state.student);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    const loginData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    dispatch(login(loginData)).then((response) => {
      console.log(response);
      
      if (response?.payload?.token) {
        localStorage.setItem('token', response.payload.token);
        localStorage.setItem('user', JSON.stringify(response.payload.data));
        if (response?.payload?.data?.role === 'Admin') {
          router.push('/admin');
        } else {
          router.push('/exam');
        }
      }
    });
  };

  useEffect(() => {
    if (currentStudent && currentStudent.role) {
      if (currentStudent.role === 'Admin') {
        router.push('/admin');
      } else {
        router.push('/exam');
      }
    }
  }, [currentStudent, router]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="card bg-white p-4 rounded-lg shadow" style={{maxWidth: '400px'}}>
        <h2 className="text-gray-800 text-2xl font-bold mb-4">Student Login Form</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" name="email" placeholder="Email" required className="border p-2 w-full text-black" />
          <input type="password" name="password" placeholder="Password" required className="border p-2 w-full text-black" />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          <p className="text-gray-600">Not registered? <Link href="/register" legacyBehavior><a className="text-blue-500 hover:text-blue-700">Register</a></Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
