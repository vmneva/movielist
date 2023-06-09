import { useState } from 'react' 
import userService from '../services/users'

const SignUpForm = ({
    users,
    setUsers,
    setInfoMessage,
    setErrorMessage
    }) => {
      
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleNameAdd = (event) => {
        setName(event.target.value)
    }
    const handleUsernameAdd = (event) => {
        setUsername(event.target.value)
    }
    const handlePasswordAdd = (event) => {
        setPassword(event.target.value)
    }

    const addUser = async (event) => {
        event.preventDefault()
        try {
          const newUser = await userService.create({
            name, username, password
          })
          setInfoMessage('new user created!')
          setTimeout(() => {
          setInfoMessage(null)
          }, 3000)
          setUsers(users.concat(newUser))
        }
        catch (exception) {
          setErrorMessage('username already taken!')
          setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        }
        setName('')
        setUsername('')
        setPassword('')
    }

  return (
      <div className='signup'>
        <h2>Create account</h2>
        <form>
          <div>
            <input
              type="text"
              value={name}
              onChange={handleNameAdd}
              placeholder='your name'
            />
          </div>
          <div>
            <input
              type="text"
              value={username}
              onChange={handleUsernameAdd}
              placeholder='username'
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={handlePasswordAdd}
              placeholder='password'
            />
            <br></br>
            <br></br>
            <button onClick={addUser}>sign up</button> 
          </div>
          </form>
              
      </div>
    )
}
export default SignUpForm