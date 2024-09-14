import React, { useEffect, useState } from 'react'
import { PostContext } from '../../context'
import InteractionCard from '../../components/InteractionCard/InteractionCard'
import SubleaderCard from '../../components/SubleaderCard/SubleaderCard'
import useApi from '../../hooks/useApi'

import './PersonalPostsList.css'
import apiBase from '../../utils/API'

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
  const [selectedDate, setSelectedDate] = useState(undefined)

  const { fetchData, loading, error } = useApi()

  const getData = async () => {
    const url = `${apiBase}api/user_posts`

    const date = {
      date: selectedDate,
    }
    const data = await fetchData('POST', url, date)
    setPostsData(data)
  }

  useEffect(() => {
    // fetchData()

    getData()
  }, [filteredPosts])

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value)
  }

  const handleSubmit = () => {
    setSelectedDate(currentDate)
    getData()
  }

  if (loading) {
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
          <button className='date-button'>Filtrar</button>
        </div>
        <div>
          <h3>Sub líderes</h3>
          <div className='loader-container'>
            <div className='loader'></div>
          </div>
        </div>
      </div>
    )
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
      <div className='subleader-item-container'>
        <div>
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
      </div>
    </div>
  )
}

export default PersonalPostsList
