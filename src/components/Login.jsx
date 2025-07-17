import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      if (err.response && err.response.status === 400) {
        setError("Invalid email or password");
      } else {
        setError("An error occurred while logging in. Please try again later.");
      }
    }
  };
  
  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
          age,
          gender,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      console.error("Signup failed:", err);
      if (err.response && err.response.status === 400) {
        setError("Email already exists or invalid data");
      } else {
        setError("An error occurred while signing up. Please add all fields.");
      }
    }
  };

 return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="bg-white dark:bg-base-300 w-full max-w-md p-8 rounded-3xl shadow-lg transform transition-all duration-300 hover:scale-[1.01]">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          {isLoginForm ? "Welcome Back 👋" : "Join Us Today 🚀"}
        </h2>

        <div className="space-y-4">
          {!isLoginForm && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Enter last name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Enter age"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Email</label>
            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="input input-bordered w-full"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full pr-10"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-400"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

          <button
            onClick={isLoginForm ? handleLogin : handleSignUp}
            className="btn btn-primary w-full mt-4"
          >
            {isLoginForm ? "Login" : "Sign Up"}
          </button>

          <p className="text-center mt-4 text-gray-700 dark:text-gray-200">
            {isLoginForm ? "Don't have an account?" : "Already have an account?"}{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer font-semibold"
              onClick={() => setIsLoginForm(!isLoginForm)}
            >
              {isLoginForm ? "Sign Up" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;