import React from 'react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/core/Layout';

// Feature Components
import ExpenseForm from '../components/features/ExpenseForm';
import ExpenseHistoryTable from '../components/features/ExpenseHistoryTable';
import ApprovalQueue from '../components/features/ApprovalQueue';
import AdminUserForm from '../components/features/AdminUserForm';

const Dashboard = () => {
  const { role } = useAuth();
  

  const renderDashboard = () => {
    switch (role) {
      case 'Employee':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <ExpenseForm />
            <ExpenseHistoryTable />
          </div>
        );
      case 'Manager':
        return <ApprovalQueue />;
      case 'Admin':
        return <AdminUserForm />;
      default:
        return <h2>Welcome! Your role is not set.</h2>;
    }
  };

  return (
    <Layout>
      {renderDashboard()}
    </Layout>
  );
};

export default Dashboard;