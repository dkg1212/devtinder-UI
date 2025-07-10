import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Body() {
  return (
    <div className="bg-gray-400 min-h-screen">
        <Navbar />
        <Outlet/>
        <Footer />
    </div>
  );
}

export default Body;