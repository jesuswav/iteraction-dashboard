import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './NewPostForm.css'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const NewPostForm = ({ handleSubmit }) => {
  const [formData, setFormData] = useState({
    post_url: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    handleSubmit(formData)
    setFormData({
      post_url: '',
    })
  }

  return (
    <form className='form-container' onSubmit={onSubmit}>
      <span className='span-title-form'>
        <FontAwesomeIcon icon={faUser} size='2x' className='title-icon-form' />
        <h4>Create a new post</h4>
      </span>
      <span className='span-subtitle-form'>
        <h5>Create a post to add to the personal</h5>
      </span>
      <div className='input-container'>
        <label className='input-label'>Post URL</label>
        <input
          className='input'
          type='text'
          name='post_url'
          value={formData.post_url}
          onChange={handleChange}
          placeholder='Post URL'
          required
        />
      </div>
      <button className='post-form-button' type='submit'>
        Create
      </button>
    </form>
  )
}

export default NewPostForm
