import React from "react";
import { Outlet } from "react-router-dom";

const Profile = () => {
  return (
    <div>
      profile
      <Outlet />
    </div>
  );
};

export default Profile;
