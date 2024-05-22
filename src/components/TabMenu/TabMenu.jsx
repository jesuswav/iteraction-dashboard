import { Link } from 'react-router-dom'
import './TabMenu.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBriefcase,
  faList,
  faSignsPost,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'

const navigation = [
  {
    name: 'PostsList',
    url: '',
    icon: <FontAwesomeIcon icon={faList} size='2x' color='gray' />,
  },
  {
    name: 'Posts',
    url: 'posts',
    icon: <FontAwesomeIcon icon={faSignsPost} size='2x' color='gray' />,
  },
  {
    name: 'Teams',
    url: 'teams',
    icon: <FontAwesomeIcon icon={faBriefcase} size='2x' color='gray' />,
  },
  {
    name: 'Users',
    url: 'users',
    icon: <FontAwesomeIcon icon={faUsers} size='2x' color='gray' />,
  },
]

const TabMenu = () => {
  return (
    <div className='tab-menu'>
      {navigation.map((item, index) => (
        <Link to={item.url} key={index} className='tab-item'>
          {item.icon}
          <div className='tab-name-container'>
            <p>{item.name}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default TabMenu
