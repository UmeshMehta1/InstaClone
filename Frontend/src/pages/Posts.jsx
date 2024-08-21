import React from "react";
import Post from "@/components/Post";
import { useSelector } from "react-redux";
const Posts = () => {
  const { posts } = useSelector((store) => store.post);
  //   console.log("posts", posts);
  return (
    <div>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
