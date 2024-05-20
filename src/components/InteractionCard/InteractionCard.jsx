import './InteractionCard.css'

const InteractionCard = (data) => {
  return (
    <div>
      <span>
        <p className='name'>{data.data.personal_name}</p>
      </span>
      <div>
        {data.data.posts.map((item, index) => (
          <span className='post-container' key={index}>
            <p className='post-name'>{item.post_name}</p>
            <p className='post-name'>{item.registerDate}</p>
          </span>
        ))}
      </div>
      <div>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
          <path d='M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z' />
        </svg>
      </div>
      {console.log(data)}
    </div>
  )
}

export default InteractionCard
