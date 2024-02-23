import React from "react";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../Context/ChatProvider";

const ChatItem = ({ props, handleFunction }) => {
  let token = localStorage.getItem("token");
  let navigate = useNavigate();

  return (
    <div
      className="chat-container"
      onClick={handleFunction}
      style={{
        display: "flex",
        borderRadius: "20px",
        backgroundColor: "greenyellow",
        height: "50px",
        gap: "10px",
        color: "white",
      }}
    >
      <p className="c-icon">
        {
          <img
            src={props.pic}
            alt=""
            style={{
              backgroundColor: "#ddddf7",
              height: "40px",
              width: "40px",
              borderRadius: "50%",
              objectFit: "cover",
              marginTop: "-9px",
            }}
          />
        }
      </p>
      <p
        className="c-name"
        style={{ marginTop: "15px", marginLeft: "10px", color: "white" }}
      >
        {props?.name}
      </p>
    </div>
  );
};

export default ChatItem;
