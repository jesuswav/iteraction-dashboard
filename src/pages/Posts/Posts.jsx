import React, { useEffect, useState } from 'react'
import PostsItemCard from '../../components/PostsItemCard/PostsItemCard'
import Modal from '../../components/Modal/Modal'
import NewPostForm from '../../components/NewPostForm/NewPostForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import './Posts.css'

const Posts = () => {
  const [posts, setPosts] = useState([])

  const getPosts = async () => {
    const response = await fetch('http://localhost:3000/posts')
    const responseData = await response.json()
    setPosts(responseData)
    console.log(posts)
  }

  useEffect(() => {
    getPosts()
  }, [])

  // Logica para el modal
  const [showModal, setShowModal] = useState(false)

  const handleOpenModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleFormSubmit = (formData) => {
    console.log('Form data:', formData)
    // Aquí puedes manejar el envío del formulario (por ejemplo, enviar los datos a tu backend)
    handleCloseModal()
  }

  return (
    <div className='posts-div'>
      <div onClick={handleOpenModal} className='add-post'>
        <FontAwesomeIcon icon={faPlus} size='3x' />
      </div>

      <h3>Posts</h3>
      {posts?.map((item, index) => (
        <div key={index}>
          <PostsItemCard data={item} />
        </div>
      ))}
      <Modal show={showModal} handleClose={handleCloseModal}>
        <NewPostForm handleSubmit={handleFormSubmit} />
      </Modal>
    </div>
  )
}

export default Posts
