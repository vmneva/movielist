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
    setMovieSearch('')
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
                    dateAdded: new Date()
                }));
              setSearchResults(results);
            })
  }
    
    return (
      <div>
        <h2 className='searchForm'>Search movie from IMDb:</h2>
        <form onSubmit={searchMovie}>
          <input
            value={title}
            onChange={handleMovieSearch}
            placeholder='name of the movie...'
          />
          <button type="submit" className='searchbutton'>
          <SearchIcon />
          </button>
          {searchResults.length > 0 && 
            <button className='closeSearch' type="button" onClick={handleCloseSearch}>
              <CloseIcon />
            </button>
          }
        </form>
        <br></br>
        <ul className='IMDb'>
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