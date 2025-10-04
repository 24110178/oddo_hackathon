import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Table.css';
import './Modal.css';

const mockUsers = [
  { id: 1, name: 'marc', role: 'Manager', manager: '-', email: 'marc@example.com' },
  { id: 2, name: 'divyang', role: 'Employee', manager: 'marc', email: 'divyang@example.com' },
];

const AdminUserForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

const onSubmit = async (data) => {
    try {
      const { error } = await supabase.functions.invoke('invite-user', {
        body: { 
          email: data.email, 
          role: data.role, 
          manager_id: data.managerId 
        },
      });
      if (error) throw error;
      alert(`Invitation sent to ${data.email}`);
      reset();
      setIsModalOpen(false);
    } catch (error) {
        alert(error.message);
    }
  };

  return (
    <div className="card">
      <div className="card-header-action">
        <h2 className="card-header">Manage Users</h2>
        <button className="button-primary" onClick={() => setIsModalOpen(true)}>Add User</button>
      </div>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Manager</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>{user.manager}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add New User</h2>
              <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="modal-body">
                <div className="form-group">
                    <label>User Name</label>
                    <input placeholder="John Doe" {...register('name')} />
                </div>
                 <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="john.doe@example.com" {...register('email')} />
                </div>
                 <div className="form-group">
                    <label>Role</label>
                    <select {...register('role')}>
                        <option value="">Select role...</option>
                        <option value="Employee">Employee</option>
                        <option value="Manager">Manager</option>
                    </select>
                </div>
                <div className="form-group">
                  <label>Assign Manager</label>
                  <select {...register('managerId')}>
                    <option value="">Select manager...</option>
                    <option value="1">marc</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="button-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="button-primary">Create User</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserForm;