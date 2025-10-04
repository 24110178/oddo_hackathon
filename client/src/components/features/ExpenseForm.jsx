import React from 'react';
import { useForm } from 'react-hook-form';
import './ExpenseForm.css';

const ExpenseForm = ({ onClose }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    alert('Expense submitted!');
    onClose(); // Close the modal
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-action-top">
            <button type="button" className="attach-receipt-btn">Attach Receipt</button>
            <p className="status-flow">Draft &gt; Waiting approval &gt; Approved</p>
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input id="description" placeholder="e.g., Client Dinner" {...register('description')} />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="expenseDate">Expense Date</label>
            <input id="expenseDate" type="date" {...register('expenseDate')} />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select id="category" {...register('category')}><option value="food">Food</option></select>
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="amount">Total Amount</label>
            <input id="amount" type="number" placeholder="567" {...register('amount')} />
          </div>
           <div className="form-group">
            <label htmlFor="paidBy">Paid By</label>
            <input id="paidBy" placeholder="Your Name" {...register('paidBy')} />
          </div>
        </div>
        
        <div className="approval-log">
            <h4>Approval History</h4>
            <div className="log-item">
                <span>Sarah</span>
                <span>Approved</span>
                <span>12:44 4th Oct, 2025</span>
            </div>
        </div>

        <div className="form-footer">
            <button type="submit" className="submit-btn">Submit</button>
        </div>
    </form>
  );
};

export default ExpenseForm;