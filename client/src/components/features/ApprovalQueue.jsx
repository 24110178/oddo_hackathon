import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import ApprovalModal from './ApprovalModal';
import './Table.css';

const ApprovalQueue = () => {
  const [approvals, setApprovals] = useState([]);
  const [modalState, setModalState] = useState({ isOpen: false, action: null, expense: null });

  useEffect(() => {
    fetchApprovals();
  }, []);

  const fetchApprovals = async () => {
    const { data, error } = await supabase.rpc('get_my_pending_approvals');
    if (error) console.error('Error fetching approvals:', error);
    else setApprovals(data);
  };

  const handleDecision = async (comment) => {
    const { action, expense } = modalState;
    const { error } = await supabase
      .from('expenses')
      .update({ status: action === 'Approve' ? 'Approved' : 'Rejected' })
      .eq('id', expense.id);

    if (error) {
      alert(error.message);
    } else {
      alert(`Expense ${action.toLowerCase()}d!`);
      setModalState({ isOpen: false, action: null, expense: null });
      fetchApprovals(); // Refresh the list
    }
  };

  return (
    <>
      <div className="card">
        <h2 className="card-header">Approvals to Review</h2>
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              {/* Table headers */}
            </thead>
            <tbody>
              {approvals.map((req) => (
                <tr key={req.id}>
                  {/* Table data cells */}
                  <td>{req.description}</td>
                  {/* ... other cells ... */}
                  <td>
                    <div className="actions">
                      <button className="button-approve" onClick={() => setModalState({ isOpen: true, action: 'Approve', expense: req })}>Approve</button>
                      <button className="button-reject" onClick={() => setModalState({ isOpen: true, action: 'Reject', expense: req })}>Reject</button>
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
          onSubmit={handleDecision}
        />
      )}
    </>
  );
};

export default ApprovalQueue;