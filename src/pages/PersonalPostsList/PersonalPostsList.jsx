import React, { useEffect, useState } from 'react'
import { PostContext } from '../../context'
import InteractionCard from '../../components/InteractionCard/InteractionCard'
import SubleaderCard from '../../components/SubleaderCard/SubleaderCard'
import useApi from '../../hooks/useApi'

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

  // const fetchData = async () => {
  //   try {
  //     const date = { date: selectedDate }
  //     const loginToken = localStorage.getItem('loginToken')

  //     const requestOptions = {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${loginToken}`,
  //       },
  //       body: JSON.stringify(date),
  //     }
  //     // const url = 'https://interaction-backend-1.onrender.com/api/user_posts'
  //     const url = 'http://localhost:3000/api/user_posts'

  //     const response = await fetch(url, requestOptions)
  //     if (!response.ok) {
  //       throw new Error('Error al realizar la solicitud')
  //     }
  //     const responseData = await response.json()
  //     setPostsData(responseData)

  //     // console.log('Posts data: ', postsData)
  //   } catch (e) {
  //     console.log('Error fetching data. ', e)
  //   }
  // }

  const { fetchData, loading, error } = useApi()

  useEffect(() => {
    // fetchData()
    const getData = async () => {
      const data = await fetchData(
        'POST',
        'http://localhost:3000/api/user_posts'
      )
      setPostsData(data)
    }

    getData()
  }, [filteredPosts])

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value)
  }

  const handleSubmit = () => {
    fetchData()
  }

  return (
    <div className='main-posts-lists-container'>
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
      <h3>Sub líderes</h3>
      {filteredPosts.length === 0 && <p>No existen coincidencias</p>}
      {postsData.length > 0 &&
        filteredPosts.message &&
        postsData.map((item, index) => (
          <div key={index}>
            <SubleaderCard data={item} />
          </div>
        ))}
      {!filteredPosts.message &&
        filteredPosts.map((item, index) => (
          <div key={index}>
            <InteractionCard data={item} />
          </div>
        ))}
    </div>
  )
}

export default PersonalPostsList
