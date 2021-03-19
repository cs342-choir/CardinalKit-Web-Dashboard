import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../actions/auth";

export const NavVar = ()=>{
  const dispatch = useDispatch()

  const handleLogout = ()=>{
    dispatch(logout())
  }
    return(
        <nav>
             <button
          onClick={handleLogout}
        >
          Sign Out
        </button>
        <ul>
          <li>
            <NavLink activeClassName="active" to="/">Home</NavLink>
          </li>
        </ul>

        </nav>
    )
}