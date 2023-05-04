import { useState, useEffect, useRef } from 'react'
import './index.css'

import Movies from './components/Movies'
import IMDbForm from './components/IMDbForm'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

import movieService from './services/movies'
import loginService from './services/login'
import SignInForm from './components/SignInForm'

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
  const userRef = useRef()

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

  const toggleFavourite = id => {
    const movie = movies.find(m => m.id === id)
    const changedMovie = { ...movie, favourite: !movie.favourite }

    movieService
      .update(id, changedMovie)
      .then(returnedMovie => {
        setMovies(movies.map(movie => movie.id !== id ? movie : returnedMovie))
      })
      .then(setInfoMessage(`Favourite status of ${changedMovie.name} changed`))    
      .then(setTimeout(() => {
          setInfoMessage(null)
        }, 2000)
      )
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

  const handleLogout = async () => {
    window.localStorage.clear()
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      {!user &&
      <div className='frontpage'>
        <h2>Welcome to your personal movielist!</h2>
        <form action="#">
			  <h1>Create Account</h1>
          <SignInForm 
            users = {users} 
            setUsers = {setUsers}
            errorMessage = {errorMessage} setErrorMessage = {setErrorMessage}
            infoMessage = {infoMessage} setInfoMessage = {setInfoMessage}
          />
			
		</form>

        <LoginForm 
          username = {username} 
          password = {password}
          users={users}
          handleLogin = {handleLogin}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
          errorMessage = {errorMessage} setErrorMessage = {setErrorMessage}
        />
          <SignInForm 
            users = {users} 
            setUsers = {setUsers}
            errorMessage = {errorMessage} setErrorMessage = {setErrorMessage}
            infoMessage = {infoMessage} setInfoMessage = {setInfoMessage}
          />
        
        </div>
      }
      {user &&
        <div>
        <h1>Movielist</h1>
        <Notification message={infoMessage} />
        <LogoutForm 
          user = {user}
          handleLogout = {handleLogout}
        />
        <IMDbForm 
          movies={movies} setMovies={setMovies}
        />
        
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