import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import './PostCard.css'

const PostCard = (item) => {
  const [checked, setChecked] = useState(item.item.checked)
  const date = new Date()

  useEffect(() => {
    setChecked(item.item.checked)
  }, [item.item.checked])

  const updateChecked = async (id, value) => {
    const data = { id: id, value: value }
    try {
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }

      // const url = 'https://interaction-backend-1.onrender.com/api/posts'
      const url = 'http://localhost:3000/api/posts'

      sendData(url, requestOptions)
    } catch (e) {
      console.error(e)
    }
  }

  const sendData = async (url, requestOptions) => {
    const response = await fetch(url, requestOptions)
    if (!response.ok) {
      throw new Error('Error al realizar la petición')
    }
    const responseData = await response.json()
  }

  return (
    <div className='post-container'>
      <span className='first-post-container'>
        <FontAwesomeIcon icon={faFacebook} size='2x' color='gray' />
        <p className='post-name'>
          {item.item.post_description?.substring(0, 32) + '...'}
        </p>
        {/* <p className='post-date'>{item.item?.register_date.slice(0, -14)}</p> */}
      </span>
      {(checked && (
        <FontAwesomeIcon
          icon={faCircleCheck}
          size='2x'
          color='blue'
          id='complete-icon'
          onClick={() => {
            updateChecked(item.item.unique_post_id, 0)
            item.item.checked = 0
            setChecked(0)
          }}
        />
      )) || (
        <FontAwesomeIcon
          icon={faCircle}
          size='2x'
          id='complete-icon'
          onClick={() => {
            updateChecked(item.item.unique_post_id, 1)
            item.item.checked = 1
            setChecked(1)
          }}
        />
      )}
    </div>
  )
}

export default PostCard
