import '../index.css'
import { ReactComponent as LogoutIcon } from '../icons/logout.svg';

const LogoutForm = ({
    handleLogout,
    user,

}) => {
    return (
    <div className="logout">
    <form onSubmit={handleLogout}>
        <div>
        {user.name} logged in
        <br></br>
        <button className="logoutbutton" type="submit">
            <LogoutIcon/>
        </button>
        </div>
    </form>      
    </div> 
    )
}
export default LogoutForm