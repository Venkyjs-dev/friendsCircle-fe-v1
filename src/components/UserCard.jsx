import React from "react";

const UserCard = ({ user }) => {
  console.log(user, "user -->");
  const { firstName, lastName, photoUrl, age, about } = user;
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
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
