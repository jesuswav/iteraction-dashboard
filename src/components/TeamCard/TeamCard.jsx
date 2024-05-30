import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './TeamCard.css'
import { faEllipsisVertical, faUsers } from '@fortawesome/free-solid-svg-icons'

const TeamCard = (data) => {
  return (
    <div className='user-card-item'>
      <span className='user-card-subitem'>
        <FontAwesomeIcon icon={faUsers} size='2x' color='gray' />
        <p>{data.data.team_name}</p>
      </span>
      <span>
        <FontAwesomeIcon icon={faEllipsisVertical} size='2x' color='gray' />
      </span>
    </div>
  )
}

export default TeamCard
