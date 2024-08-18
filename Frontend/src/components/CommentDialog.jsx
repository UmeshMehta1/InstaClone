import React, { useState } from "react";
// import { Dialog, DialogTrigger, DialogContent } from "@radix-ui/react-dialog";
import { MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import Comment from "./Comment";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

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
      <DialogContent onInteractOutside={() => setOpen(false)}>
        <h1>Comment Dialog</h1>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
