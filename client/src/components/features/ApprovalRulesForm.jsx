import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import './ApprovalRulesForm.css';

const ApprovalRulesForm = () => {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      approvers: [{ name: 'John', required: true, canAutoApprove: false }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "approvers"
  });

const onSubmit = async (data) => {
    try {
      // Step 1: Insert the main rule and get its ID
      const { data: ruleData, error: ruleError } = await supabase
        .from('approval_rules')
        .insert({
          // You'll need to fetch the admin's company_id
          description: data.description,
          is_manager_approver: data.isManagerApprover,
          use_sequence: data.useSequence,
          min_approval_percentage: data.minApprovalPercentage
        })
        .select()
        .single();
      
      if (ruleError) throw ruleError;

      // Step 2: Prepare the approvers data with the new rule ID
      const approversToInsert = data.approvers.map((approver, index) => ({
        rule_id: ruleData.id,
        // approver_id: In a real app, you'd look up the user's ID from their name
        step_number: data.useSequence ? index + 1 : null,
        is_required: approver.required,
        can_auto_approve: approver.canAutoApprove
      }));

      // Step 3: Insert all the approvers linked to the rule
      if (approversToInsert.length > 0) {
          const { error: approversError } = await supabase
            .from('rule_approvers')
            .insert(approversToInsert);

          if (approversError) throw approversError;
      }
      
      alert('Approval rule saved successfully!');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="card">
      <h2 className="card-header">Admin View (Approval Rules)</h2>
      <form className="approval-rules-form" onSubmit={handleSubmit(onSubmit)}>
        
        <div className="form-grid">
          <div className="form-column">
            <div className="form-group">
              <label>Description about rules</label>
              <input 
                placeholder="Approval rule for miscellaneous expenses" 
                {...register('description')} 
              />
            </div>
            <div className="form-group">
              <label>Manager</label>
              <select {...register('manager')}>
                <option value="sarah">Sarah</option>
                <option value="marc">Marc</option>
              </select>
            </div>
          </div>

          <div className="form-column">
            <div className="approvers-section">
              <label className="section-label">Approvers</label>
              <div className="form-checkbox">
                <input type="checkbox" id="isManagerApprover" {...register('isManagerApprover')} />
                <label htmlFor="isManagerApprover">Is manager an approver?</label>
              </div>

              {fields.map((field, index) => (
                <div key={field.id} className="approver-row">
                  <span>{index + 1}</span>
                  <input 
                    placeholder="User name" 
                    {...register(`approvers.${index}.name`)} 
                  />
                  <div className="form-checkbox required-check">
                    <input type="checkbox" id={`required-${index}`} {...register(`approvers.${index}.required`)} />
                    <label htmlFor={`required-${index}`}>Required</label>
                  </div>
                  {/* --- NEW CHECKBOX FOR SPECIFIC APPROVER RULE --- */}
                  <div className="form-checkbox auto-approve-check">
                    <input type="checkbox" id={`auto-approve-${index}`} {...register(`approvers.${index}.canAutoApprove`)} />
                    <label htmlFor={`auto-approve-${index}`}>Can Auto-Approve</label>
                  </div>
                  <button type="button" className="remove-btn" onClick={() => remove(index)}>&times;</button>
                </div>
              ))}
              <button 
                type="button" 
                className="add-btn" 
                onClick={() => append({ name: '', required: false, canAutoApprove: false })}
              >
                + Add Approver
              </button>
            </div>
          </div>
        </div>

        <hr className="form-divider" />

        <div className="form-group">
          <div className="form-checkbox">
            <input type="checkbox" id="useSequence" {...register('useSequence')} />
            <label htmlFor="useSequence">Approvers Sequence (If ticked, approval follows the order above)</label>
          </div>
        </div>
        
        <div className="form-group">
          <label>Minimum Approval Percentage (%)</label>
          <input 
            className="percentage-input" 
            type="number" 
            placeholder="%" 
            {...register('minApprovalPercentage')} 
          />
        </div>

        <button type="submit" className="button-primary save-rule-btn">Save Rule</button>
      </form>
    </div>
  );
};

export default ApprovalRulesForm;