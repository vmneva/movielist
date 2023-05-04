import '../index.css'
import movieService from '../services/movies'

const SearchResult = ({
      movie,
      movies,
      setMovies,
    }) => {
    
    const addMovie = (event) => {
        event.preventDefault()
        createMovie({
            name: movie.name,
            year: movie.year,
            type: movie.type,
            actors: movie.actors,
            image: movie.image,
            favourite: Math.random() > 0.5,
            dateAdded: new Date()
        })
    }
    const createMovie = (movieObject) => {
        movieService
            .create(movieObject)
            .then(returnedMovie => {
                setMovies(movies.concat(returnedMovie))
              }) 
    }
    if (movie.type === "movie") {
        return (
            <div className='IMDb'>
            <h2>{movie.name}</h2>
                <img src={movie.image}/>
                <li>Movie - {movie.year}</li>
                <li>{movie.actors}</li>
                <button onClick={addMovie}>add to your list</button>
            </div>    
        )
    }
    else {
        return (
            <div className='IMDb'>
            <h2>{movie.name}</h2>
                <img src={movie.image}/>
                <li>TV Series - {movie.year}</li>
                <li>{movie.actors}</li>
                <button onClick={addMovie}>add to your list</button>
            </div>    
        )
    }

}

export default SearchResult