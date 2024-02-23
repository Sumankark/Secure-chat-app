// Login.jsx

import { Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { GlobalVariableContext } from "../../App";

const ForgotPassword = () => {
  const [data, setData] = useState({
    email: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    // Your login logic goes here
    console.log("Form submitted with data:", data);

    try {
      let result = await axios({
        url: `http://localhost:8080/users/forgot-password`,
        method: `POST`,
        data: data,
      });

      setData({
        email: "",
      });

      toast(
        "A link has sent to your email. Please click to link to reset password."
      );
    } catch (error) {
      toast.error("Email doesn't match", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="Auth-container">
      <ToastContainer></ToastContainer>
      <div className="Auth-content">
        <h1>Enter your Email</h1>
        <form onSubmit={loginUser} className="login-form">
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            variant="outlined"
            margin="normal"
            value={data.email}
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
            sx={{ width: "100%", height: "50px" }}
          />

          <Button type="submit" variant="outlined" className="btn">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
