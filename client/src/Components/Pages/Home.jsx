import React, { useState } from "react";
import SideBar from "./SideBar";
import Welcome from "./Welcome";
import "./Home.css";
import ChatArea from "./ChatArea";
import { Outlet } from "react-router-dom";

const Home = () => {
  const [fetchAgain, setFetchAgain] = useState(false);

  const refreshSidebar = () => {
    setFetchAgain(!fetchAgain);
  };

  return (
    <div className="hm">
      <SideBar fetchAgain={fetchAgain}></SideBar>
      <Outlet></Outlet>
      {/* <Welcome></Welcome> */}
      {/* <ChatArea props={chat[0]}></ChatArea> */}
    </div>
  );
};

export default Home;
