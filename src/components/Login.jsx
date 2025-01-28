import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../appStore/userSlice";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      dispatch(addUser(res.data.data));
      navigate("/");
    } catch (e) {
      setError(e?.response?.data?.message);
    }
  };
  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      if (!res) return;
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="flex justify-center my-2">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title m-auto">
            {isLoginForm ? "Login" : "Sign up"}
          </h2>
          {!isLoginForm && (
            <>
              <div>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
              </div>
              <div>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
              </div>
            </>
          )}
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email ID</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <p className="text-red-500 text-center">{error}</p>
          <div className="card-actions justify-center my-2">
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignUp}>
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
          <div className="flex cursor-pointer">
            <p className="m-4" onClick={() => setIsLoginForm(false)}>
              New user
            </p>
            <p className="m-4" onClick={() => setIsLoginForm(true)}>
              Exiting user
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
