import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/core/Navbar';
import ExpenseHistoryTable from '../components/features/ExpenseHistoryTable';
import ExpenseForm from '../components/features/ExpenseForm';
import ApprovalQueue from '../components/features/ApprovalQueue';
import AdminDashboard from '../components/features/AdminDashboard'; // 1. Import the new component
import '../components/features/Modal.css';

const Dashboard = () => {
  const { role } = useAuth();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const renderDashboard = () => {
    switch (role) {
      case 'Employee':
        return (
          <>
            <ExpenseHistoryTable onNewExpenseClick={() => setIsFormOpen(true)} />
            {isFormOpen && (
              <div className="modal-overlay">
                <div className="modal-content large">
                  <div className="modal-header">
                    <h2>New Expense</h2>
                    <button className="modal-close-btn" onClick={() => setIsFormOpen(false)}>&times;</button>
                  </div>
                  <div className="modal-body">
                    <ExpenseForm onClose={() => setIsFormOpen(false)} />
                  </div>
                </div>
              </div>
            )}
          </>
        );
      case 'Manager':
        return <ApprovalQueue />;
      case 'Admin':
        // 2. Render the new AdminDashboard component
        return <AdminDashboard />;
      default:
        return <h2>Welcome! Your role is not set.</h2>;
    }
  };

  return (
    <div>
      <Navbar />
      <main className="main-content-dashboard">
        {renderDashboard()}
      </main>
    </div>
  );
};

export default Dashboard;