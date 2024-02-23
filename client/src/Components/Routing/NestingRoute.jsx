import React, { useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import ForgotPassword from "../Login/ForgotPassword";
import Login from "../Login/Login";
import Register from "../Login/Register";
import ResetPassword from "../Login/ResetPassword";
import UserVerify from "../Login/UserVerify";
import ChatArea from "../Pages/ChatArea";
import Home from "../Pages/Home";
import MyProfile from "../Pages/MyProfile";
import OnlineUser from "../Pages/OnlineUser";
import SearchUser from "../Pages/SearchUser";
import Welcome from "../Pages/Welcome";

const NestingRoute = () => {
  const [chat, setChat] = useState([
    {
      name: "Test1",
      lastMessage: "Last message test1",
      timeStamp: "today",
    },
    {
      name: "Test2",
      lastMessage: "Last message test2",
      timeStamp: "today",
    },
    {
      name: "Test3",
      lastMessage: "Last message test3",
      timeStamp: "today",
    },
  ]);
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              {/* <SideBar></SideBar> */}
              <Outlet></Outlet>
            </div>
          }
        >
          <Route index element={<Login></Login>}></Route>
          <Route path="register" element={<Register></Register>}></Route>

          <Route
            path="verify-email"
            element={<UserVerify></UserVerify>}
          ></Route>
          <Route
            path="forgot-password"
            element={<ForgotPassword></ForgotPassword>}
          ></Route>
          <Route
            path="reset-password"
            element={<ResetPassword></ResetPassword>}
          ></Route>

          <Route path="my-profile" element={<MyProfile></MyProfile>}></Route>
          <Route path="home" element={<Home></Home>}>
            <Route index element={<Welcome></Welcome>}></Route>
            <Route
              path="search-user"
              element={<SearchUser></SearchUser>}
            ></Route>
            <Route
              path="online-user"
              element={<OnlineUser></OnlineUser>}
            ></Route>
            <Route
              path="chat-area"
              element={<ChatArea props={chat[0]}></ChatArea>}
            ></Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default NestingRoute;
