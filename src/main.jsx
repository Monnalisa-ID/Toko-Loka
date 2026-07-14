import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'sonner'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <App />
      <Toaster toastOptions={{
          style: {
            background: '#1e3a2b',
            color: '#fff',
            border: 'none',
          },
        }}
      />
  </React.StrictMode>,
)