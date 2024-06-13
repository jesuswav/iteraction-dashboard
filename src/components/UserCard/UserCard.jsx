import React, { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEllipsisVertical,
  faUser,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import './UserCard.css'

const UserCard = (data) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const buttonRef = useRef(null)
  const [menuStyle, setMenuStyle] = useState({})

  const handleMenuToggle = () => {
    console.log(data.data.personal_id)
    setMenuOpen(!menuOpen)
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setMenuStyle({
        top: rect.bottom + window.scrollY - 28,
        left: rect.left + window.scrollX - 142,
      })
    }
  }

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleDelete = async () => {
    try {
      const requestOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ personal_id: data.data.personal_id }),
      }

      const url = 'http://localhost:3000/api/users'

      deletePost(url, requestOptions)
    } catch (e) {
      console.error(e)
    }
  }

  const deletePost = async (url, requestOptions) => {
    const response = await fetch(url, requestOptions)
    if (!response.ok) {
      throw new Error('Error al realizar la petición')
    }
    const responseData = await response.json()
    console.log('Register response', responseData)
  }

  return (
    <div className='user-card-item'>
      <span className='user-card-subitem'>
        <FontAwesomeIcon icon={faUser} size='2x' color='gray' />
        <p>{data.data.personal_name}</p>
      </span>
      <span
        className='team-tag'
        style={{ background: `${data.data.team_color}` }}
      >
        <p>{data.data.team_name}</p>
      </span>
      <span
        ref={buttonRef}
        onClick={handleMenuToggle}
        className='post-options-icon'
      >
        <FontAwesomeIcon icon={faEllipsisVertical} size='2x' color='gray' />
      </span>
      {menuOpen && (
        <div ref={menuRef} className='user-dropdown-menu' style={menuStyle}>
          <span className='user-float-menu-item' onClick={() => handleDelete()}>
            <FontAwesomeIcon icon={faPenToSquare} />
            <p>Editar</p>
          </span>
          <span className='user-float-menu-item' onClick={() => handleDelete()}>
            <FontAwesomeIcon icon={faTrash} />
            <p>Eliminar</p>
          </span>
        </div>
      )}
    </div>
  )
}

export default UserCard
