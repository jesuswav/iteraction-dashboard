import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import './PostsItemCard.css'

const PostsItemCard = (data) => {
  console.log(data.data)
  return (
    <div className='post-item-container'>
      <span className='item-firts-subcontainer'>
        <FontAwesomeIcon icon={faFacebook} size='2xl' color='gray' />
        <p>{data.data.post_name}</p>
      </span>
      <span className='item-subcontainer'>
        <p>{data.data.post_register_date.slice(0, -9)}</p>
      </span>
      <span className=''>
        <FontAwesomeIcon icon={faEllipsisVertical} size='2xl' color='gray' />
      </span>
    </div>
  )
}

export default PostsItemCard
