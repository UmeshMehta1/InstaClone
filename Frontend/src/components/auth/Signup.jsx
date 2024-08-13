import React from "react";
import Form from "./Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const handleRegister = async (input) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/register",
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <Form type="register" onSubmit={handleRegister} />;
};

export default Signup;
