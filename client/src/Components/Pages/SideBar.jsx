import GroupAddRoundedIcon from "@mui/icons-material/GroupAddRounded";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatItem from "./ChatItem";
import "./Home.css";
import { ChatState } from "../Context/ChatProvider";
import { getSender } from "../../utils/LogicalCode";
import { toast } from "react-toastify";
import GroupChatModal from "../Modal/GroupChatModal";

const SideBar = ({ fetchAgain }) => {
  let navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const [chat, setChat] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  let token = localStorage.getItem("token");
  let [profile, setProfile] = useState({});

  let getProfile = async () => {
    try {
      let result = await axios({
        url: `http://localhost:8080/users/my-profile`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(result.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getProfile();
  }, []);

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      let result = await axios({
        url: `http://localhost:8080/chats`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setChats(result.data.data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(localStorage.getItem("token"));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  

  return (
    <>
      <div className="sb-container">
        <div className="sb-header">
          <div>
            <IconButton onClick={handleProfileMenuOpen}>
              <img src={profile.pic} alt="" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileMenuClose}
            >
              <MenuItem
                onClick={() => {
                  navigate("/my-profile");
                }}
              >
                {/* Add your profile options here */}
                My Profile
              </MenuItem>
              <MenuItem>Log Out</MenuItem>
            </Menu>
          </div>
          <div>
            <IconButton onClick={handleModalOpen}>
              <GroupAddRoundedIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                navigate("/home/search-user");
              }}
            >
              <PersonAddIcon></PersonAddIcon>
            </IconButton>
          </div>
        </div>
        <div className="sb-search">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <input placeholder="Search" className="search-box" />
        </div>
        <div className="sb-user">
          {/* Display Send New Message users */}
          {chats
            ?.slice()
            .reverse()
            .map((chat) => {
              if (!chat.latestMessage) {
                return (
                  <div
                    key={chat._id}
                    onClick={() => {
                      setSelectedChat(chat);
                      navigate("/home/chat-area");
                    }}
                    style={{
                      cursor: "pointer",
                      backgroundColor:
                        selectedChat === chat ? "#4caf50" : "#F5F5F5",
                      color: selectedChat === chat ? "white" : "black",
                      padding: "12px",
                      borderRadius: "8px",
                      marginBottom: "8px",
                    }}
                  >
                    <div>
                      {!chat.isGroupChat ? (
                        chat.users &&
                        Array.isArray(chat.users) &&
                        chat.users.length > 0 ? (
                          getSender(profile, chat.users)
                        ) : null
                      ) : (
                        <div
                          style={{
                            cursor: "pointer",
                            backgroundColor:
                              selectedChat === chat ? "#4caf50" : "#F5F5F5",
                            color: selectedChat === chat ? "white" : "black",
                            padding: "12px",
                            borderRadius: "8px",
                            marginBottom: "8px",
                            fontFamily: "sans-serif",
                            fontWeight: "bolder",
                            marginLeft: "10px",
                            fontSize: "18px",
                          }}
                        >
                          {chat.chatName}
                        </div>
                      )}
                    </div>
                    {chat.latestMessage && (
                      <div
                        style={{
                          fontSize: "12px",
                          marginTop: "-20px",
                          justifyContent: "left",
                        }}
                      >
                        {chat.latestMessage.content.length > 50
                          ? chat.latestMessage.content.substring(0, 51) + "..."
                          : chat.latestMessage.content}
                      </div>
                    )}
                  </div>
                );
              }
              return null; // Ignore chats with latest messages
            })}
          {/* Display other chats */}
          {chats
            ?.slice()
            .reverse()
            .sort((a, b) =>
              a.latestMessage && b.latestMessage
                ? new Date(b.latestMessage.createdAt) -
                  new Date(a.latestMessage.createdAt)
                : 0
            )
            .map((chat) => {
              if (chat.latestMessage) {
                return (
                  <div
                    key={chat._id}
                    onClick={() => {
                      setSelectedChat(chat);
                      navigate("/home/chat-area");
                    }}
                    style={{
                      cursor: "pointer",
                      backgroundColor:
                        selectedChat === chat ? "#4caf50" : "#F5F5F5",
                      color: selectedChat === chat ? "white" : "black",
                      padding: "12px",
                      borderRadius: "8px",
                      marginBottom: "8px",
                    }}
                  >
                    <div>
                      {!chat.isGroupChat ? (
                        chat.users &&
                        Array.isArray(chat.users) &&
                        chat.users.length > 0 ? (
                          getSender(profile, chat.users)
                        ) : null
                      ) : (
                        <div
                          style={{
                            cursor: "pointer",
                            backgroundColor:
                              selectedChat === chat ? "#4caf50" : "#F5F5F5",
                            color: selectedChat === chat ? "white" : "black",
                            padding: "12px",
                            borderRadius: "8px",
                            marginBottom: "8px",
                            fontFamily: "sans-serif",
                            fontWeight: "bolder",
                            marginLeft: "10px",
                            fontSize: "18px",
                          }}
                        >
                          {chat.chatName}
                        </div>
                      )}
                    </div>
                    {chat.latestMessage && (
                      <div
                        style={{
                          fontSize: "12px",
                          marginTop: "-20px",
                          justifyContent: "left",
                        }}
                      >
                        {chat.latestMessage.content.length > 50
                          ? chat.latestMessage.content.substring(0, 51) + "..."
                          : chat.latestMessage.content}
                      </div>
                    )}
                  </div>
                );
              }
              return null; // Ignore chats without latest messages
            })}
        </div>
      </div>

      <Dialog open={openModal} onClose={handleModalClose}>
        <DialogTitle
          style={{
            fontSize: "40px",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            display: "flex",
            fontWeight: "bolder",
          }}
        >
          Create Group Chat
        </DialogTitle>
        <DialogContent>
          {/* Use the GroupChatModal component */}
          <GroupChatModal handleClose={handleModalClose} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SideBar;
