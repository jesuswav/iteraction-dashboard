import './App.css'
import { useState, useEffect } from 'react'

import LoggedScreens from './pages/LoggedScreens/LoggedScreens'
import NotLoggedScreens from './pages/NotLoggedScreens/NotLoggedScreens'

function App() {
  const [loginToken, setLoginToken] = useState(false)

  const [authState, setAuthState] = useState({
    isAuthenticated: false,
  })

  const checkAuthentication = async () => {
    try {
      const loginToken = localStorage.getItem('loginToken')
      const response = await fetch('http://localhost:3000/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ loginToken }),
      })

      if (response.ok) {
        const data = await response.json()
        return { isAuthenticated: true }
      } else {
        return { isAuthenticated: false }
      }
    } catch (error) {
      console.log('Error al verificar la autenticación')
      return { isAuthenticated: false }
    }
  }

  useEffect(() => {
    async function verifyAuth() {
      const result = await checkAuthentication()
      setAuthState(result)
    }

    verifyAuth()
  }, [])

  return (
    <div className='App'>
      {authState.isAuthenticated ? <LoggedScreens /> : <NotLoggedScreens />}
    </div>
  )
}

export default App
