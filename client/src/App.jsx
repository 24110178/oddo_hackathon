import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Core Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/core/ProtectedRoute';

// Dashboard Pages (Nested)
import MyExpenses from './pages/dashboard/MyExpenses';
import Approvals from './pages/dashboard/Approvals';
import UserManagement from './pages/dashboard/UserManagement';
import ApprovalRules from './pages/dashboard/ApprovalRules';
import DashboardIndex from './pages/dashboard/DashboardIndex'; // <-- 1. Import the new component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route 
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route path="expenses" element={<MyExpenses />} />
          <Route path="approvals" element={<Approvals />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="rules" element={<ApprovalRules />} />
          
          {/* 2. Use the new component for the index route */}
          <Route index element={<DashboardIndex />} /> 
        </Route>
        
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;