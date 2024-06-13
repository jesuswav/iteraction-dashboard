import React, { useRef, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import {
  faEllipsisVertical,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import './PostsItemCard.css'

const PostsItemCard = (data) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const buttonRef = useRef(null)
  const [menuStyle, setMenuStyle] = useState({})

  const handleMenuToggle = () => {
    console.log(data.data.post_id)
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

      const url = 'https://interaction-backend-1.onrender.com/api/posts'

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
    <div className='post-item-container'>
      <div className='post-content'>
        <span className='item-firts-subcontainer'>
          <FontAwesomeIcon icon={faFacebook} size='2xl' color='gray' />
          <p>{data.data.post_description}</p>
        </span>
        <span className='item-subcontainer'>
          {/* <p>{data.data.register_date.slice(0, -14)}</p> */}
          {data.data.images.map((item, index) => (
            <img
              key={index}
              className='post-img'
              src={item.image_url}
              alt='img'
            />
          ))}
        </span>
      </div>
      <span ref={buttonRef} className='post-options-icon'>
        <FontAwesomeIcon
          onClick={handleMenuToggle}
          icon={faEllipsisVertical}
          size='2xl'
          color='gray'
        />
      </span>
      {menuOpen && (
        <div ref={menuRef} className='dropdown-menu' style={menuStyle}>
          <span className='float-menu-item' onClick={() => handleDelete()}>
            <FontAwesomeIcon icon={faPenToSquare} />
            <p>Editar</p>
          </span>
          <span className='float-menu-item' onClick={() => handleDelete()}>
            <FontAwesomeIcon icon={faTrash} />
            <p>Eliminar</p>
          </span>
        </div>
      )}
    </div>
  )
}

export default PostsItemCard
