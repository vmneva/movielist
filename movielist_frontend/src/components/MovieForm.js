import { useState } from 'react' 

const MovieForm = ( {createMovie } ) => {
  const [title, setNewMovie] = useState('')
  const [director, setNewDirector] = useState('')

  const handleMovieAdd = (event) => {
    setNewMovie(event.target.value)
  }
  const handleDirectorAdd = (event) => {
    setNewDirector(event.target.value)
  }

  const addMovie = (event) => {
      event.preventDefault()
      createMovie({
        title: title,
        director: director,
        likes: 0,
      })
      setNewMovie('')
      setNewDirector('')
  }
    
    return (
      <div>
        <h2>Add new movie:</h2>
        <form onSubmit={addMovie}>
          title:
              <input
              value={title}
              onChange={handleMovieAdd}
            />
        <br></br>
         director:
              <input
              value={director}
              onChange={handleDirectorAdd}
            />
        <br></br>
        <button type="submit">add</button>
      </form>  
      </div>
    )
}
export default MovieForm