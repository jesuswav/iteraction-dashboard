import { useEffect, useState } from 'react'
import './InteractionCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

import PostCard from '../PostCard/PostCard'

const InteractionCard = (data) => {
  const [visiblePosts, setVisiblePosts] = useState('non-visible')
  const [checkedPosts, setCheckedPosts] = useState()

  let checkedCount = 0

  data.data.posts.map((item) => {
    if (item.checked) {
      checkedCount++
    }
  })

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
        <span
          className='team-tag'
          style={{ background: `${data.data.team_color}` }}
        >
          <p>{data.data.personal_team}</p>
        </span>
        {(checkedCount === data.data.posts.length && (
          <FontAwesomeIcon icon={faCircleCheck} size='xl' color='green' />
        )) || (
          <FontAwesomeIcon icon={faTriangleExclamation} size='xl' color='red' />
        )}
      </span>
      <div className={`posts-container ${visiblePosts}`}>
        {data.data.posts.map((item, index) => (
          <PostCard key={index} item={item} data={data.data} />
        ))}
      </div>
      <div></div>
    </div>
  )
}

export default InteractionCard
