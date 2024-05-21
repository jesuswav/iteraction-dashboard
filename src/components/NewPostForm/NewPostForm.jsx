import React, { useState } from 'react'
import './NewPostForm.css'

const NewPostForm = ({ handleSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
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
  }

  return (
    <form className='form-container' onSubmit={onSubmit}>
      <div className='input-container'>
        <label className='input-label'>Name</label>
        <input
          className='input'
          type='text'
          name='name'
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className='input-container'>
        <label className='input-label'>Last Name</label>
        <input
          className='input'
          type='email'
          name='email'
          value={formData.email}
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
