import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ChatItem from "./ChatItem";
import "./Home.css";
import { ChatState } from "../Context/ChatProvider";

const SearchUser = () => {
  let token = localStorage.getItem("token");
  const [search, setSearch] = useState("");
  const [chat, setChat] = useState([]);
  const [loadingChat, setLoadingChat] = useState();
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Updated state
  const { chats, setChats, setSelectedChat } = ChatState();

  let accessChat = async (userId) => {
    console.log(userId)
    try {
      setLoadingChat(true);
      const result = await axios({
        url: `http://localhost:8080/chats`,
        method: "POST",
        data: { userId },
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!chats.find((c) => c._id === result._id)) {
        setChats([result, ...chats]);
      }
      setSelectedChat(result);
      setLoadingChat(false);
      setIsSearchOpen(false);
    } catch (error) {
      
    }
  };

  let getProfile = async () => {
    try {
      let result = await axios({
        url: `http://localhost:8080/users/search-user?search=${search}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setChat(result.data);
    } catch (error) {}
  };
 
  return (
    <div className={`search-container ${isSearchOpen ? "open" : ""}`}>
      <div className="srh-search">
        <input
          placeholder="Search"
          className="search-box"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClick={() => setIsSearchOpen(true)}
        />
        <IconButton
          onClick={() => {
            getProfile();
          }}
        >
          <SearchIcon />
        </IconButton>
      </div>
      <div className="search-user">
        {chat?.map((user) => {
          
          return (
            <ChatItem
              props={user}
              key={user._id}
              handleFunction={() => {
                accessChat(user._id);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SearchUser;
