// Login.jsx

import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./Auth.css";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();
  const [data, setData] = useState({
    password: "",
  });
  let [params] = useSearchParams();
  let token = params.get("token");

  const loginUser = async (e) => {
    e.preventDefault();
    // Your login logic goes here
    console.log("Form submitted with data:", data);

    try {
      let result = await axios({
        url: `http://localhost:8080/users/reset-password`,
        method: `POST`,
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData({
        password: "",
      });

      navigate("/");
    } catch (error) {
      toast.error("Unable to login", {
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
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="Auth-container">
      <ToastContainer></ToastContainer>
      <div className="Auth-content">
        <h1>Login your Account</h1>
        <form onSubmit={loginUser} className="login-form">
          <div className="pwd-btn">
            <TextField
              id="password"
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              variant="outlined"
              value={data.password}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.value })
              }
              style={{ width: "350px" }}
            />
            <button type="button" onClick={handleTogglePassword}>
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <Button type="submit" variant="outlined" className="btn">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
