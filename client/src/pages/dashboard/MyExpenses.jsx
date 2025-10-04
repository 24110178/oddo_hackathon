import React, { useState } from 'react';
import ExpenseHistoryTable from '../../components/features/ExpenseHistoryTable';
import ExpenseForm from '../../components/features/ExpenseForm';
import '../../components/features/Modal.css';

const MyExpenses = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div>
      <ExpenseHistoryTable onNewExpenseClick={() => setIsFormOpen(true)} />

      {isFormOpen && (
        <div className="modal-overlay">
          <div className="modal-content large"> {/* Use large class for bigger modal */}
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
    </div>
  );
};

export default MyExpenses;