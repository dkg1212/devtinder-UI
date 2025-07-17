import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removedUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Navbar = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
const handleLogout = async () => {
  try {
    await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
    dispatch(removedUser());
    navigate("/login");
  } catch (err) {
    console.error("Logout failed:", err);
  }
};
  return (
    <div className="navbar bg-gray-500 shadow-lg"> {/* Changed to bg-base-300 for better theme compatibility */}
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
      </div>
    {user &&(
      <div className="flex-none gap-2"> {/* Changed to flex-none for better alignment */}
        <div className="form-control">
          Welcome,{ " "+user.firstName + " " + user.lastName} {/* Displaying user's first and last name */}
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="User profile picture"
                src={user.photoUrl}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            // Using z-[1] to ensure dropdown appears above other content.
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li><Link to="/connections">Connections</Link></li>
            <li><Link to="/requests">Requests</Link></li>
            <li><a onClick={handleLogout}>Logout</a></li>
          </ul>
        </div>
      </div>
    )}
    </div>
  );
}

export default Navbar;