import React, { useState } from 'react'
import ColorPicker from '../ColorPicker/ColorPicker'
import './TeamForm.css'

const TeamForm = ({ handleSubmit }) => {
  const [color, setColor] = useState('#ffffff')

  const [formData, setFormData] = useState({
    team_name: '',
    team_color: '',
  })

  const handleChange = (e) => {
    setFormData({
      team_name: e.target.value,
      team_color: color,
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setFormData({
      team_name: formData.team_name,
      team_color: color,
    })
    handleSubmit(formData)
    setFormData({
      team_name: '',
      team_color: '#ffffff',
    })
  }

  return (
    <form className='form-container' onSubmit={onSubmit}>
      <div className='input-container'>
        <label className='input-label'>Team name</label>
        <input
          className='input'
          type='text'
          name='team_name'
          value={formData.team_name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className='input-label'>Team Color</label>
        <ColorPicker color={color} setColor={setColor} />
        <p className='selected-color'>Color seleccionado: {color}</p>
      </div>
      <button className='post-form-button' type='submit'>
        Submit
      </button>
    </form>
  )
}

export default TeamForm
