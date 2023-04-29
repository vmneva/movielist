const LogoutForm = ({
    handleLogout,
    user,

}) => {
    return (
        <div>
        <form onSubmit={handleLogout}>
            <p>
            {user.name} logged in
            <button type="submit">logout</button>
            </p>
        </form>      
        </div> 
    )
}
export default LogoutForm