import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { supabase } from '../../supabaseClient'; // Make sure you have this client configured
import './ExpenseForm.css';

const ExpenseForm = ({ onClose }) => {
  const { register, handleSubmit } = useForm();
  // 1. Add state to track the upload status
  const [uploadStatus, setUploadStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // 2. Create a ref for the hidden file input
  const fileInputRef = useRef(null);

  const onSubmit = async (data) => {
    if (!user) {
        alert('You must be logged in to submit an expense.');
        return;
    }
    try {
        const { error } = await supabase.from('expenses').insert([{ 
            submitter_id: user.id,
            // company_id should ideally come from the user's profile
            description: data.description,
            amount: data.amount,
            category: data.category,
            expense_date: data.expenseDate,
            status: 'Submitted'
        }]);
        if (error) throw error;
        alert('Expense submitted successfully!');
        onClose();
    } catch (error) {
        alert(error.message);
    }
  };

  // 3. This function is called when the visible "Attach Receipt" button is clicked
  const handleAttachClick = () => {
    fileInputRef.current.click(); // Programmatically click the hidden file input
  };

  // 4. This function handles the file upload to Supabase
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setUploadStatus('Uploading...');

    try {
      // Use a unique file path, e.g., user_id/timestamp-filename
      const filePath = `public/${Date.now()}-${file.name}`;
      
      const { error } = await supabase.storage
        .from('receipts') // The bucket name you created
        .upload(filePath, file);

      if (error) throw error;

      setUploadStatus(`✅ ${file.name} uploaded successfully!`);
    } catch (error) {
      setUploadStatus(`Error: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-action-top">
        {/* 5. The button now triggers our click handler */}
        <button type="button" className="attach-receipt-btn" onClick={handleAttachClick} disabled={isUploading}>
          {isUploading ? 'Uploading...' : 'Attach Receipt'}
        </button>
        {/* Hidden file input */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange}
          style={{ display: 'none' }} 
        />
        <p className="status-flow">Draft &gt; Waiting approval &gt; Approved</p>
      </div>
      {/* 6. Display the confirmation message */}
      {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
      
      {/* ... rest of your form ... */}
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
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="submit-btn">Submit</button>
        </div>
    </form>
  );
};

export default ExpenseForm;