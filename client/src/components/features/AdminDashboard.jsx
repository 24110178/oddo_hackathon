import React, { useState } from 'react';
import AdminUserForm from './AdminUserForm';
import ApprovalRulesForm from './ApprovalRulesForm';
import './AdminDashboard.css';

const AdminDashboard = () => {
  // State to track the active tab, 'users' is the default
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div>
      <div className="admin-tabs">
        <button
          className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          User Management
        </button>
        <button
          className={`tab-button ${activeTab === 'rules' ? 'active' : ''}`}
          onClick={() => setActiveTab('rules')}
        >
          Approval Rules
        </button>
      </div>

      <div className="admin-content">
        {/* Conditionally render the component based on the active tab */}
        {activeTab === 'users' && <AdminUserForm />}
        {activeTab === 'rules' && <ApprovalRulesForm />}
      </div>
    </div>
  );
};

export default AdminDashboard;