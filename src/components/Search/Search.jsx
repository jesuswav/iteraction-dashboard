import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSearch } from '@fortawesome/free-solid-svg-icons'
import Modal from '../Modal/Modal'
import ProfileModal from '../ProfileModal/ProfileModal'
import { PostContext } from '../../context'
import './Search.css'

const Search = () => {
  // From context
  const { estado, setEstado } = React.useContext(PostContext)
  const { filteredPosts, setFilteredPosts } = React.useContext(PostContext)
  const { postsData, setPostsData } = React.useContext(PostContext)

  // Logica para el modal
  const [showModal, setShowModal] = useState()
  const [animate, setAnimate] = useState()

  function filterByName(personal, name) {
    return personal.filter((item) => item.personal_name === name)
  }

  useEffect(() => {
    setFilteredPosts(filterByName(postsData, estado))
  }, [estado])

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

  // Search request to the api
  const [posts, setPosts] = useState()

  const getPosts = async (searchValue) => {
    const loginToken = localStorage.getItem('loginToken')
    const data = { search: searchValue }

    const response = await fetch('http://localhost:3000/api/search', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${loginToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const responseData = await response.json()
    setFilteredPosts(responseData)
  }

  useEffect(() => {
    getPosts(estado)
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
          placeholder='Busca tu nombre'
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
