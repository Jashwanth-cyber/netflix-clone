import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Header from './Header'; // Import Header component

const Account = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username'); // Retrieve username from local storage

  const handleLogout = () => {
    Cookies.remove('jwt_token'); // Remove JWT token
    localStorage.removeItem('username'); // Remove username from local storage
    navigate('/'); // Redirect to login page
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header /> {/* Include Header component */}
      <div className="flex flex-col items-center justify-center pt-20">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Account</h1>
          <div className="mb-4">
            <p className="text-gray-600 font-bold">Membership</p>
            <p className="text-gray-800">Email: {username}@gmail.com</p>
            <p className="text-gray-800">Password: ************</p>
          </div>
          <div className="mb-4">
            <p className="text-gray-600 font-bold">Plan details</p>
            <p className="text-gray-800">
              Premium <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded">Ultra HD</span>
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;