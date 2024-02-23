import axios from "axios";
import React, { useEffect, useState } from "react";
import htmlDateFormat from "../../utils/htmlDateFormat";

const MyProfile = () => {
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
  return (
    <div
      className="my-profile"
      style={{
        display: "flex",
        gap: "50px",
        justifyContent: "center",
        alignItems: "center",
        margin: "100px",
      }}
    >
      <div>
        <img
          src={profile.pic}
          alt="User Profile"
          style={{
            backgroundColor: "#ddddf7",
            height: "500px",
            width: "500px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </div>

      <div className="dtl">
        <h1>
          <b>Name: </b> {profile.name}
        </h1>
        <p>
          <b>Gender: </b> {profile.gender}
        </p>
        <p>
          <b>Date of Birth: </b> {htmlDateFormat(profile.dob)}
        </p>
        <p>
          <b>Phone Number: </b> {profile.phoneNumber}
        </p>
      </div>
     
    </div>
  );
};

export default MyProfile;
