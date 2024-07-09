import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { FactContextProvider } from './context/FactContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <FactContextProvider>
    <App />
    </FactContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
