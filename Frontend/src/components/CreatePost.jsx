import React, { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { readFileAsDataURL } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import axios from "axios";

const CreatePost = ({ open, setOpen }) => {
  const imageRef = useRef();
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setFile(file);
      const dataUrl = await readFileAsDataURL(file);
      setImagePreview(dataUrl);
    }
  };

  const createPostHandler = async (e) => {
    // e.preventDefault();
    const formData = new FormData();
    formData.append("caption", caption);

    if (imagePreview) formData.append("image", file);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:3000/api/v1/post/addpost",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        setCaption(""); // Clear the caption
        setFile(null); // Clear the file
        setImagePreview(""); // Clear the image preview
        setOpen(false); // Close the dialog
      }
    } catch (error) {
      const errorMsg = error?.response?.data?.message || "An error occurred";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => setOpen(false)}>
        <DialogHeader>Create New Post</DialogHeader>

        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="" alt="imgcreate" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xs font-semibold">username</h1>
            <span className="text-xs text-gray-600">Bio here...</span>
          </div>
        </div>

        <Textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="border-none focus-visible:ring-transparent"
          placeholder="Write a caption..."
        />

        {imagePreview && (
          <div className="flex items-center justify-center w-full h-64">
            <img
              className="object-cover w-full h-full"
              src={imagePreview}
              alt="preview_img"
            />
          </div>
        )}

        <input
          ref={imageRef}
          type="file"
          onChange={fileChangeHandler}
          className="hidden"
        />

        <button
          onClick={() => imageRef.current.click()}
          className="w-fit p-2 rounded-md text-center mx-auto hover:bg-[#3979a4] bg-[#0095F6]"
        >
          Select from computer
        </button>

        {imagePreview &&
          (loading ? (
            <Button disabled>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              onClick={createPostHandler}
              type="submit"
              className="w-full"
            >
              Post
            </Button>
          ))}
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
