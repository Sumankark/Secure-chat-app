import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ChatState } from "../Context/ChatProvider";

const UserVerify = () => {
  let [query] = useSearchParams();
  let token = query.get("token");
  let navigate = useNavigate();
  const { setUser } = ChatState();

  let verifyEmail = async () => {
    try {
      let result = await axios({
        url: "http://localhost:8080/users/verify-user",
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(result);
      navigate("/");
    } catch (error) {}
  };

  useEffect(() => {
    verifyEmail();
  }, []);

  return <div></div>;
};

export default UserVerify;
