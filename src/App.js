import './App.css'
import { useState } from 'react'

import LoggedScreens from './pages/LoggedScreens/LoggedScreens'
import NotLoggedScreens from './pages/NotLoggedScreens/NotLoggedScreens'

function App() {
  const [loginToken, setLoginToken] = useState(false)

  return (
    <div className='App'>
      {!loginToken ? <NotLoggedScreens /> : <LoggedScreens />}
    </div>
  )
}

export default App
