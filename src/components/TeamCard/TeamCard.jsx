import React, { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './TeamCard.css'
import {
  faEllipsisVertical,
  faUsers,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'

const TeamCard = (data) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const buttonRef = useRef(null)
  const [menuStyle, setMenuStyle] = useState({})

  const handleMenuToggle = () => {
    console.log(data.data.value)
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
        body: JSON.stringify({ post_id: data.data.post_id }),
      }

      const url = 'http://localhost:3000/api/posts'

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
        <FontAwesomeIcon icon={faUsers} size='2x' color={data.data.color} />
        <p>{data.data.label}</p>
      </span>
      <span ref={buttonRef} onClick={handleMenuToggle}>
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

export default TeamCard
