import './App.css'
import { Route, Routes } from 'react-router-dom'

import PersonalPostsList from './pages/PersonalPostsList/PersonalPostsList'
import Posts from './pages/Posts/Posts'
import Teams from './pages/Teams/Teams'
import Users from './pages/Users/Users'

import ResponsiveDrawer from './components/Drawer/Drawer'

function App() {
  return (
    <div className='App'>
      <div>
        
      </div>
      <div className='content'>
        <Routes>
          <Route path='/' element={<PersonalPostsList />} />
          <Route path='/posts' element={<Posts />} />
          <Route path='/teams' element={<Teams />} />
          <Route path='/users' element={<Users />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
