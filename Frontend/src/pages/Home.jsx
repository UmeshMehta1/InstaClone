import Feed from "@/components/feed/Feed";
import RightSidebar from "@/components/RightSidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex">
      <div className="flex-grow">
        <Feed />
        <Outlet />
      </div>
      <RightSidebar />
    </div>
  );
};

export default Home;
