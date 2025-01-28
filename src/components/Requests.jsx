import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../appStore/requestsSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const [isRequestSend, setIsRequestSend] = useState(false);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      if (!res) throw new Error("invalid response");
      dispatch(addRequests(res.data.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleRequest = async (status, requestId) => {
    try {
      const res = await axios.post(
        BASE_URL + `/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      if (!res) throw new Error("Invalid response!");
      // api success
      // api failure
      setIsRequestSend(true);
      setTimeout(() => {
        setIsRequestSend(false);
      }, 3000);
      dispatch(removeRequest(requestId));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests || requests.length === 0)
    return (
      <div className="text-center my-4 text-xl text-white">
        No Requests Found
      </div>
    );

  return (
    <>
      {isRequestSend && (
        <div className="toast toast-center toast-middle">
          <div className="alert alert-success">
            <span>Requset saved successfully.</span>
          </div>
        </div>
      )}
      <div className="flex flex-col justify-center items-center my-5">
        <h1 className="text-white text-4xl">Requests</h1>
        <div className="w-2/3 p-4">
          {requests.map((request) => {
            const {
              requestId,
              firstName,
              lastName,
              photoUrl,
              about,
              gender,
              age,
            } = request;
            return (
              <div
                key={requestId}
                className="flex items-center justify-evenly bg-base-300 rounded-xl my-2">
                <div className="m-2">
                  <img
                    alt="photo"
                    src={photoUrl}
                    className="w-20 rounded-full"
                  />
                </div>
                <div className="m-2">
                  <h3>{`${firstName} ${lastName}`}</h3>
                  <p>{about}</p>
                </div>
                <div className="m-2 flex gap-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      handleRequest("rejected", requestId);
                    }}>
                    Reject
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      handleRequest("accepted", requestId);
                    }}>
                    Accept
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Requests;

/*
1. create request route, /requests => requests component =
2. create a slice to store the connections requests data into store =
3. once connections request component is loaded, make an api call get the reqeusts data. =
4. dispatch an action to store that data into the store =
5. get the request data from store and render into the Ui =
6. request card UI =
    - photo
    - name and about
    - ignore and accpet buttons
7. onclick of ignore/accept make an api call to respective request
8. remove that request from the store, using action.
9. on successfull api request, show toast message.
*/

// const handleRequest = async () => {
//   try {
//     const res = await axios.get(
//       BASE_URL + `/request/send/${"status"}/${"userId"}`
//     );
//   } catch (error) {
//     console.error(error.message);
//   }
// };
