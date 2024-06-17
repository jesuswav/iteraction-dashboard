import { Route, Routes } from 'react-router-dom'
import Login from '../Login/Login'
import Register from '../Register/Register'

const NotLoggedScreens = () => {
  return (
    <div className='login-content'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  )
}

export default NotLoggedScreens
