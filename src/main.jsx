import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TodoProvider } from './hooks/useTodo.jsx'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename='/'>
      <CookiesProvider>
        <TodoProvider>
          <App />
          <Toaster />
        </TodoProvider>
      </CookiesProvider>
    </BrowserRouter>
  </StrictMode>,
)
