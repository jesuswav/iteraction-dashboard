import { Route, Routes } from 'react-router-dom'
import PersonalPostsList from '../PersonalPostsList/PersonalPostsList'
import Posts from '../Posts/Posts'
import Teams from '../Teams/Teams'
import Users from '../Users/Users'

import Search from '../../components/Search/Search'
import TabMenu from '../../components/TabMenu/TabMenu'

const LoggedScreens = () => {
  return (
    <>
      <div className='search'>
        <Search />
      </div>
      <div className='content'>
        <Routes>
          <Route path='/' element={<PersonalPostsList />} />
          <Route path='/posts' element={<Posts />} />
          <Route path='/teams' element={<Teams />} />
          <Route path='/users' element={<Users />} />
        </Routes>
      </div>
      <div className='tab-menu-container'>
        <TabMenu />
      </div>
    </>
  )
}

export default LoggedScreens
