import { useState } from 'react'
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
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'favourites' : 'all' }
        </button>
        {moviesToShow.map(movie => 
        <Movie 
          key={movie.title} 
          movie = {movie}
          user = {user}
          deleteMovie={() => deleteMovie(movie.id)}
          toggleFavourite={() => toggleFavourite(movie.id)} />
        )}
      </div>
    )
  }
  
  export default Movies