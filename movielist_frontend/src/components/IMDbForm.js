import { useState } from 'react' 
import '../index.css'
import SearchResult from './SearchResult'
import { ReactComponent as SearchIcon } from '../icons/search.svg';
import { ReactComponent as CloseIcon } from '../icons/close.svg';


const IMDbForm = ({movies, setMovies }) => {
  const [title, setMovieSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const handleMovieSearch = (event) => {
    setMovieSearch(event.target.value)
  }
  const handleCloseSearch = () => {
    setSearchResults([])
  }

  const url = 'https://online-movie-database.p.rapidapi.com/auto-complete?q'
  const options = {
      method: 'GET',
      headers: {
          'X-RapidAPI-Key': '6e4b04454cmsh064fac70f0e644ep14c27ajsn55675539444d',
          'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
      }
  }

  const searchMovie = (event) => {
    event.preventDefault()   
    fetch(`${url}=${title}`, options)
        .then(response => response.json())
        .then(data => {
            const movielist = data.d;
            const results = movielist
            .filter(movie => movie.qid === 'movie' || movie.qid === 'tvSeries')
            .filter(movie => movie.i !== undefined)
            .map(movie => ({
                    id: movie.id,
                    name: movie.l,
                    year: movie.y,
                    type: movie.qid,
                    actors: movie.s,
                    image: movie.i.imageUrl,
                }));
              setSearchResults(results);
            })
  }
    
    return (
      <div className='movie-card'>
        <h2>Search movie from IMDb:</h2>
        <form onSubmit={searchMovie}>
            name:
              <input
              value={title}
              onChange={handleMovieSearch}
            />
        <button type="submit" className='searchbutton'>
          <SearchIcon />
        </button>
        {searchResults.length > 0 && 
          <button type="button" onClick={handleCloseSearch}>
            <CloseIcon />
          </button>
        }
        </form>
        <ul>
        {searchResults.map(result => (
          <SearchResult
                key={result.id}
                movie={result} 
                movies={movies}
                setMovies = {setMovies}
                />
        ))}
        </ul>
      </div>
    )
}
export default IMDbForm