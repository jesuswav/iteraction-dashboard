import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import {
  faHeart,
  faComment,
  faShareFromSquare,
} from '@fortawesome/free-regular-svg-icons'
// import {
//   faHeart,
//   faComment,
//   faShareFromSquare,
// } from '@fortawesome/free-solid-svg-icons'
import './PostCard.css'
import apiBase from '../../utils/API'

const PostCard = (item, data) => {
  const [checked, setChecked] = useState(item.item.checked)
  const [checkedComments, setCheckedComents] = useState(false)
  const [checkedShared, setCheckedShared] = useState(false)
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

      const url = `${apiBase}api/posts`

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

  useEffect(() => {
    const names = item.item.likes

    const nameToSearch = item.data?.personal_name

    const namesArray = names?.split(',').map((name) => name.trim())

    if (namesArray?.includes(nameToSearch)) {
      setChecked(true)
      updateChecked(item.item.unique_post_id, 1)
    } else {
      setChecked(false)
    }
  }, [])

  return (
    <div className='post-container'>
      <span className='first-post-container'>
        <FontAwesomeIcon icon={faFacebook} size='2x' color='gray' />
        <p className='post-name'>
          {item.item.post_description?.substring(0, 32) + '...'}
        </p>
        {/* <p className='post-date'>{item.item?.register_date.slice(0, -14)}</p> */}
      </span>
      <span className='interaction-icons'>
        {(checked && (
          <FontAwesomeIcon icon={faHeart} color='blue' id='complete-icon' />
        )) || <FontAwesomeIcon icon={faHeart} id='complete-icon' />}
        {(checkedComments && (
          <FontAwesomeIcon icon={faComment} color='blue' id='complete-icon' />
        )) || <FontAwesomeIcon icon={faComment} id='complete-icon' />}
        {(checkedShared && (
          <FontAwesomeIcon
            icon={faShareFromSquare}
            color='blue'
            id='complete-icon'
          />
        )) || <FontAwesomeIcon icon={faShareFromSquare} id='complete-icon' />}
      </span>
    </div>
  )
}

export default PostCard
