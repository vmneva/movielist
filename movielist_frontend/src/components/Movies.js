import { useState } from 'react'
import '../index.css'
import Movie from './Movie'
import { ReactComponent as HeartIcon } from '../icons/heart.svg';

const Movies = ({ movies, deleteMovie, toggleFavourite, user }) => {
    movies.sort(function(a,b) {
        return b.year - a.year
    });
    const [showAll, setShowAll] = useState(true)
    const [showType, setShowType] = useState('all');
    let moviesToShow = [...movies];
   
    if (!showAll) {
      moviesToShow = moviesToShow.filter(movie => movie.favourite);
    }
    if (showType !== 'all') {
      moviesToShow = moviesToShow.filter(movie => movie.type === showType);
    }
  
    moviesToShow.sort(function(a,b) {
      return b.year - a.year;
    });

    return (
      <div >
        <div className="buttons">
          <button className="normalbutton" onClick={() => setShowType('all')}>All</button>
          <button className="normalbutton" onClick={() => setShowType('movie')}>Movies</button>
          <button className="normalbutton" onClick={() => setShowType('tvSeries')}>TV Series</button>
          <button onClick={() => setShowAll(!showAll)} className={`favourite ${!showAll ? 'active' : ''}`}>
            <HeartIcon />
          </button>
        </div>
        {moviesToShow.map(movie => 
        <Movie 
          key={movie.id} 
          movie = {movie}
          user = {user}
          deleteMovie={() => deleteMovie(movie.id)}
          toggleFavourite={() => toggleFavourite(movie.id)} />
        )}
      </div>
    )
  }
  
  export default Movies