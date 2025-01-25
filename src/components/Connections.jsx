import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../appStore/connectionsSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections || connections.length === 0)
    return (
      <div className="text-center my-4 text-xl text-white">
        No Connection Found
      </div>
    );

  return (
    <div className="flex flex-col justify-center items-center my-5">
      <h1 className="text-white text-4xl">Connections</h1>
      <div className="w-1/2 p-4">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, about, gender, age } =
            connection;
          return (
            <div
              key={_id}
              className="flex items-center bg-base-300 rounded-xl my-2">
              <div className="m-2">
                <img alt="photo" src={photoUrl} className="w-20 rounded-full" />
              </div>
              <div className="m-2">
                <h3>{`${firstName} ${lastName}`}</h3>
                <p>{about}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
