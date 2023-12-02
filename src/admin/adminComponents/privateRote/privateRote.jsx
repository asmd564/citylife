import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../../context/authContext';

const PrivateRoute = ({ children, ...props }) => {
    const { user } = useAuth();
  
    if (!user) {
      // Если пользователь не авторизован, перенаправляем на страницу логина
      return <Navigate to="/admin/login" />;
    }
  
    return <Route {...props}>{children}</Route>;
  };
  
export default PrivateRoute;