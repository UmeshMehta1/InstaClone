import {
  Heart,
  Home,
  LogOut,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import CreatePost from "../CreatePost";

const LeftSidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/user/logout", {
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(res.data.message);
    }
  };

  const sideBarHandler = (textType) => {
    if (textType === "Logout") {
      logoutHandler();
    } else if (textType === "Create") {
      setOpen(true);
    }
  };

  const sidebarItem = [
    { icon: <Home />, text: "Home" },
    { icon: <Search />, text: "Search" },
    { icon: <TrendingUp />, text: "Messages" },
    { icon: <Heart />, text: "Notification" },
    { icon: <PlusSquare />, text: "Create" },
    {
      icon: (
        <Avatar className="w-6 h-6">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
    },
    { icon: <LogOut />, text: "Logout" },
  ];

  return (
    <div className="fixed top-0 z-10 left-0 px-4 border-x-gray-300 w-[16%] h-screen">
      <div className="flex flex-col ">
        <h1>Logo</h1>
        <div>
          {sidebarItem.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => sideBarHandler(item.text)}
                className="relative flex items-center gap-3 p-3 my-3 rounded-lg cursor-pointer hover:bg-gray-100"
              >
                {item.icon}
                <span>{item.text}</span>
              </div>
            );
          })}
        </div>
        <CreatePost open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default LeftSidebar;
