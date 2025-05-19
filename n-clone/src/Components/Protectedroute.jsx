import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const jwtToken = Cookies.get('jwt_token');

  if (!jwtToken) {
   
    return <Navigate to="/" />;
  }

 
  return children;
};

export default ProtectedRoute;