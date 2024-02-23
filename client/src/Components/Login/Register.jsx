import { Button, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./Auth.css";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    dob: "",
    phoneNumber: "",
    gender: "",
    email: "",
    password: "",
    roles: "superAdmin",
  });

  const register = async (e) => {
    e.preventDefault();

    console.log("From is Submitted with data: ", data);

    try {
      let result = await axios({
        url: `http://localhost:8080/users`,
        method: `POST`,
        data: data,
      });
      console.log(result);

      setData({
        name: "",
        dob: "",
        phoneNumber: "",
        gender: "",
        email: "",
        password: "",
      });
    } catch (error) {}
  };

  let genderOptions = [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
    {
      label: "Other",
      value: "other",
    },
  ];

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="Auth-container">
      <ToastContainer></ToastContainer>
      <div className="Auth-content">
        <h1>Register your Account</h1>
        <form onSubmit={register} className="register-form">
          <TextField
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            margin="normal"
            value={data.name}
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
            sx={{ width: "100%", height: "50px" }}
          />
          <TextField
            id="dob"
            name="dob"
            label="Date of Birth"
            variant="outlined"
            margin="normal"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={data.dob}
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
            sx={{ width: "100%", height: "50px" }}
          />
          <TextField
            id="phoneNumber"
            name="phoneNumber"
            label="Phone Number"
            variant="outlined"
            type="tel"
            margin="normal"
            value={data.phoneNumber}
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
            sx={{ width: "100%", height: "50px" }}
          />
          <TextField
            id="gender"
            name="gender"
            select
            label="Gender"
            variant="outlined"
            margin="normal"
            value={data.gender}
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
            fullWidth
          >
            {genderOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
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

          <Button
            type="submit"
            variant="outlined"
            className="
        btn"
          >
            Sign up
          </Button>
        </form>
        <div>
          <p>
            Already have an account? <Link to={"/"}>Login Here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
