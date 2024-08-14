import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@radix-ui/react-dialog";
import { MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import Comment from "./Comment";

const CommentDialog = ({ open, setOpen }) => {
  const [text, setText] = useState("");

  const handleSend = (e) => {
    const { value } = e.target;

    if (value.trim()) {
      setText(value);
    } else {
      setText("");
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="flex flex-col max-w-5xl p-0"
      >
        <div className="flex flex-1">
          <div className="w-1/2">
            <img
              src="https://images.unsplash.com/photo-1722603037481-6f6f7bf852fa?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="imgP"
            />
          </div>

          <div className="flex flex-col justify-between w-1/2">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="" alt="img" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>umesh</div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <MoreHorizontal className="cursor-pointer" />
                </DialogTrigger>
                <DialogContent className="flex flex-col items-center text-sm text-center">
                  <div className="cursor-pointer w-full text-[#ED4956] font-bold">
                    Unfollow
                  </div>
                  <div className="w-full cursor-pointer">Add to favorites</div>
                </DialogContent>
              </Dialog>
            </div>
            <hr />

            <div className="flex-1 p-4 overflow-y-auto max-h-96">
              <Comment />
            </div>

            <div className="flex-1 p-4 overflow-y-auto max-h-96">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={text}
                  onChange={handleSend}
                  placeholder="Add a comment..."
                  className="w-full p-2 text-sm border border-gray-300 rounded outline-none"
                />
                <Button
                  disabled={!text.trim()}
                  value={text}
                  // onChange={handleSend}
                  variant="outline"
                >
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
