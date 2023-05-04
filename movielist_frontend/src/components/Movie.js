import '../index.css'
import { ReactComponent as HeartIcon } from '../icons/heart.svg';
import { ReactComponent as DeleteIcon } from '../icons/trash.svg';


const Movie = ({
      movie, 
      deleteMovie,
      toggleFavourite,
      user
    }) => {

      const isFavourite = movie.favourite;
      if (movie.dateAdded === undefined) {
        movie.dateAdded = new Date()
      }

      const loggedUsername = user.valueOf().username;
      const movieUser = movie.user

      if (loggedUsername === movieUser.username) {
        return (
          <div className="movies">
            {movie.imageUrl && (
            <img src={movie.imageUrl} alt={`${movie.name} poster`} className="poster" />
            )}
        <h3>{movie.name}</h3>
        <ul>
          <li>Released in {movie.year}</li>
          <li>Starring: {movie.actors}</li>
          <li>Watched in {movie.dateAdded.toLocaleDateString()}</li>
        </ul>
        <button onClick={toggleFavourite} className={`favourite ${isFavourite ? 'active' : ''}`}>
          <HeartIcon />
        </button>
        <button onClick={deleteMovie} className="delete">
          <DeleteIcon />
        </button>
      </div>  
          )
      }

}

export default Movie
