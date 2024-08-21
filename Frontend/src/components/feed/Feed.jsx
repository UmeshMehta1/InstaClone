import React from "react";
import Post from "../Post";
import Posts from "@/pages/posts";

const Feed = () => {
  return (
    <div className="flex flex-col items-center flex-1 ">
      <Posts />
    </div>
  );
};

export default Feed;
