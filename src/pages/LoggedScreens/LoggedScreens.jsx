import { Route, Routes } from 'react-router-dom'
import PersonalPostsList from '../PersonalPostsList/PersonalPostsList'
import Posts from '../Posts/Posts'
import Teams from '../Teams/Teams'
import Users from '../Users/Users'

import Search from '../../components/Search/Search'
import TabMenu from '../../components/TabMenu/TabMenu'
import DesktopMenu from '../../components/DesktopMenu/DesktopMenu'
import DesktopSearch from '../../components/DesktopSearch/DesktopSearch'

import './LoggedScreens.css'
import { Drawer } from '@mui/material'

const LoggedScreens = () => {
  return (
    <>
      <div className='search'>
        <Search />
      </div>
      <div className='main-logged-container'>
        <div className='tab-desktop-menu'>
          <DesktopMenu />
        </div>
        <div className='main-content'>
          <div className='desktop-search'>
            <DesktopSearch />
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
      </div>
      <div className='tab-menu-container'>
        <div className='tab-mobile-menu'>
          <TabMenu />
        </div>
      </div>
    </>
  )
}

export default LoggedScreens
