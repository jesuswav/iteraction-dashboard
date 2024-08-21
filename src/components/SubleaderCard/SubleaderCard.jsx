import React, { useState } from 'react'
import './SubleaderCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

import InteractionCard from '../../components/InteractionCard/InteractionCard'

const SubleaderCard = ({ data }) => {
  const [visiblePosts, setVisiblePosts] = useState('non-visible')
  const [checkedPosts, setCheckedPosts] = useState()

  return (
    <div>
      <span
        className='subleader-item'
        onClick={() => {
          if (visiblePosts === 'non-visible') {
            setVisiblePosts('visible')
          } else {
            setVisiblePosts('non-visible')
          }
        }}
      >
        <span>
          <FontAwesomeIcon
            icon={faChevronDown}
            className={
              visiblePosts === 'non-visible' ? 'chevron-down' : 'chevron-left'
            }
            size='2xl'
          />
        </span>
        <span
          style={{
            background: `${data.team_color}`,
            display: 'flex',
            height: 24,
            width: 24,
            borderRadius: 50,
          }}
        ></span>
        <p className='leader_name'>{data.team_name}</p>
      </span>
      {console.log(data.members)}
      <div className={`posts-container ${visiblePosts}`}>
        {data.members.map((item, index) => (
          <div className='posts-lists' key={index}>
            <InteractionCard data={item} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default SubleaderCard
