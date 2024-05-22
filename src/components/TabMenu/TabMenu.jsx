import { Link } from 'react-router-dom'
import './TabMenu.css'

const navigation = [
  {
    name: 'PostsList',
    url: '',
  },
  {
    name: 'Posts',
    url: 'posts',
  },
  {
    name: 'Teams',
    url: 'teams',
  },
  {
    name: 'Users',
    url: 'users',
  },
]

const TabMenu = () => {
  return (
    <div className='tab-menu'>
      {navigation.map((item, index) => (
        <Link to={item.url} key={index}>
          <div>
            <p>{item.name}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default TabMenu
