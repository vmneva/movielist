import { useState, useEffect, useRef } from 'react'
import './index.css'

import Movies from './components/Movies'
import MovieForm from './components/MovieForm'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

import movieService from './services/movies'
import loginService from './services/login'

const App = () => {
  const [movies, setMovies] = useState([])
  const [infoMessage, setInfoMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  useEffect(() => {
    movieService
      .getAll()
      .then(initialMovies => {
        setMovies(initialMovies)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedMovieappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      movieService.setToken(user.token)
    }
  }, [])

  const movieFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedMovieappUser', JSON.stringify(user)
      )
      movieService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const addMovie = (movieObject) => {
    movieService
      .create(movieObject)
      .then(returnedMovie => {
        setMovies(movies.concat(returnedMovie))
        movieFormRef.current.toggleVisibility()
      })
      .then(setInfoMessage(`a new blog ${movieObject.title} added`))
      .then(setTimeout(() => {
        setInfoMessage(null)
        }, 3000)
  )}

  const addLike = id => {
    const movie = movies.find(m => m.id === id)
    const newLikes = movie.likes + 1
    const likedMovie = { ...movie, likes: newLikes }

    movieService
      .update(id, likedMovie)
      .then(returnedMovie => {
        setMovies(movies.map(movie => movie.id !== id ? movie : returnedMovie))
      })
      .then(setInfoMessage(`"${likedMovie.title}" liked!`))    
      .then(setTimeout(() => {
          setInfoMessage(null)
        }, 2000)
      )
  }
  const deleteMovie = id => {
    const deletedMovie = movies.find(m => m.id === id)

    if (window.confirm(`Delete "${deletedMovie.title}"?`)) {
      movieService
        .poista(deletedMovie.id)
        .then(setMovies(movies.filter((deletedMovie) => deletedMovie.id !== id)))  
        .then(setInfoMessage(`${deletedMovie.title} deleted`))
        .then(setTimeout(() => {
            setInfoMessage(null)
            }, 3000)
          )
    }
  }

  const handleLogout = async () => {
    window.localStorage.clear()
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      {!user &&
        <LoginForm 
          username = {username} 
          password = {password}
          handleLogin = {handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
          errorMessage = {errorMessage} setErrorMessage = {setErrorMessage}
        />
      }
      {user &&
        <div>
        <h2>Movielist</h2>
        <Notification message={infoMessage} />
        <LogoutForm 
          user = {user}
          handleLogout = {handleLogout}
        />
        <Togglable buttonLabel="new movie" ref={movieFormRef}>
          <MovieForm createMovie={addMovie}/>
        </Togglable>
        <Movies 
          movies = {movies} 
          addLike = {addLike}
          deleteMovie = {deleteMovie} 
          user={user}
        />
        </div>
      }
    </div>
  )
}

export default App