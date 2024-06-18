import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import './ProfileModal.css'

const ProfileModal = () => {
  return (
    <div>
      <span className='profile-header'>
        <FontAwesomeIcon icon={faUser} />
        <h4>Profile</h4>
      </span>
      <div>
        <span>
          <p className='profile-input-label'>Name</p>
          <p className='profile-input'>Jesus</p>
        </span>
        <span className='profile-input-container'>
          <p className='profile-input-label'>Last name</p>
          <p className='profile-input'>Garcia</p>
        </span>
        <div className='second-profile-container'>
          <span className='profile-input-container'>
            <p className='profile-input-label'>Last name</p>
            <p className='profile-input'>Garcia</p>
          </span>
          <span className='profile-input-container'>
            <p className='profile-input-label'>Phone</p>
            <p className='profile-input'>449 105 8256</p>
          </span>
        </div>
      </div>
      <button className='post-profile-button'>Log out</button>
    </div>
  )
}

export default ProfileModal
