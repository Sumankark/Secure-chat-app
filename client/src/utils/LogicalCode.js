import { Center } from "@chakra-ui/react";

export const getSender = (loggedUser, users) => {
  return users[0]?._id === loggedUser?._id ? (
    <div
      style={{
        display: "flex",
        borderRadius: "20px",
        justifyContent: "left",
      }}
    >
      <img
        src={users[1].pic}
        alt=""
        style={{
          backgroundColor: "#ddddf7",
          height: "60px",
          width: "60px",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
      <div
        style={{
          margin: "10px",
          fontFamily: "sans-serif",
          fontWeight: "bolder",
        }}
      >
        {users[1].name}
      </div>
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        borderRadius: "20px",
        justifyContent: "left",
      }}
    >
      <img
        src={users[0].pic}
        alt=""
        style={{
          backgroundColor: "#ddddf7",
          height: "60px",
          width: "60px",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
      <div
        style={{
          margin: "10px",
          fontFamily: "sans-serif",
          fontWeight: "bolder",
        }}
      >
        {users[0].name}
      </div>
    </div>
  );
};

export const getSenderDetails = (loggedUser, users) => {
  return users[0]?._id === loggedUser?._id ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "20px",
        justifyContent: "center",
      }}
    >
      <img
        src={users[1].pic}
        alt=""
        style={{
          backgroundColor: "#ddddf7",
          justifyContent: "center",
          height: "200px",
          width: "200px",
          borderRadius: "50%",
          objectFit: "cover",
          margin: "50px",
        }}
      />
      <div
        style={{
          margin: "10px",
          fontFamily: "sans-serif",
          fontWeight: "bolder",
        }}
      >
        Name: {users[1].name}
      </div>
      <div
        style={{
          margin: "10px",
          fontFamily: "sans-serif",
          fontWeight: "bolder",
        }}
      >
        Email: {users[1].email}
      </div>
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        borderRadius: "20px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={users[0].pic}
        alt=""
        style={{
          backgroundColor: "#ddddf7",
          height: "60px",
          width: "60px",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />
      <div
        style={{
          margin: "10px",
          fontFamily: "sans-serif",
          fontWeight: "bolder",
          alignItems: "center",
        }}
      >
        {users[0].name}
      </div>
      <div
        style={{
          margin: "10px",
          fontFamily: "sans-serif",
          fontWeight: "bolder",
          alignItems: "center",
        }}
      >
        {users[0].email}
      </div>
    </div>
  );
};
