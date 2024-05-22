import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Search.css'
import { faBars, faSearch } from '@fortawesome/free-solid-svg-icons'

const Search = () => {
  return (
    <div className='search-container'>
      <div className='search-subcontainer'>
        <FontAwesomeIcon icon={faBars} size='2x' />
        <input className='search-input' type='text' placeholder='Busca tu nombre' />
        <FontAwesomeIcon icon={faSearch} size='2x' />
      </div>
    </div>
  )
}

export default Search
