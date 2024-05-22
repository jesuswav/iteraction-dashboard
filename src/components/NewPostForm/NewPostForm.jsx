import React, { useState } from 'react'
import './NewPostForm.css'

const NewPostForm = ({ handleSubmit }) => {
  const [formData, setFormData] = useState({
    post_name: '',
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
      post_name: '',
      post_url: '',
    })
  }

  return (
    <form className='form-container' onSubmit={onSubmit}>
      <div className='input-container'>
        <label className='input-label'>Post Name</label>
        <input
          className='input'
          type='text'
          name='post_name'
          value={formData.post_name}
          onChange={handleChange}
          required
        />
      </div>
      <div className='input-container'>
        <label className='input-label'>Post URL</label>
        <input
          className='input'
          type='text'
          name='post_url'
          value={formData.post_url}
          onChange={handleChange}
          required
        />
      </div>
      <button className='post-form-button' type='submit'>
        Submit
      </button>
    </form>
  )
}

export default NewPostForm
