// components/ProtectedRoute.js
import React from 'react';
import {Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const ProtectedRoute = ({ children }) => {

      if(isAuthenticated()){
            return children
      }

      return <Navigate to="/" replace />;
 
};

export default ProtectedRoute;
