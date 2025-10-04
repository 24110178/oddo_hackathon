import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const DashboardIndex = () => {
  const { role } = useAuth();

  // This component's only job is to redirect based on the user's role.
  const getDefaultRoute = () => {
    switch (role) {
      case 'Employee':
        return '/dashboard/expenses';
      case 'Manager':
        return '/dashboard/approvals';
      case 'Admin':
        // Let's make User Management the default for Admins
        return '/dashboard/users';
      default:
        // Fallback to login if role is not found
        return '/login';
    }
  };

  return <Navigate to={getDefaultRoute()} replace />;
};

export default DashboardIndex;