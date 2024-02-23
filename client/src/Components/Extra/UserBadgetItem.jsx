import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";

const UserBadgetItem = ({ user, handleFunction }) => {
  return (
    <div
      style={{
        backgroundColor: "lightgray",
        borderRadius: "10px",
        margin: "10px",
        cursor: "pointer",
        fontVariant: "solid",
        display: "flex",
        justifyContent: "space-between",
      }}
      onClick={handleFunction}
    >
      {user.name}
      <CancelIcon style={{ marginTop: "px" }}></CancelIcon>
    </div>
  );
};

export default UserBadgetItem;
