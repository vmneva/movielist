import { useState } from 'react'
import '../index.css'
import Movie from './Movie'

const Movies = ({ movies, addLike, deleteMovie, toggleFavourite, user }) => {
    movies.sort(function(a,b) {
        return b.likes - a.likes
    });
    
    const [showAll, setShowAll] = useState(true)
    const moviesToShow = showAll
      ? movies
      : movies.filter(movie => movie.favourite)

    return (
      <div>
        {moviesToShow.map(movie => 
        <Movie 
          key={movie.title} 
          movie = {movie}
          user = {user}
          deleteMovie={() => deleteMovie(movie.id)}
          toggleFavourite={() => toggleFavourite(movie.id)} />
        )}
        <button className='showbutton' onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'favourites' : 'all' }
        </button>
      </div>
    )
  }
  
  export default Movies