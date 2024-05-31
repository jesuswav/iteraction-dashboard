import React, { useState } from 'react'
import ColorPicker from '../ColorPicker/ColorPicker'
import './TeamForm.css'

const TeamForm = ({ handleSubmit }) => {
  const [color, setColor] = useState('#ffffff')
  const [teamName, setTeamName] = useState('')

  const handleChange = (e) => {
    setTeamName(e.target.value)
    console.log(teamName)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const formData = {
      team_name: teamName,
      team_color: color,
    }
    console.log(formData)

    handleSubmit(formData)
  }

  return (
    <form className='form-container' onSubmit={onSubmit}>
      <div className='input-container'>
        <label className='input-label'>Team name</label>
        <input
          className='input'
          type='text'
          name='team_name'
          value={teamName}
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
