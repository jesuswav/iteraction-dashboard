import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import './Users.css'

import Modal from '../../components/Modal/Modal'
import UserForm from '../../components/UserForm/UserForm'
import UserCard from '../../components/UserCard/UserCard'
import apiBase from '../../utils/API'
import useApi from '../../hooks/useApi'

const Users = () => {
  const [users, setUsers] = useState([])
  const [newUser, setNewUser] = useState(false)
  const [animate, setAnimate] = useState()

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

      const url = `${apiBase}api/personal`

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
    setNewUser(true)
  }

  const { fetchData, loading, error } = useApi()

  const getData = async () => {
    const url = `${apiBase}api/personal`

    const data = await fetchData('GET', url)
    setUsers(data)
  }

  useEffect(() => {
    getData()
    // getPosts()
    console.log('Hola')
  }, [newUser])

  if (loading) {
    return (
      <div className='main-posts-lists-container'>
        <div>
          <h3>Personal</h3>
          <div className='loader-container'>
            <div className='loader'></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='personal-list-container'>
      <h3>Personal</h3>
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
