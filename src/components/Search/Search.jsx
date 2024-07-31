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
  const { notFilteredPosts, setNotFilteredPosts } =
    React.useContext(PostContext)
  const { postsData, setPostsData } = React.useContext(PostContext)

  console.log('Filtered posts / : ', postsData)
  // Logica para el modal
  const [showModal, setShowModal] = useState()
  const [animate, setAnimate] = useState()

  function filterByName(personal, name) {
    return personal.filter((item) => item.personal_name === name)
  }

  useEffect(() => {
    setFilteredPosts(filterByName(postsData, estado))
  }, [estado])

  console.log('Estoooooooo', filteredPosts)

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
