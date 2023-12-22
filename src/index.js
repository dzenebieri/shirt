import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { App } from './App'
import { UI } from './UI'
import './App.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/shirt">
    <UI />
    <App />
  </BrowserRouter>
)
