import React from "react";
import Form from "./Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async (input) => {
    const res = await axios.post(
      "http://localhost:3000/api/v1/user/login",
      input
    );

    if (res.data.success) {
      dispatch(setAuthUser(res.data.user));
      navigate("/");
    }
  };
  return (
    <>
      <Form type="login" onSubmit={handleLogin} />;
    </>
  );
};

export default Login;
