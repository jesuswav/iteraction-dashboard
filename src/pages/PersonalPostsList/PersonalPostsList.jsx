import React, { useEffect, useState } from 'react'
import InteractionCard from '../../components/InteractionCard/InteractionCard'

import './PersonalPostsList.css'

const PersonalPostsList = () => {
  const [postsData, setPostData] = useState([])
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
      setPostData(responseData)
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
      {(postsData.length > 0 &&
        postsData?.map((item, index) => (
          <div className='posts-lists' key={index}>
            <InteractionCard data={item} />
          </div>
        ))) || <p>There are no posts registered</p>}
    </div>
  )
}

export default PersonalPostsList
