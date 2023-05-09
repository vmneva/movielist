import { useState, useEffect, useRef } from 'react'
import './index.css'

import Movies from './components/Movies'
import IMDbForm from './components/IMDbForm'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'

import movieService from './services/movies'
import loginService from './services/login'
import SignUpForm from './components/SignUpForm'

const App = () => {
  const [movies, setMovies] = useState([])
  const [users, setUsers] = useState([])
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

  const movieRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password,})
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

  const handleLogout = async () => {
    window.localStorage.clear()
    setUsername('')
    setPassword('')
  }

  const toggleFavourite = id => {
    const movie = movies.find(m => m.id === id)
    const changedMovie = { ...movie, favourite: !movie.favourite }
    movieService
      .update(id, changedMovie)
      .then(returnedMovie => {
        setMovies(movies.map(movie => movie.id !== id ? movie : returnedMovie))
      })
  }

  const deleteMovie = id => {
    const deletedMovie = movies.find(m => m.id === id)
    if (window.confirm(`Delete "${deletedMovie.name}"?`)) {
      movieService
        .poista(deletedMovie.id)
        .then(setMovies(movies.filter((deletedMovie) => deletedMovie.id !== id)))  
        .then(setInfoMessage(`${deletedMovie.name} deleted`))
        .then(setTimeout(() => {
            setInfoMessage(null)
            }, 3000)
          )
    }
  }

  return (
    <div>
      {!user &&
      <div>
        <ErrorNotification message={errorMessage} />
        <Notification message={infoMessage} />
        <SignUpForm 
          users = {users} setUsers = {setUsers}
          setErrorMessage = {setErrorMessage} setInfoMessage = {setInfoMessage}
        />
        <LoginForm 
          username = {username} password = {password} users={users}
          handleLogin = {handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
	      </div>
      }
      {user &&
        <div>
        <h1>Movielist</h1>
        <Notification message={infoMessage} />
        <LogoutForm 
          user = {user} handleLogout = {handleLogout}
        />
        <IMDbForm className="results"
          movies={movies} setMovies={setMovies}
        />
        <br></br>
        <Togglable buttonLabel="my list" ref={movieRef}>
          <Movies 
            movies = {movies} 
            deleteMovie = {deleteMovie} 
            toggleFavourite={toggleFavourite}
            user={user}
          />
        </Togglable>
        </div>
      }
    </div>
  )
}

export default App