import './App.css'
import { Route, Routes } from 'react-router-dom'

import PostsList from './pages/PostsList/PostsList'
import Teams from './pages/Teams/Teams'
import Users from './pages/Users/Users'

import ResponsiveDrawer from './components/Drawer'

function App() {
  return (
    <div className='App'>
      <ResponsiveDrawer />
      <Routes>
        <Route path='/' element={<PostsList />} />
        <Route path='/teams' element={<Teams />} />
        <Route path='/users' element={<Users />} />
      </Routes>
    </div>
  )
}

export default App
