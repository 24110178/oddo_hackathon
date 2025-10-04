import React, { useState } from 'react';
import './Table.css';
import ApprovalModal from './ApprovalModal';

const mockApprovals = [
  { id: 1, owner: 'Sarah', category: 'Food', status: 'Pending', amount: '49896', subject: 'Client Lunch' },
];

const ApprovalQueue = () => {
  const [modalState, setModalState] = useState({ isOpen: false, action: null, expense: null });

  const handleActionClick = (action, expense) => {
    setModalState({ isOpen: true, action, expense });
  };

  const handleModalSubmit = (comment) => {
    console.log({
      action: modalState.action,
      expenseId: modalState.expense.id,
      comment: comment,
    });
    alert(`Action: ${modalState.action} with comment: "${comment}"`);
    setModalState({ isOpen: false, action: null, expense: null });
  };

  return (
    <>
      <div className="card">
        <h2 className="card-header">Approvals to Review</h2>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Approval Subject</th>
                <th>Request Owner</th>
                <th>Category</th>
                <th>Request Status</th>
                <th>Total Amount (in company's currency)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockApprovals.map((req) => (
                <tr key={req.id}>
                  <td>{req.subject}</td>
                  <td>{req.owner}</td>
                  <td>{req.category}</td>
                  <td>
                    <span className="status-badge status-submitted">{req.status}</span>
                  </td>
                  <td>{req.amount} rs</td>
                  <td>
                    <div className="actions">
                      <button className="button-approve" onClick={() => handleActionClick('Approve', req)}>Approve</button>
                      <button className="button-reject" onClick={() => handleActionClick('Reject', req)}>Reject</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {modalState.isOpen && (
        <ApprovalModal 
          isOpen={modalState.isOpen}
          action={modalState.action}
          onClose={() => setModalState({ isOpen: false, action: null, expense: null })}
          onSubmit={handleModalSubmit}
        />
      )}
    </>
  );
};

export default ApprovalQueue;