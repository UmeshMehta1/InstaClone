import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { GoHeartFill } from "react-icons/go";
import CommentDialog from "./CommentDialog";
import { useSelector } from "react-redux";

const Post = ({ post }) => {
  // console.log(post);
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const onChangeHandler = (e) => {
    const InputVal = e.target.value;

    if (InputVal.trim()) {
      setText(InputVal);
    } else {
      setText("");
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto my-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="" alt="postImg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h1>{post.author.username}</h1>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent
            onInteractOutside={() => setOpen(false)}
            className="flex flex-col items-center text-sm text-center"
          >
            <span
              variant="ghost"
              className="cursor-pointer w-fit font-bold text-[#ED4956]"
            >
              Unfollow
            </span>

            <span variant="ghost" className="cursor-pointer w-fit ">
              Add to favorites
            </span>

            {user && user._id === post?.author._id && (
              <span variant="ghost" className="cursor-pointer w-fit ">
                Delete
              </span>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <img
        className="object-cover w-full rounded-sm aspect-square"
        src={post.image}
        alt="postImg"
      />
      <div className="flex justify-between my-3">
        <div className="flex items-center justify-between gap-3">
          <GoHeartFill size={"25px"} />
          <MessageCircle
            onClick={() => setOpen(true)}
            className="cursor-pointer hover:text-gray-600"
          />
          <Send className="cursor-pointer hover:text-gray-600" />
        </div>
        <Bookmark className="cursor-pointer hover:text-gray-600" />
      </div>
      <span className="block mb-2 font-medium">2k likes</span>
      <p>
        <span className="mr-2 font-medium">{post.author.username}</span>
        {post.caption}
      </p>
      <span onClick={() => setOpen(true)}>vieew all 10 comments</span>

      <CommentDialog open={open} setOpen={setOpen} />

      <div className="flex justify-between">
        <input
          type="text"
          value={text}
          onChange={onChangeHandler}
          placeholder="Add a comment"
          className="w-full text-sm outline-none"
        />

        {text && <span className="text-[#3BADF8]">Post</span>}
      </div>
    </div>
  );
};

export default Post;
