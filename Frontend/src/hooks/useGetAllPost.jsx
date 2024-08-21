import { setPosts } from "@/redux/postSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
const useGetAllPost = () => {
  const dispatch = useDispatch();

  const fetchAllPost = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/post/all", {
        withCredentials: true,
      });

      if (res.data.success) {
        // console.log(res.data.posts);
        dispatch(setPosts(res.data.posts));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllPost();
  }, []);
};

export default useGetAllPost;
