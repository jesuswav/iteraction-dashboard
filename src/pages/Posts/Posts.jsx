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
    console.log(response)
    if (!response.ok) {
      throw new Error('Error al realizar la petición')
    }
    const responseData = await response.json()
    console.log('Register response', responseData)
  }

  return (
    <div className='posts-div'>
      <h3>Posts</h3>
      {posts?.map((item, index) => (
        <div key={index}>
          <PostsItemCard data={item} />
        </div>
      ))}
      <Modal show={showModal} handleClose={handleCloseModal}>
        <NewPostForm handleSubmit={handleFormSubmit} />
      </Modal>
      <div onClick={handleOpenModal} className='add-post'>
        <FontAwesomeIcon icon={faPlus} size='3x' />
      </div>
    </div>
  )
}

export default Posts
