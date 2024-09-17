import React, { useEffect, useState } from 'react'
import PostsItemCard from '../../components/PostsItemCard/PostsItemCard'
import Modal from '../../components/Modal/Modal'
import NewPostForm from '../../components/NewPostForm/NewPostForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { PostContext } from '../../context'
import useApi from '../../hooks/useApi'

import './Posts.css'
import apiBase from '../../utils/API'

const Posts = () => {
  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState(false)
  const { updatePost, setUpdatePost } = React.useContext(PostContext)

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

      const url = `${apiBase}api/posts`

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

  const { fetchData, loading, error } = useApi()

  const getData = async () => {
    const url = `${apiBase}api/posts`

    const data = await fetchData('GET', url)
    setPosts(data)
  }

  useEffect(() => {
    getData()
    // getPosts()
    setUpdatePost(false)
  }, [newPost, updatePost])

  if (loading) {
    return (
      <div className='main-posts-lists-container'>
        <div>
          <h3>Posts</h3>
          <div className='loader-container'>
            <div className='loader'></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='post-object-container'>
      <h3>Posts</h3>
      <div className='posts-grid-container'>
        {(posts.length > 0 &&
          posts?.map((item, index) => (
            <div key={index} className='posts-div-main-container'>
              <div className='posts-lists-container'>
                <PostsItemCard data={item} />
              </div>
            </div>
          ))) || <p>There are no posts registered</p>}
      </div>
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
