import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import ExpenseHistoryTable from './components/ExpenseHistoryTable'; // Import the new component
import './App.css';

function App() {
  // Add state for the hard-coded data
  const [expenses, setExpenses] = useState([
    { description: 'Lunch with team', amount: 22.50, category: 'Food', date: '2025-10-03T10:00:00.000Z' },
    { description: 'Taxi to client meeting', amount: 15.00, category: 'Transport', date: '2025-10-02T14:30:00.000Z' },
    { description: 'Office supplies', amount: 55.75, category: 'Other', date: '2025-10-01T11:45:00.000Z' },
    { description: 'Internet Bill', amount: 60.00, category: 'Utilities', date: '2025-09-30T09:20:00.000Z' }
  ]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* This is the new route for your main page */}
          <Route 
            path="/" 
            element={<ExpenseHistoryTable expenses={expenses} />} 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* This will now make your new main page the default */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;