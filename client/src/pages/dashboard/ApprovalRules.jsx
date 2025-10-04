import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import './ApprovalRules.css';

const ApprovalRules = () => {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      approvers: [{ name: '' }]
    }
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "approvers"
  });

  const onSubmit = (data) => {
    console.log(data);
    alert('Approval rule saved!');
  };

  return (
    <div className="card">
      <h2 className="card-header">Admin View (Approval Rules)</h2>
      <form className="approval-rules-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Description</label>
          <input placeholder="Approval rule for miscellaneous expenses" {...register('description')} />
        </div>

        <div className="approvers-section">
          <label className="section-label">Approvers</label>
          <div className="form-checkbox">
            <input type="checkbox" id="isManagerApprover" {...register('isManagerApprover')} />
            <label htmlFor="isManagerApprover">If this field is ticked, then by default the approve request would go to his/her manager first.</label>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="approver-row">
              <span>{index + 1}</span>
              <input placeholder="User (e.g., John)" {...register(`approvers.${index}.name`)} />
              <div className="form-checkbox small">
                <input type="checkbox" id={`required-${index}`} {...register(`approvers.${index}.required`)} />
                <label htmlFor={`required-${index}`}>Required</label>
              </div>
              <button type="button" className="remove-btn" onClick={() => remove(index)}>Remove</button>
            </div>
          ))}
          <button type="button" className="add-btn" onClick={() => append({ name: '' })}>
            + Add Approver
          </button>
        </div>

        <div className="form-group">
          <div className="form-checkbox">
            <input type="checkbox" id="useSequence" {...register('useSequence')} />
            <label htmlFor="useSequence">Approvers Sequence</label>
          </div>
        </div>
        
        <div className="form-group">
          <label>Minimum Approval Percentage (%)</label>
          <input type="number" placeholder="%" {...register('minApprovalPercentage')} />
        </div>

        <button type="submit" className="button-primary" style={{ marginTop: '1rem' }}>Save Rule</button>
      </form>
    </div>
  );
};

export default ApprovalRules;