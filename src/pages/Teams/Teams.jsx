import React, { useEffect, useState } from 'react'
import TeamCard from '../../components/TeamCard/TeamCard'
import Modal from '../../components/Modal/Modal'
import TeamForm from '../../components/TeamForm/TeamForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const Teams = () => {
  const [teams, setTeams] = useState([])

  const getTeams = async () => {
    const response = await fetch('http://localhost:3000/api/teams')
    const responseData = await response.json()
    setTeams(responseData)
  }

  useEffect(() => {
    getTeams()
  }, [])

  // Logica para el modal
  const [showModal, setShowModal] = useState(false)

  const handleOpenModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleFormSubmit = async (formData) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }

      const url = 'http://localhost:3000/posts'

      sendData(url, requestOptions)
    } catch (e) {
      console.error(e)
    }

    console.log(formData)
    // Cerramos el Modal
    handleCloseModal()
  }

  const sendData = async (url, requestOptions) => {
    const response = await fetch(url, requestOptions)
    if (!response.ok) {
      throw new Error('Error al realizar la petición')
    }
    const responseData = await response.json()
    console.log('Register response', responseData)
  }

  return (
    <div>
      <h3>Teams Component</h3>
      {teams?.map((item, index) => (
        <div key={index}>
          <TeamCard data={item} />
        </div>
      ))}
      <Modal show={showModal} handleClose={handleCloseModal}>
        <TeamForm handleSubmit={handleFormSubmit} />
      </Modal>
      <div onClick={handleOpenModal} className='add-post'>
        <FontAwesomeIcon icon={faPlus} size='3x' />
      </div>
    </div>
  )
}

export default Teams
