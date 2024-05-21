import { useState } from 'react'
import './InteractionCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

import PostCard from '../PostCard/PostCard'

const InteractionCard = (data) => {
  const [visiblePosts, setVisiblePosts] = useState('non-visible')

  return (
    <div>
      <span
        className='item-container'
        onClick={() => {
          if (visiblePosts === 'non-visible') {
            setVisiblePosts('visible')
          } else {
            setVisiblePosts('non-visible')
          }
        }}
      >
        <div className='name-container'>
          <FontAwesomeIcon
            icon={faChevronDown}
            className={
              visiblePosts === 'non-visible' ? 'chevron-down' : 'chevron-left'
            }
            size='xl'
          />
          <p className='name'>{data.data.personal_name}</p>
        </div>
        <span className='team-tag'>
          <p>Equipo</p>
        </span>
        <FontAwesomeIcon icon={faTriangleExclamation} size='xl' color='red' />
      </span>
      <div className={`posts-container ${visiblePosts}`}>
        {data.data.posts.map((item, index) => (
          <PostCard key={index} item={item} />
        ))}
      </div>
      <div></div>
    </div>
  )
}

export default InteractionCard
