import React from 'react';
import { useForm } from 'react-hook-form';
import './ExpenseForm.css';

const ExpenseForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // TODO: Supabase logic to submit the expense
    console.log(data);
    alert('Expense submitted!');
  };

  return (
    <div className="card">
      <h2 className="card-header">Submit New Expense</h2>
      <form className="expense-form" onSubmit={handleSubmit(onSubmit)}>
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
            <select id="category" {...register('category')}>
              <option value="">Select category...</option>
              <option value="food">Food</option>
              <option value="travel">Travel</option>
              <option value="supplies">Office Supplies</option>
            </select>
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
        <div className="form-group">
          <label htmlFor="remarks">Remarks</label>
          <textarea id="remarks" placeholder="Any additional notes..." {...register('remarks')}></textarea>
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default ExpenseForm;