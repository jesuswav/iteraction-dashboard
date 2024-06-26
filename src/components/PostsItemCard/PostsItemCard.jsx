import React, { useRef, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import {
  faEllipsisVertical,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import './PostsItemCard.css'
import {
  faComment,
  faHeart,
  faShareFromSquare,
} from '@fortawesome/free-regular-svg-icons'

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
        <span className='post-item-header'>
          <span className='item-firts-subcontainer'>
            <FontAwesomeIcon icon={faFacebook} size='3x' color='gray' />
            <span className='page-name'>
              <p>UT Calvillo</p>
              <p className='post-date'>02-04-2024</p>
            </span>
          </span>
          <span
            ref={buttonRef}
            onClick={handleMenuToggle}
            className='post-options-icon'
          >
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              size='2xl'
              color='gray'
            />
          </span>
        </span>
        <span className='post-item-content'>
          <p>{data.data.post_description.substring(0, 52) + '...'}</p>
          <span className='image-container'>
            {console.log(data)}
            {/* <p>{data.data.register_date.slice(0, -14)}</p> */}
            {data.data.images.map((item, index) => (
              <div key={index} className={`box box-${index + 1}`}>
                <img className='post-img' src={item.image_url} alt='img' />
              </div>
            ))}
          </span>
        </span>
        <div className='post-info'>
          <span className='post-info-item'>
            <FontAwesomeIcon icon={faHeart} size='2x' />
            <p>{data.data.likes}</p>
          </span>
          <span className='post-info-item'>
            <FontAwesomeIcon icon={faComment} size='2x' />
            <p>{data.data.likes}</p>
          </span>
          <span className='post-info-item'>
            <FontAwesomeIcon icon={faShareFromSquare} size='2x' />
            <p>{data.data.shared}</p>
          </span>
        </div>
      </div>
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
