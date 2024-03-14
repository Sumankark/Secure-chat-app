import React, { useState } from "react";
import SideBar from "./SideBar";
import Welcome from "./Welcome";
import "./Home.css";
import ChatArea from "./ChatArea";
import { Outlet } from "react-router-dom";

const Home = () => {

  return (
    <div className="hm">
      <SideBar></SideBar>
      <Outlet></Outlet>
      {/* <Welcome></Welcome> */}
      {/* <ChatArea props={chat[0]}></ChatArea> */}
    </div>
  );
};

export default Home;
