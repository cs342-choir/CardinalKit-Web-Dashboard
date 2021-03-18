import { useDispatch } from "react-redux";
import { logout } from "../actions/auth";

export const NavVar = ()=>{
  const dispatch = useDispatch()

  const handleLogout = ()=>{
    dispatch(logout())
  }
    return(
        <div>
             <button
          onClick={handleLogout}
        >
          Sign Out
        </button>
        </div>
    )
}