import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../context/AuthContext';
import './Table.css';

const ExpenseHistoryTable = ({ onNewExpenseClick }) => {
  const [expenses, setExpenses] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchExpenses = async () => {
      if (!user) return;
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('submitter_id', user.id)
        .order('created_at', { ascending: false });

      if (error) console.error('Error fetching expenses:', error);
      else setExpenses(data);
    };

    fetchExpenses();
  }, [user]); // Re-fetch if the user changes

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
            {expenses.map((exp) => (
              <tr key={exp.id}>
                <td>{exp.description}</td>
                <td>{exp.expense_date}</td>
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