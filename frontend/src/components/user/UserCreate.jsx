// Signup
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthSite from '../sites/AuthSite';

export default function UserCreate() {
  const BASE_URL = import.meta.env.VITE_SERVER_URL;

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    user_name: '',
    email: '',
    password: '',
    repeatPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordsMatchError, setPasswordsMatchError] = useState(false);

  // Submit Form
  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (passwordsMatchError) {
      return;
    }
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    };

    try {
      setLoading(true);

      const response = await fetch(
        `${BASE_URL}/api/user/create`,
        requestOptions
      );
      const data = await response.json();

      if (!response.ok) {
        setError(data.error.errors[0].msg);
        return;
      }

      console.log('New user created:', data);
      setUserData({
        user_name: '',
        email: '',
        password: '',
        repeatPassword: '',
      });
      navigate('/login');
    } catch (error) {
      console.error('Error during user creation:', error);
      setError('Error during user creation. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Check if passwords are equal
    if (name === 'repeatPassword') {
      setPasswordsMatchError(value !== userData.password);
    }
  };

  return (
    <AuthSite title={'Sign up'}>
      <form onSubmit={handleCreateUser}>
        <label htmlFor="user_name" className="w-full mb-5">
          Username:
          <span className="text-red-500">*</span>
          <input
            className="w-full px-2 py-1 mt-2 mb-6 border border-gray-400 rounded-sm shadow-sm focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-primary/20 focus:border-primary dark:text-black"
            id="user_name"
            type="text"
            name="user_name"
            value={userData.user_name}
            onChange={handleChange}
            required={true}
          />
        </label>

        <label htmlFor="email" className="w-full mb-5 ">
          Email:
          <span className="text-red-500">*</span>
          <input
            className="w-full px-2 py-1 mt-2 mb-6 border border-gray-400 rounded-sm shadow-sm focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-primary/20 focus:border-primary dark:text-black"
            id="email"
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            autoComplete="true"
            required={true}
          />
        </label>

        <label htmlFor="password" className="w-full mb-5">
          Password:
          <span className="text-red-500">*</span>
          <input
            className="w-full px-2 py-1 mt-2 mb-6 border border-gray-400 rounded-sm shadow-sm focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-primary/20 focus:border-primary dark:text-black"
            id="password"
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required={true}
          />
        </label>

        <label htmlFor="repeatPassword" className="w-full mb-5">
          Repeat Password:
          <span className="text-red-500">*</span>
          <input
            className="w-full px-2 py-1 mt-2 mb-6 border border-gray-400 rounded-sm shadow-sm focus:outline-none focus:ring ring-transparent ring-offset-2 ring-offset-primary/20 focus:border-primary dark:text-black"
            id="repeatPassword"
            type="password"
            name="repeatPassword"
            value={userData.repeatPassword}
            onChange={handleChange}
            required={true}
          />
        </label>

        <button
          className="w-full py-2 mt-5 mb-5 font-medium text-white rounded-sm bg-primary hover:bg-primary/80"
          type="submit"
          disabled={loading}
        >
          {loading ? `Creating User: ${userData.user_name}` : 'Signup'}
        </button>
        <div className="w-2/5 py-1 mt-5 mb-5 text-center text-white rounded-sm hover:cursor-pointer bg-info hover:bg-info/80">
          <Link to={'/login'}>or login</Link>
        </div>
        {/* Error from backend */}
        {error && <div style={{ color: 'red', fontSize: '1rem' }}>{error}</div>}
      </form>
    </AuthSite>
  );
}
