import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../appStore/feedSlice";
import UserCard from "./UserCard";
const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      if (!res.data.data) throw new Error("No feed");
      dispatch(addFeed(res.data.data));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;
  if (feed.length === 0)
    return <h1 className="text-center my-10">No new users found</h1>;

  return (
    <div className="flex justify-center my-2">
      {feed && <UserCard user={feed[0]} />}
    </div>
  );
};

export default Feed;

/*
- on render of feed page, make an api call and get the feed
- store the feed into store as feed 
    - create feedSlice
- build a card component
- render card compoentn into feed page
*/
