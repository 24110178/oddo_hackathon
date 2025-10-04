import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './context/AuthContext.jsx'


createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,
    <React.StrictMode>
    {/* By wrapping App with AuthProvider, all components inside App can use the useAuth hook */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)
