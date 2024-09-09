import React, { useEffect, useState } from 'react'
import TeamCard from '../../components/TeamCard/TeamCard'
import Modal from '../../components/Modal/Modal'
import TeamForm from '../../components/TeamForm/TeamForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import apiBase from '../../utils/API'
import './Teams.css'

const Teams = () => {
  const [teams, setTeams] = useState([])
  const [newTeam, setNewTeam] = useState(false)
  const [animate, setAnimate] = useState()

  const getTeams = async () => {
    const loginToken = localStorage.getItem('loginToken')

    const url = `${apiBase}api/teams`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${loginToken}`,
      },
    })
    const responseData = await response.json()
    setTeams(responseData)
  }

  useEffect(() => {
    getTeams()
  }, [newTeam])

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
      const login_token = localStorage.getItem('loginToken')

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${login_token}`,
        },
        body: JSON.stringify(formData),
      }

      const url = `${apiBase}api/teams`

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
    setNewTeam(true)
  }

  return (
    <div className='subleader-team-container'>
      <h3>Sublíderes</h3>
      {(teams.length > 0 &&
        teams?.map((item, index) => (
          <div key={index}>
            <TeamCard data={item} />
          </div>
        ))) || <p>There are no Teams registered</p>}
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
