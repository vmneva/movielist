const LogoutForm = ({
    handleLogout,
    user,

}) => {
    return (
        <div>
        <form onSubmit={handleLogout}>
            <div className="logout">
            {user.name} logged in
            <button type="submit">logout</button>
            </div>
        </form>      
        </div> 
    )
}
export default LogoutForm