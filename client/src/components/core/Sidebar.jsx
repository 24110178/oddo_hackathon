import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const { role } = useAuth();

  const renderNavLinks = () => {
    switch (role) {
      case 'Employee':
        return (
          <>
            <NavLink to="/dashboard/expenses" className="nav-link">My Expenses</NavLink>
          </>
        );
      case 'Manager':
        return (
          <>
            <NavLink to="/dashboard/approvals" className="nav-link">Approvals</NavLink>
          </>
        );
      case 'Admin':
        return (
          <>
            <NavLink to="/dashboard/users" className="nav-link">User Management</NavLink>
            <NavLink to="/dashboard/rules" className="nav-link">Approval Rules</NavLink>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {renderNavLinks()}
      </nav>
    </aside>
  );
};

export default Sidebar;