import { useRouter } from 'next/router'; // Import useRouter from next/router
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { register } from '../redux/studentSlice';

const Register = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.student);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState('Student'); // Added role state
  const router = useRouter(); // Initialize useRouter

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    const studentData = {
      name,
      email,
      password,
      role, // Added role to studentData
      examResults: [],
    };
    dispatch(register(studentData)).then((response) => {      
      if (response?.payload?.token) {
        toast.success('User registered successfully');
        router.push('/login'); // Redirect to login page on successful registration
      }
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="card bg-white p-4 rounded-lg shadow" style={{maxWidth: '400px'}}>
        <h2 className="text-gray-800 text-2xl font-bold mb-4">Student Registration Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Name" required className="border p-2 w-full text-black" />
          <input type="email" name="email" placeholder="Email" required className="border p-2 w-full text-black" />
          <div className="relative">
            <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" required className="border p-2 w-full text-black" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 top-0 m-4">
              {showPassword ? <FaEyeSlash className="text-black" /> : <FaEye className="text-black" />}
            </button>
          </div>
          <div className="relative">
            <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" placeholder="Confirm Password" required className="border p-2 w-full text-black" />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-0 top-0 m-4">
              {showConfirmPassword ? <FaEyeSlash className="text-black" /> : <FaEye className="text-black" />}
            </button>
          </div>
          <select name="role" value={role} onChange={(e) => setRole(e.target.value)} className="border p-2 w-full text-black">
            <option value="Student">Student</option>
            <option value="Admin">Admin</option>
          </select>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </button>
          <p className="text-gray-600">Already registered? <a href="/login" className="text-blue-500 hover:text-blue-700">Login</a></p>
        </form>
      </div>
    </div>
  );
};
export default Register;
