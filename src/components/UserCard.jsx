import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { removeUserFromFeed } from "../appStore/feedSlice";
import { useDispatch } from "react-redux";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      if (!res) throw new Error("Invalid response!");
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={photoUrl} alt="photo" className="w-1/2" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{"age: " + age}</p>
        <p>{about}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}>
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}>
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
