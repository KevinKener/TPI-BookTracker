import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthenticationContextProvider } from './components/services/auth/AuthContextProvider.jsx'
import TranslationContextProvider from './components/services/translation/TranslationContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TranslationContextProvider>
      <AuthenticationContextProvider>
        <App />
      </AuthenticationContextProvider>
    </TranslationContextProvider>
  </StrictMode>,
)
