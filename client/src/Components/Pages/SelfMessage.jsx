import React from "react";
import "./Home.css";
import { timeFormat } from "../../utils/htmlDateFormat";

const SelfMessage = ({ message }) => {
  console.log(message);
  const formattedTime = timeFormat(new Date(message.createdAt));

  return (
    <div className="self-message-container">
      <div className="messageBox">
        <p className="c-lastMessage">{message.content}</p>
        <p className="c-timeStamp">{formattedTime}</p>
      </div>
    </div>
  );
};

export default SelfMessage;
