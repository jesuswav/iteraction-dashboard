import React, { useEffect, useState } from 'react'
import TeamCard from '../../components/TeamCard/TeamCard'
import Modal from '../../components/Modal/Modal'
import TeamForm from '../../components/TeamForm/TeamForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const Teams = () => {
  const [teams, setTeams] = useState([])
  const [animate, setAnimate] = useState()

  const getTeams = async () => {
    const response = await fetch(
      // 'https://interaction-backend-1.onrender.com/api/teams'
      'http://localhost:3000/api/teams'
    )
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
    setAnimate(true)
    setTimeout(() => {
      setShowModal(false)
      setAnimate(false)
    }, 500)
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

      // const url = 'https://interaction-backend-1.onrender.com/api/teams'
      const url = 'http://localhost:3000/api/teams'

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
      <Modal show={showModal} handleClose={handleCloseModal} animate={animate}>
        <TeamForm handleSubmit={handleFormSubmit} />
      </Modal>
      <div onClick={handleOpenModal} className='add-post'>
        <FontAwesomeIcon icon={faPlus} size='3x' />
      </div>
    </div>
  )
}

export default Teams
