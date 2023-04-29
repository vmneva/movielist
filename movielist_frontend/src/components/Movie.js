import '../index.css'

const Movie = ({
      movie, 
      deleteMovie,
      toggleFavourite,
      user
    }) => {

      const label = movie.favourite
      ? 'remove from favourites' : 'add to favourites'

      const loggedUsername = user.valueOf().username;
      const movieUser = movie.user

      if (loggedUsername === movieUser.username) {
        return (
          <div className="div1">
            {movie.title}
            <li>directed by {movie.director}</li>
            <li>likes: {movie.likes}</li>
            <button onClick={toggleFavourite} className="button1">{label}</button>
            <button onClick={deleteMovie} className="button2">delete</button>
          </div>  
          )
      }

}

export default Movie
