import React, { useEffect, useState } from 'react'
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
    const response = await fetch(
      'https://interaction-backend-1.onrender.com/api/teams'
    )
    const responseData = await response.json()
    setTeams(responseData)
  }

  useEffect(() => {
    getTeams()
  }, [])

  const options = [
    { value: 'equipo1', label: 'Equipo 1', color: 'blue' },
    { value: 'equipo2', label: 'Equipo 2', color: 'green' },
    { value: 'equipo3', label: 'Equipo 3', color: 'red' },
    { value: 'equipo4', label: 'Equipo 4', color: 'orange' },
    // Agrega más opciones según necesites
  ]

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption)
    setFormData({
      personal_name: formData.personal_name,
      team_id: selectedOption?.value,
    })
  }

  return (
    <form className='form-container' onSubmit={onSubmit}>
      <div className='input-container'>
        <label className='input-label'>Personal name</label>
        <input
          className='input'
          type='text'
          name='personal_name'
          value={formData.personal_name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Multiselect
          options={teams}
          selectedOption={selectedOption}
          handleChange={handleSelectChange}
        />
      </div>
      <button className='post-form-button' type='submit'>
        Submit
      </button>
    </form>
  )
}

export default UserForm
