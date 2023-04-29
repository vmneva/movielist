import Movie from './Movie'

const Movies = ({ movies, addLike, deleteMovie, user }) => {
    movies.sort(function(a,b) {
        return b.likes - a.likes
    });

    return (
      <div>
        {movies.map(movie => 
        <Movie 
          key={movie.title} 
          movie = {movie}
          user = {user}
          addLike={() => addLike(movie.id)}
          deleteMovie={() => deleteMovie(movie.id)} />
        )}
      </div>
    )
  }
  
  export default Movies