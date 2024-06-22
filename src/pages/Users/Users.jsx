import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import Modal from '../../components/Modal/Modal'
import UserForm from '../../components/UserForm/UserForm'
import UserCard from '../../components/UserCard/UserCard'

const Users = () => {
  const [users, setUsers] = useState([])
  const [animate, setAnimate] = useState()

  const fetchUsers = async () => {
    const response = await fetch('http://localhost:3000/api/personal')
    const responseData = await response.json()
    setUsers(responseData)
  }

  useEffect(() => {
    fetchUsers()
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
      const loginToken = localStorage.getItem('loginToken')

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${loginToken}`,
        },
        body: JSON.stringify(formData),
      }

      // const url = 'https://interaction-backend-1.onrender.com/api/personal'
      const url = 'http://localhost:3000/api/personal'

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
    console.log(response)
    if (!response.ok) {
      throw new Error('Error al realizar la petición')
    }
    const responseData = await response.json()
    console.log('Register response', responseData)
  }

  return (
    <div>
      <h3>Users Component</h3>
      {(users.length > 0 &&
        users?.map((item, index) => (
          <div key={index}>
            <UserCard data={item} />
          </div>
        ))) || <p>There are no users registered</p>}
      <Modal show={showModal} handleClose={handleCloseModal} animate={animate}>
        <UserForm handleSubmit={handleFormSubmit} />
      </Modal>
      <div onClick={handleOpenModal} className='add-post'>
        <FontAwesomeIcon icon={faPlus} size='3x' />
      </div>
    </div>
  )
}

export default Users
