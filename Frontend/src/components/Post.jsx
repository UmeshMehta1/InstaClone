import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { MoreHorizontal } from "lucide-react";

const Post = () => {
  return (
    <div className="w-full max-w-sm mx-auto my-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="" alt="postImg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1>username</h1>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center text-sm text-center">
            <span
              variant="ghost"
              className="cursor-pointer w-fit font-bold text-[#ED4956]"
            >
              Unfollow
            </span>

            <span variant="ghost" className="cursor-pointer w-fit ">
              Add to favorites
            </span>

            <span variant="ghost" className="cursor-pointer w-fit ">
              Delete
            </span>
          </DialogContent>
        </Dialog>
      </div>
      <img
        className="object-cover w-full rounded-sm aspect-square"
        src="https://images.unsplash.com/photo-1722603037481-6f6f7bf852fa?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="postImg"
      />
    </div>
  );
};

export default Post;
