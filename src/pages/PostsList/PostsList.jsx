import React, { useEffect, useState } from 'react'
import InteractionCard from '../../components/InteractionCard/InteractionCard'

const PostsList = () => {
  const [postsData, setPostData] = useState()

  const fetchData = () => {
    fetch('http://localhost:3000/registros')
      .then((response) => response.json())
      .then((data) => setPostData(data))
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      {postsData?.map((item, index) => (
        <div className='posts-lists' key={index}>
          <InteractionCard data={item} />
        </div>
      ))}
    </div>
  )
}

export default PostsList
