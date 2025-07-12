import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";

function Body() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const userData=useSelector((store) => store.user);

    
   const fetchUser = async () => {
    try {
      if(userData) return; // If user data is already present, no need to fetch again
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true
      });
      dispatch(addUser(res.data));
     } catch (err) {
      if(err.response && err.response.status === 401) {
        // If user is not authenticated, redirect to login page
        navigate("/login");
      } else {
        console.error("Error fetching user data:", err);
      }
    }
  };
  
  useEffect(() => {
    fetchUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-gray-400 min-h-screen">
        <Navbar />
        <Outlet/>
        <Footer />
    </div>
  );
}

export default Body;