import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSearch } from '@fortawesome/free-solid-svg-icons'
import Modal from '../Modal/Modal'
import ProfileModal from '../ProfileModal/ProfileModal'
import './Search.css'

const Search = () => {
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

  return (
    <div className='search-container'>
      <div className='search-subcontainer'>
        <div onClick={handleOpenModal}>
          <FontAwesomeIcon icon={faUser} size='2x' />
        </div>
        <input
          className='search-input'
          type='text'
          placeholder='Busca tu nombre'
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
