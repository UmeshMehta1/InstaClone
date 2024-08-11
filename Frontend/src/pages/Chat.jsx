import React from "react";
import { Outlet } from "react-router-dom";

const Chat = () => {
  return (
    <div>
      chat
      <Outlet />
    </div>
  );
};

export default Chat;
