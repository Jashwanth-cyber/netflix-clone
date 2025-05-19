import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    const userDetails = { username, password };

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      });

      const data = await response.json();
      if (data.status_code !== 400) {
        Cookies.set('jwt_token', data.jwt_token);
        localStorage.setItem('username', username); // Save username in local storage
        navigate('/home'); 
      } else {
        setError(data.error_msg); 
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-black md:bg-[url('https://i.pinimg.com/736x/a5/b5/e1/a5b5e1635f8236317709ada555d1f19e.jpg')] bg-cover">
      <h1 className='fixed top-0 left-0 text-red-600 text-4xl font-bold p-6  '>MOVIES</h1>
      <div className="bg-black bg-opacity-50 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-6 relative">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'} 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)} 
              className="absolute inset-y-0 top-6 right-3 flex items-center text-gray-500"
            >
              {showPassword ? '🙈' : '👁️'} 
            </button>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;