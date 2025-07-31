import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const UserCard = ({ user }) => {
  // eslint-disable-next-line no-unused-vars
  const { _id ,firstName, lastName, age, gender, about } = user;
  const dispatch=   useDispatch();

  const handleSendRequest = async(status , userId) => {
    try {  
        const res = await axios.post(
            BASE_URL + "/request/send/" + status + "/" + userId,
            {},
            { withCredentials: true }
        );
        if (res.status === 200) {
            dispatch(removeUserFromFeed(userId));
        }
        }catch (err) {
        console.error("Error sending request:", err);
        // Handle Error Case
        if (err.response && err.response.status === 400) {
            console.error("Invalid request data");
        } else {
            console.error("An error occurred while sending the request.");
        }
    }
  };   
   
return (
  <div className="card w-96 bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 hover:scale-[1.02]">
    <figure className="relative">
      <img
        src={
          user.photoUrl ||
          `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`
        }
        alt="User Photo"
        className="w-full h-64 object-cover"
      />
      <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent w-full h-16"></div>
    </figure>

    <div className="card-body">
      <h2 className="card-title text-center text-lg">
        {user.firstName + " " + user.lastName}
      </h2>

      {user.age && user.gender && (
        <p className="text-center text-sm text-gray-500">
          {user.age}, {user.gender}
        </p>
      )}

      {user.about && (
        <p className="text-sm text-center text-gray-700">{user.about}</p>
      )}

      <div className="card-actions justify-center mt-4">
        <button
          className="btn btn-outline btn-error hover:scale-105 transition-transform"
          onClick={() => handleSendRequest("ignored", user._id)}
        >
          Ignore
        </button>

        <button
          className="btn btn-primary hover:scale-105 transition-transform"
          onClick={() => handleSendRequest("interested", user._id)}
        >
          Interested
        </button>
      </div>
    </div>
  </div>
);

};
export default UserCard;