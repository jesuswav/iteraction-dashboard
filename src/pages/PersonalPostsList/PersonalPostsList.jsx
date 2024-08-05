import React, { useEffect, useState } from 'react'
import { PostContext } from '../../context'
import InteractionCard from '../../components/InteractionCard/InteractionCard'

import './PersonalPostsList.css'

const PersonalPostsList = () => {
  // From context
  const { estado, setEstado } = React.useContext(PostContext)
  const { filteredPosts, setFilteredPosts } = React.useContext(PostContext)
  const { notFilteredPosts, setNotFilteredPosts } =
    React.useContext(PostContext)

  const { postsData, setPostsData } = React.useContext(PostContext)

  const getCurrentDate = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // Los meses en JavaScript son 0-indexed
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
  const currentDate = getCurrentDate()
  const [selectedDate, setSelectedDate] = useState(currentDate)

  const fetchData = async () => {
    try {
      const date = { date: selectedDate }
      const loginToken = localStorage.getItem('loginToken')

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${loginToken}`,
        },
        body: JSON.stringify(date),
      }
      // const url = 'https://interaction-backend-1.onrender.com/api/user_posts'
      const url = 'http://localhost:3000/api/user_posts'

      const response = await fetch(url, requestOptions)
      if (!response.ok) {
        throw new Error('Error al realizar la solicitud')
      }
      const responseData = await response.json()
      setPostsData(responseData)

      // console.log('Posts data: ', postsData)
    } catch (e) {
      console.log('Error fetching data. ', e)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value)
  }

  const handleSubmit = () => {
    fetchData()
  }

  return (
    <div>
      <div className='filter-container'>
        <input
          type='date'
          name='date'
          id='date'
          value={selectedDate}
          onChange={handleDateChange}
        />
        <button className='date-button' onClick={handleSubmit}>
          Filtrar
        </button>
      </div>
      <h3>Personal and posts</h3>
      {console.log(postsData)}
      {/* {!notFilteredPosts && <p>No posts for that search.</p>} */}
      {filteredPosts.length > 0 &&
        filteredPosts?.map((item, index) => (
          <div className='posts-lists' key={index}>
            <InteractionCard data={item} />
          </div>
        ))}
      {postsData.length > 0 &&
        filteredPosts.length === 0 &&
        postsData.map((item, index) => (
          <div className='posts-lists' key={index}>
            <InteractionCard data={item} />
          </div>
        ))}
      {/* {
        // Resultados de posts filtrados
        filteredPosts.length > 0 &&
          notFilteredPosts &&
          filteredPosts?.map((item, index) => (
            <div className='posts-lists' key={index}>
              <InteractionCard data={item} />
            </div>
          ))
      }
      {
        // Verificar que ambos postsData y filteredPosts tengan elementos
        postsData.length > 0 && notFilteredPosts && (
          <>
            {postsData.map((item, index) => (
              <div className='posts-lists' key={index}>
                <InteractionCard data={item} />
              </div>
            ))}
            {filteredPosts.map((item, index) => (
              <div className='filtered-posts-lists' key={index}>
                <InteractionCard data={item} />
              </div>
            ))}
          </>
        )
      } */}
    </div>
  )
}

export default PersonalPostsList
