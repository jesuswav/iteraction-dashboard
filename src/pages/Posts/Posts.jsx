import React, { useEffect, useState } from 'react'
import PostsItemCard from '../../components/PostsItemCard/PostsItemCard'
import Modal from '../../components/Modal/Modal'
import NewPostForm from '../../components/NewPostForm/NewPostForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import './Posts.css'

const Posts = () => {
  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState(false)

  const getPosts = async () => {
    const loginToken = localStorage.getItem('loginToken')

    const response = await fetch('http://localhost:3000/api/posts', {
      method: 'GET',
      headers: { Authorization: `Bearer ${loginToken}` },
    })
    const responseData = await response.json()
    setPosts(responseData)
  }

  useEffect(() => {
    getPosts()
  }, [newPost])

  // Logica para el modal
  const [showModal, setShowModal] = useState(false)
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

      // const url = 'https://interaction-backend-1.onrender.com/api/posts'
      const url = 'http://localhost:3000/api/posts'

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
    setNewPost(true)
  }

  return (
    <div>
      <h3>Posts</h3>
      {console.log(posts)}
      {(posts.length > 0 &&
        posts?.map((item, index) => (
          <div key={index} className='posts-div'>
            <div className='posts-lists-container'>
              <PostsItemCard data={item} />
            </div>
          </div>
        ))) || <p>There are no posts registered</p>}
      <Modal show={showModal} handleClose={handleCloseModal} animate={animate}>
        <NewPostForm handleSubmit={handleFormSubmit} />
      </Modal>
      <div onClick={handleOpenModal} className='add-post'>
        <FontAwesomeIcon icon={faPlus} size='3x' />
      </div>
    </div>
  )
}

export default Posts
