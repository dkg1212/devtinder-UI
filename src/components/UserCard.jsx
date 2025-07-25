import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const UserCard = ({ user }) => {
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
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={user.photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button 
          className="btn btn-primary"
            onClick={() => handleSendRequest("ignore", _id)}>
            Ignore
            </button>
          <button className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}>
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserCard;