import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import './ProfileModal.css'

import getHook from '../../hooks/getHook'

const ProfileModal = () => {
  const [userInfo, setUserInfo] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('loginToken')

    const getData = async () => {
      const data = await getHook('http://localhost:3000/api/user', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })
      setUserInfo(data)
    }

    getData()
  }, [])

  const logOut = () => {
    localStorage.removeItem('loginToken')
    window.location.reload()
  }

  return (
    <div>
      <span className='profile-header'>
        <FontAwesomeIcon icon={faUser} />
        <h4>Profile</h4>
      </span>
      <div>
        <span>
          <p className='profile-input-label'>Name</p>
          <p className='profile-input'>{userInfo[0]?.name}</p>
        </span>
        <span className='profile-input-container'>
          <p className='profile-input-label'>Last name</p>
          <p className='profile-input'>{userInfo[0]?.last_name}</p>
        </span>
        <div className='second-profile-container'>
          <span className='profile-input-container'>
            <p className='profile-input-label'>Username</p>
            <p className='profile-input'>{userInfo[0]?.username}</p>
          </span>
          <span className='profile-input-container'>
            <p className='profile-input-label'>Phone</p>
            <p className='profile-input'>449 105 8256</p>
          </span>
        </div>
      </div>
      <button className='post-profile-button' onClick={logOut}>
        Log out
      </button>
    </div>
  )
}

export default ProfileModal
