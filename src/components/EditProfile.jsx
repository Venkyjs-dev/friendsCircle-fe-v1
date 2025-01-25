import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../appStore/userSlice";

const EditProfile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [age, setAge] = useState(user?.age);

  const [about, setAbout] = useState(user?.about || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");

  const handleProfileEdit = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          gender,
          age,
          about,
          photoUrl,
        },
        { withCredentials: true }
      );
      if (!res.data.data) throw new Error("Invalid data from response");
      dispatch(addUser(res?.data?.data));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-start gap-2 my-4">
      <div className="flex justify-center my-2">
        <div className="card bg-base-300 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Edit Profile</h2>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">First Name</span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
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
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Gender</span>
                </div>
                <input
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Age</span>
                </div>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">photo url</span>
                </div>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">About</span>
                </div>
                <textarea
                  className="textarea textarea-bordered"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Bio"></textarea>
              </label>
            </div>
            <p className="text-red-500 text-center"></p>
            <div className="card-actions justify-center my-2">
              <button className="btn btn-primary" onClick={handleProfileEdit}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="card bg-base-300 w-96 shadow-xl my-2">
        <figure>
          <img src={photoUrl} alt="photo" className="w-1/2" />
        </figure>
        <div className="card-body mr-4">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>{"age: " + age}</p>
          <p>{"gender: " + gender}</p>
          <p>{about}</p>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

// first name
// last name
// gender --> dropdown
// age
// about --> text area
// skills
// photourl
