import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { GlobalVariableContext } from "../../App";
import "./Auth.css";

const Login = () => {
  let navigate = useNavigate();
  let global = useContext(GlobalVariableContext);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();

    console.log("From is Submitted with data: ", data);

    try {
      let result = await axios({
        url: `http://localhost:8080/users/login`,
        method: `POST`,
        data: data,
      });
      let token = result.data.token;
      localStorage.setItem("token", token);
      global.setToken(token);

      navigate("/home");
    } catch (error) {

        toast.error("Email and Password doesn't match", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
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

        <Link to={"/forgot-password"}><b>Forgot Password?</b></Link>

      </form>
      <div>
        <br />
        <p>
          Don't have an account? <Link to={"/register"}>Register Here</Link>
        </p>
      </div>
      </div>
    </div> 
  );
};

export default Login;
