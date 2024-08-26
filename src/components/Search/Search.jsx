import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSearch } from '@fortawesome/free-solid-svg-icons'
import Modal from '../Modal/Modal'
import ProfileModal from '../ProfileModal/ProfileModal'
import { PostContext } from '../../context'
import './Search.css'
import apiBase from '../../utils/API'

const Search = () => {
  // From context
  const { estado, setEstado } = React.useContext(PostContext)
  const { filteredPosts, setFilteredPosts } = React.useContext(PostContext)
  const { postsData, setPostsData } = React.useContext(PostContext)

  // Logica para el modal
  const [showModal, setShowModal] = useState()
  const [animate, setAnimate] = useState()

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

  const handleChange = (e) => {
    setEstado(e.target.value)
  }

  const getPosts = async (searchValue) => {
    const loginToken = localStorage.getItem('loginToken')
    const data = { search: searchValue }

    const url = `${apiBase}api/search`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${loginToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const responseData = await response.json()
    setFilteredPosts(responseData)
    // return responseData
  }

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      getPosts(estado)
    }, 1000)

    return () => clearTimeout(timeOutId)
  }, [estado])

  return (
    <div className='search-container'>
      <div className='search-subcontainer'>
        <div onClick={handleOpenModal} className='profile-button'>
          <FontAwesomeIcon icon={faUser} size='2x' />
        </div>
        <input
          className='search-input'
          type='text'
          placeholder='Buscar personal'
          value={estado}
          onChange={handleChange}
        />
        <FontAwesomeIcon icon={faSearch} size='2x' />
      </div>
      <Modal show={showModal} handleClose={handleCloseModal} animate={animate}>
        <ProfileModal />
      </Modal>
    </div>
  )
}

export default Search
