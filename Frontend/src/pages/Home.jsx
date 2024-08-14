import Feed from "@/components/feed/Feed";
import RightSidebar from "@/components/RightSidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex">
      <div className="flex-grow">
        {[1, 2, 3, 4, 5].map((item) => {
          return <Feed />;
        })}

        <Outlet />
      </div>
      <RightSidebar />
    </div>
  );
};

export default Home;
