import { useState } from 'react'
import './App.css'
import { AuthProvider } from "./features/auth/auth.context";

import AppRoutes from './AppRoutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
    <AppRoutes />
    </AuthProvider>
    
  )
}

export default App
