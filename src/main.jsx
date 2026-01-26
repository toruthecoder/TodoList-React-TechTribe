import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TodoProvider } from './hooks/useTodo.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TodoProvider>
      <App />
      <Toaster />
    </TodoProvider>
  </StrictMode>,
)
