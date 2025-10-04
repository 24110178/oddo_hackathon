import React from 'react';
import './Table.css';

const mockApprovals = [
  { id: 1, owner: 'Sarah', category: 'Food', amount: '5000' },
  { id: 2, owner: 'John', category: 'Travel', amount: '12000' },
];

const ApprovalQueue = () => {
  // TODO: Fetch approvals from Supabase
  return (
    <div className="card">
      <h2 className="card-header">Approvals to Review</h2>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Request Owner</th>
              <th>Category</th>
              <th>Amount (in company currency)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockApprovals.map((req) => (
              <tr key={req.id}>
                <td>{req.owner}</td>
                <td>{req.category}</td>
                <td>{req.amount} rs</td>
                <td>
                  <div className="actions">
                    <button className="button-approve">Approve</button>
                    <button className="button-reject">Reject</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApprovalQueue;