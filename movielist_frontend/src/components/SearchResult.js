import '../index.css'
import { useState } from 'react' 
import movieService from '../services/movies'
import { ReactComponent as CheckIcon } from '../icons/check.svg';

const SearchResult = ({
      movie,
      movies,
      setMovies,
    }) => {

    const [isAdded, setIsAdded] = useState(false);

    const addMovie = (event) => {
        event.preventDefault()
        if (movie.id)
        createMovie({
            name: movie.name,
            year: movie.year,
            type: movie.type,
            actors: movie.actors,
            image: movie.image,
            favourite: Math.random() > 0.5,
            dateAdded: new Date()
        })
        setIsAdded(true);
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
            <div className='searchresult'>
                <img src={movie.image} alt={movie.name}/>
                <h2>{movie.name}</h2>
                <li>Movie - {movie.year}</li>
                <li>{movie.actors}{' '}
                    {isAdded ? (<button className='check-icon'> <CheckIcon /></button>) 
                        : (<button onClick={addMovie}>add to your list</button>)}
                </li>
            </div>  
        )
    }
    else {
        return (
            <div className='searchresult'>
                <img src={movie.image} alt={movie.name}/>
                <h2>{movie.name}</h2>
                <li>TV Series - {movie.year}</li>
                <li>{movie.actors}{' '}
                    {isAdded ? (<button className='check-icon'> <CheckIcon /></button>) 
                        : (<button onClick={addMovie}>add to your list</button>)}
                </li>
            </div> 
        )
    }

}

export default SearchResult