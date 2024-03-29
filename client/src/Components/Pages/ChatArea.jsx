import CallIcon from "@mui/icons-material/Call";
import InfoIcon from "@mui/icons-material/Info";
import SendIcon from "@mui/icons-material/Send";
import VideocamIcon from "@mui/icons-material/Videocam";
import { Divider, Drawer, IconButton } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { getSender, getSenderDetails } from "../../utils/LogicalCode";
import { ChatState } from "../Context/ChatProvider";
import UpdateGroupChat from "../Modal/UpdateGroupChat";
import OtherMessage from "./OtherMessage";
import SelfMessage from "./SelfMessage";
import { useSocketContext } from "../Context/SocketContext";
import { decryptMessage, encryptMessage } from "../encryption/AES";

const ChatArea = ({ fetchAgain, setFetchAgain }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { selectedChat, user } = ChatState();
  let token = localStorage.getItem("token");
  let [profile, setProfile] = useState({});
  const { socket } = useSocketContext();

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };

  const fetchChatsCallback = () => {
    setFetchAgain(!fetchAgain);
  };

  const messageContainerRef = useRef(null);

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

  const sendMessage = async () => {
    if (newMessage) {
      try {
        const encryptedMessage = encryptMessage(newMessage);

        let result = await axios({
          url: `http://localhost:8080/messages`,
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: {
            content: encryptedMessage,
            chatId: selectedChat._id,
          },
        });
        console.log(result);
        setMessages([...messages, result.data]);

        setNewMessage("");
        fetchChatsCallback();
      } catch (error) {
        toast({
          title: "Error Occurred!",
          description: "Failed to send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  const getMessages = async () => {
    if (!selectedChat) {
      return;
    }
    try {
      setLoading(true);
      let result = await axios({
        url: `http://localhost:8080/messages/${selectedChat._id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const decryptedMessages = result.data.map((message) => ({
        ...message,
        content: decryptMessage(message.content),
      }));
      setMessages(decryptedMessages);

      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to fetch the messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      setMessages([...messages, newMessage]);
    });
    getMessages();

    return () => socket?.off("newMessage");
  }, [selectedChat, fetchAgain, newMessage, socket, messages]);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  };

  const sender = selectedChat?.users
    ? getSender(profile, selectedChat?.users)
    : null;

  const senderDetail = selectedChat?.users
    ? getSenderDetails(profile, selectedChat?.users)
    : null;

  return (
    <div className="ca">
      <div className="chat-header">
        <div className="header-text">
          {!selectedChat?.isGroupChat ? (
            <>{sender}</>
          ) : (
            <>
              <div
                style={{
                  textAlign: "center",
                  fontFamily: "sans-serif",
                  fontWeight: "bolder",
                  margin: "10px",
                  fontSize: "30px",
                }}
              >
                {selectedChat.chatName}
              </div>
            </>
          )}
        </div>
        <div>
          <IconButton>
            <CallIcon />
          </IconButton>
          <IconButton>
            <VideocamIcon />
          </IconButton>
          <IconButton variant="contained" onClick={() => setOpen(true)}>
            <InfoIcon />
          </IconButton>
          <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
            {!selectedChat?.isGroupChat ? (
              <>{senderDetail}</>
            ) : (
              <>
                <div
                  style={{
                    textAlign: "center",
                    fontFamily: "sans-serif",
                    fontWeight: "bolder",
                    margin: "10px",
                    fontSize: "30px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {selectedChat.chatName}
                  <button
                    onClick={() => {
                      <UpdateGroupChat></UpdateGroupChat>;
                    }}
                  >
                    Update Group
                  </button>
                </div>
              </>
            )}
            <Divider />
          </Drawer>
        </div>
      </div>
      <div ref={messageContainerRef} className="message-container">
        {/* Render your messages here */}
        {messages.map((message) =>
          message.sender._id === profile._id ? (
            <SelfMessage key={message._id} message={message} />
          ) : (
            <OtherMessage
              key={message._id}
              message={message}
              selectedChat={selectedChat}
            />
          )
        )}
      </div>
      <div className="text-input-area">
        <input
          placeholder="Type a message"
          className="search-box"
          style={{ width: "100%" }}
          value={newMessage}
          onChange={typingHandler}
        />
        <IconButton onClick={sendMessage}>
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default ChatArea;
