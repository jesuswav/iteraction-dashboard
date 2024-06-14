import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
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
      <span className='span-title-form'>
        <FontAwesomeIcon icon={faUsers} size='2x' className='title-icon-form' />
        <h4>Create a new team</h4>
      </span>
      <span className='span-subtitle-form'>
        <h5>Create a new user and select his team</h5>
      </span>
      <div className='input-container'>
        <label className='input-label'>Team name</label>
        <input
          className='input'
          type='text'
          name='team_name'
          value={teamName}
          onChange={handleChange}
          placeholder='Team name'
          required
        />
      </div>
      <div>
        <label className='input-label'>Team Color</label>
        <ColorPicker color={color} setColor={setColor} />
        <p className='selected-color'>Color seleccionado: {color}</p>
      </div>
      <button className='post-form-button' type='submit'>
        Create
      </button>
    </form>
  )
}

export default TeamForm
