import React, { useState } from 'react'
import './NewPostForm.css'

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
