/* eslint-disable react-hooks/exhaustive-deps */
  
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import UserCard from "./UserCard";
import { PiggyBank } from "lucide-react";


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

  if (!feed) return;
  if (feed.length === 0) return <h1 className="flex justify-center my-10">No Users Found</h1>;
  
  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};
export default Feed;

