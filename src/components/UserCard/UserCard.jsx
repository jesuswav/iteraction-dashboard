import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './UserCard.css'
import { faEllipsisVertical, faUser } from '@fortawesome/free-solid-svg-icons'

const UserCard = (data) => {
  return (
    <div className='user-card-item'>
      <span className='user-card-subitem'>
        <FontAwesomeIcon icon={faUser} size='2x' color='gray' />
        <p>{data.data.personal_name}</p>
      </span>
      <span className='team-tag'>
        <p>{data.data.team_name}</p>
      </span>
      <span>
        <FontAwesomeIcon icon={faEllipsisVertical} size='2x' color='gray' />
      </span>
    </div>
  )
}

export default UserCard
