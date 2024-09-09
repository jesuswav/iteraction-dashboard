import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBriefcase,
  faList,
  faSignsPost,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
import './DesktopMenu.css'

const navigation = [
  {
    name: 'Lista de posts',
    url: '',
    icon: <FontAwesomeIcon icon={faList} size='2x' color='gray' />,
  },
  {
    name: 'Posts',
    url: 'posts',
    icon: <FontAwesomeIcon icon={faSignsPost} size='2x' color='gray' />,
  },
  {
    name: 'Sublideres',
    url: 'teams',
    icon: <FontAwesomeIcon icon={faBriefcase} size='2x' color='gray' />,
  },
  {
    name: 'Personal',
    url: 'users',
    icon: <FontAwesomeIcon icon={faUsers} size='2x' color='gray' />,
  },
]

const DesktopMenu = () => {
  return (
    <div className='desktop-menu-container'>
      <div className='desktop-menu-header'>
        <img
          src='/assets/NETWORK_FACE_Compressed.png'
          alt='img'
          className='login-logo'
        />
      </div>
      <div className='destop-menu-links'>
        {navigation.map((item, index) => (
          <Link to={item.url} key={index} className='desktop-menu-link'>
            {item.icon}
            <div className='desktop-menu-item'>
              <p>{item.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default DesktopMenu
