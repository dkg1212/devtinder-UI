/* eslint-disable react-hooks/exhaustive-deps */
  
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import UserCard from "./UserCard";


const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);

  const getFeed = async () => {
    if(feed ) return;
    try {
      const res=await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.users));
      
    } catch (error) {
      console.error("Error fetching feed:", error);
      
    }
    

  };

  useEffect(() => {
      getFeed();
  }, []);

  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[2]} />
      </div>
    )
  );
};
export default Feed;