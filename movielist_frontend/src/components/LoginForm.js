import ErrorNotification from './ErrorNotification'

const LoginForm = ({
    handleLogin,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password,
    errorMessage,
}) => {

  return (
      <div>
        <h2>Log in to your movielist</h2>
        <ErrorNotification message={errorMessage} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
            <button type="submit">login</button>
          </form>      
      </div>
    )
}
export default LoginForm