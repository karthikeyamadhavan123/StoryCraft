import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ThemeContextProvider from './context/themeContext.tsx'
import { HelmetProvider } from 'react-helmet-async'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
    <ThemeContextProvider>
    <App />
    </ThemeContextProvider>
    </HelmetProvider>
  </StrictMode>,
)
