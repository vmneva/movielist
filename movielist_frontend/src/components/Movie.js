import '../index.css'

const Movie = ({
      movie, 
      addLike, 
      deleteMovie,
      user
    }) => {

  const loggedUsername = user.valueOf().username;
  const movieUser = movie.user

  if (loggedUsername === movieUser.username) {
    return (
      <div className="div1">
        {movie.title}
        <li>directed by {movie.director}</li>
        <li>likes: {movie.likes}</li>
        <button onClick={addLike} className="button1">like</button>
        <button onClick={deleteMovie} className="button2">delete</button>
      </div>  
      )
  }

}

export default Movie
