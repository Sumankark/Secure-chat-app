import React, { useState } from "react";
import SideBar from "./SideBar";
import Welcome from "./Welcome";
import "./Home.css";
import ChatArea from "./ChatArea";
import { Outlet } from "react-router-dom";

const Home = () => {
  const[fetchAgain, setFetchAgain] = useState(false)
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
    <div className="hm">
      <SideBar></SideBar>
      <Outlet></Outlet>
      {/* <Welcome></Welcome> */}
      {/* <ChatArea props={chat[0]}></ChatArea> */}
    </div>
  );
};

export default Home;
