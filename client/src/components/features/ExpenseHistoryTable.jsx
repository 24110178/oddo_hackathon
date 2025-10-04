import React from 'react';
import './Table.css'; 

const mockExpenses = [
  { id: 1, description: 'Restaurant bill', date: '4th Oct, 2025', category: 'Food', amount: '5000 rs', status: 'Approved' },
  { id: 2, description: 'Flight to Delhi', date: '2nd Oct, 2025', category: 'Travel', amount: '12000 rs', status: 'Submitted' },
];

const ExpenseHistoryTable = ({ onNewExpenseClick }) => {
  return (
    <div className="card">
      <div className="card-header-action">
        <h2 className="card-header">My Expenses</h2>
        <button className="button-primary" onClick={onNewExpenseClick}>
          New Expense
        </button>
      </div>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Date</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {mockExpenses.map((exp) => (
              <tr key={exp.id}>
                <td>{exp.description}</td>
                <td>{exp.date}</td>
                <td>{exp.category}</td>
                <td>{exp.amount}</td>
                <td>
                  <span className={`status-badge status-${exp.status.toLowerCase()}`}>{exp.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseHistoryTable;