import React, { useState } from 'react';
import './Modal.css';

const ApprovalModal = ({ isOpen, action, onClose, onSubmit }) => {
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(comment);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{action} Request</h2>
          <button className="modal-close-btn" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label htmlFor="comment">Comment (Optional)</label>
              <textarea 
                id="comment" 
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={`Reason for ${action.toLowerCase()}ing...`}
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="button-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className={action === 'Approve' ? 'button-approve' : 'button-reject'}>
              {action}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApprovalModal;