import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { ChatState } from "../Context/ChatProvider";
import ChatItem from "../Pages/ChatItem";
import UserBadgetItem from "../Extra/UserBadgetItem";

const GroupChatModal = ({ handleClose }) => {
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [groupName, setGroupName] = useState("");
  const { user, chats, setChats } = ChatState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    handleClose(); // Close the modal using the provided prop function
  };

  const handleGroup = (addUser) => {
    if (selectedUsers.some((user) => user._id === addUser._id)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    setSelectedUsers([...selectedUsers, addUser]);
  };

  const handleDelete = (deleteUser) => {
    setSelectedUsers(
      selectedUsers.filter((user) => user._id !== deleteUser._id)
    );
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      setLoading(true);
      const result = await axios.get(
        `http://localhost:8080/users/search-user`,
        {
          params: { search: query },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLoading(false);
      setSearchResult(result.data);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const handleSubmit = async () => {
    if (!groupName || !selectedUsers.length) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    try {
      setLoading(true);
      const result = await axios.post(
        `http://localhost:8080/chats/group`,
        {
          name: groupName,
          users: selectedUsers.map((user) => user._id),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setChats([result.data, ...chats]);
      handleCloseModal(); // Close the modal after successful chat creation
      toast({
        title: "New Group Chat Created!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Failed to Create the Chat!",
        description: error.response?.data || "Unknown error occurred",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ gap: "10px" }}>
      <TextField
        label="Group Name"
        variant="outlined"
        fullWidth
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        style={{ marginTop: "20px" }}
      />
      <TextField
        label="Add Users eg: Ram, Sita"
        variant="outlined"
        fullWidth
        onChange={(e) => handleSearch(e.target.value)}
        style={{ marginTop: "30px" }}
      />
      <Box>
        {selectedUsers.map((user) => (
          <UserBadgetItem
            key={user._id}
            user={user}
            handleFunction={() => handleDelete(user)}
          />
        ))}
      </Box>
      {loading ? (
        <CircularProgress style={{ marginTop: "20px" }} />
      ) : (
        searchResult
          ?.slice(0, 4)
          .map((user) => (
            <ChatItem
              key={user._id}
              props={user}
              handleFunction={() => handleGroup(user)}
            />
          ))
      )}

      <DialogActions>
        <Button onClick={handleSubmit} color="primary">
          Create Group
        </Button>
      </DialogActions>
    </div>
  );
};

export default GroupChatModal;
