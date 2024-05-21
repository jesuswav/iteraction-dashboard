import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import './PostCard.css'

const PostCard = (item) => {
  const [checked, setChecked] = useState(item.item.checked)

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

      const url = 'http://localhost:3000/update_checked'

      sendData(url, requestOptions)
    } catch (e) {
      console.error(e)
    }
  }

  const sendData = async (url, requestOptions) => {
    const response = await fetch(url, requestOptions)
    console.log(response)
    if (!response.ok) {
      throw new Error('Error al realizar la petición')
    }
    const responseData = await response.json()
    console.log('Update response', responseData)
  }

  return (
    <div className='post-container'>
      <span className='first-post-container'>
        <FontAwesomeIcon icon={faFacebook} size='xl' color='gray' />
        <p className='post-name'>{item.item.post_name}</p>
        <p className='post-date'>{item.item?.registerDate.slice(0, -9)}</p>
      </span>
      {(checked && (
        <FontAwesomeIcon
          icon={faCircleCheck}
          size='xl'
          color='blue'
          id='complete-icon'
          onClick={() => {
            updateChecked(item.item.unique_post_id, 0)
            setChecked(0)
          }}
        />
      )) || (
        <FontAwesomeIcon
          icon={faCircle}
          size='xl'
          id='complete-icon'
          onClick={() => {
            updateChecked(item.item.unique_post_id, 1)
            setChecked(1)
          }}
        />
      )}
    </div>
  )
}

export default PostCard
