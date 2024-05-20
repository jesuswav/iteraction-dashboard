import { useState } from 'react'
import './InteractionCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons'

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
          <div className='post-container' key={index}>
            <span className='first-post-container'>
              <FontAwesomeIcon icon={faFacebook} size='xl' color='gray' />
              <p className='post-name'>{item.post_name}</p>
              <p className='post-date'>{item?.registerDate.slice(0, -9)}</p>
            </span>
            {(item.checked && (
              <FontAwesomeIcon
                icon={faCircleCheck}
                size='xl'
                color='blue'
                id='complete-icon'
              />
            )) || (
              <FontAwesomeIcon icon={faCircle} size='xl' id='complete-icon' />
            )}
          </div>
        ))}
      </div>
      <div></div>
      {console.log(data)}
    </div>
  )
}

export default InteractionCard
