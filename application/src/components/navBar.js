import { useDispatch } from "react-redux";
import { logout } from "../ations/auth";

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