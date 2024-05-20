import { useState } from 'react'
import './InteractionCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

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
          />
          <p className='name'>{data.data.personal_name}</p>
        </div>
        <span className='team-tag'>
          <p>Equipo</p>
        </span>
        <FontAwesomeIcon icon={faTriangleExclamation} size='xl' />
      </span>
      <div className={`posts-container ${visiblePosts}`}>
        {data.data.posts.map((item, index) => (
          <span className='post-container' key={index}>
            <p className='post-name'>{item.post_name}</p>
            <p className='post-name'>{item.registerDate}</p>
          </span>
        ))}
      </div>
      <div></div>
      {console.log(data)}
    </div>
  )
}

export default InteractionCard
