import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Multiselect from '../SelectComponent/SelectComponent'
import './UserForm.css'

const UserForm = ({ handleSubmit }) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [teams, setTeams] = useState([])

  const [formData, setFormData] = useState({
    personal_name: '',
    team_id: '',
  })

  const handleChange = (e) => {
    setFormData({
      personal_name: e.target.value,
      team_id: selectedOption?.value,
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    handleSubmit(formData)
    setFormData({
      personal_name: '',
      team_id: '',
    })
  }

  const getTeams = async () => {
    const response = await fetch('http://localhost:3000/api/teams')
    const responseData = await response.json()
    setTeams(responseData)
  }

  useEffect(() => {
    getTeams()
  }, [])

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption)
    setFormData({
      personal_name: formData.personal_name,
      team_id: selectedOption?.value,
    })
  }

  return (
    <form className='form-container' onSubmit={onSubmit}>
      <span className='span-title-form'>
        <FontAwesomeIcon icon={faUser} size='2x' className='title-icon-form' />
        <h4>Create a new user</h4>
      </span>
      <span className='span-subtitle-form'>
        <h5>Create a new user and select his team</h5>
      </span>
      <div className='input-container'>
        <label className='input-label'>Personal name</label>
        <input
          className='input'
          type='text'
          name='personal_name'
          value={formData.personal_name}
          onChange={handleChange}
          placeholder='Personal name'
          required
        />
      </div>
      <div className='team-multiselect'>
        <Multiselect
          options={teams}
          selectedOption={selectedOption}
          handleChange={handleSelectChange}
        />
      </div>
      <button className='post-form-button' type='submit'>
        Create
      </button>
    </form>
  )
}

export default UserForm
