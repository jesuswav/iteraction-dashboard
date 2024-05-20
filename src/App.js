import './App.css'
import { Route, Routes } from 'react-router-dom'

import PostsList from './pages/PostsList/PostsList'
import Teams from './pages/Teams/Teams'
import Users from './pages/Users/Users'

import ResponsiveDrawer from './components/Drawer/Drawer'

function App() {
  return (
    <div className='App'>
      <div className='drawer'>
        <ResponsiveDrawer />
      </div>
      <div className='content'>
        <Routes>
          <Route path='/' element={<PostsList />} />
          <Route path='/teams' element={<Teams />} />
          <Route path='/users' element={<Users />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
