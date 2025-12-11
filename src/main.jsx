import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import GrowvoltLanding from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GrowvoltLanding />
  </StrictMode>,
)
