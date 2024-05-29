import React, { useEffect, useState } from 'react'
import InteractionCard from '../../components/InteractionCard/InteractionCard'

import './PersonalPostsList.css'

const PersonalPostsList = () => {
  const [postsData, setPostData] = useState()
  const [selectedDate, setSelectedDate] = useState('2024-05-28')

  const fetchData = async () => {
    const date = { date: selectedDate }
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(date),
    }
    const url = 'http://localhost:3000/api/user_posts'

    const response = await fetch(url, requestOptions)
    if (!response.ok) {
      throw new Error('Error al realizar la solicitud')
    }
    const responseData = await response.json()
    setPostData(responseData)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value)
  }

  const handleSubmit = () => {
    console.log('Selected date: ', selectedDate)
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
      {postsData?.map((item, index) => (
        <div className='posts-lists' key={index}>
          <InteractionCard data={item} />
        </div>
      ))}
    </div>
  )
}

export default PersonalPostsList
