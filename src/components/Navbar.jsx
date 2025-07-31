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
    <div className="navbar bg-base-content shadow-md px-4 sticky top-0 z-50">
      {/* Left: Logo */}
      <div className="flex-1">
        <Link
          to="/"
          className="text-xl font-bold text-blue-400 hover:text-primary-focus transition duration-300 transform hover:scale-105"
        >
          🧑🏻‍💻 DevTinder
        </Link>
      </div>

      {/* Right: User Info */}
      {user && (
        <div className="flex items-center gap-4">
          {/* Welcome Message */}
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-sm text-gray-400">
              Welcome,
              <span className="font-semibold"> {user.firstName} {user.lastName}</span>
            </span>
            <span className="text-sm text-gray-600">{user.emailId}</span>
          </div>

          {/* Avatar & Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar transition-transform hover:scale-105"
            >
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  alt="User avatar"
                  src={
                    user.photoUrl ||
                    `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`
                  }
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52 transition-all duration-200"
            >
              <li>
                <Link
                  to="/profile"
                  className="hover:bg-base-200 rounded-md px-2 py-1 transition-all"
                >
                  Profile
                  <span className="badge badge-info text-white text-xs ml-auto">New</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/connections"
                  className="hover:bg-base-200 rounded-md px-2 py-1 transition-all"
                >
                  Connections
                </Link>
              </li>
              <li>
                <Link
                  to="/requests"
                  className="hover:bg-base-200 rounded-md px-2 py-1 transition-all"
                >
                  Requests
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:bg-red-100 hover:text-red-700 rounded-md px-2 py-1 transition-all"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );

}

export default Navbar;