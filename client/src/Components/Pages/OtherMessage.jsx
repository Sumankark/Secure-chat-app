import React from "react";
import "./Home.css";
import { timeFormat } from "../../utils/htmlDateFormat";

const OtherMessage = ({ message, selectedChat }) => {
  console.log(message);
  const formattedTime = timeFormat(new Date(message.createdAt));
  return (
    <div className="other-message-container">
      <div className="chat-container">
        <p className="c-icon">
          {
            <img
              src={selectedChat.pic}
              alt="User Profile"
              style={{
                backgroundColor: "#ddddf7",
                height: "30px",
                width: "30px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          }
        </p>
        <div className="other-text-content">
          <p className="c-lastMessage">{message.content}</p>
          <p className="c-timeStamp">{formattedTime}</p>
        </div>
      </div>
    </div>
  );
};

export default OtherMessage;
