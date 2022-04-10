import React, { useEffect } from "react";
import "./Settings.css";
import Sidebar from "../../components/Sidebar/Sidebar";
// import ProfileImage from "../../assets/person.jpeg";
import { useState } from "react";
import { useContext } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
function Settings(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [success, setSucces] = useState(false);

  const { user, dispatch } = useContext(Context);

  const PF = `${process.env.REACT_APP_PROD_IMAGE_URL}images/`;

  useEffect(() => {
    setUsername(user.username);
    setEmail(user.email);
    setPassword(user.password);
  }, [user.username, user.email, user.password]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });

    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const Data = new FormData();
      const fileName = Date.now() + file.name;
      Data.append("name", fileName);
      Data.append("file", file);
      updatedUser.profilePic = fileName;
      try {
        await axios.post(
          `${process.env.REACT_APP_PROD_SERVER_URL}upload`,
          Data
        );
      } catch (error) {
        console.log(error);
      }
    }

    try {
      const res = await axios.put(
        `${process.env.REACT_APP_PROD_SERVER_URL}users/${user._id}`,
        updatedUser
      );
      setSucces(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="userProfile">
          <span className="updateProfile">Update Youre Profile</span>
          <span className="deleteProfile">Delete Account</span>
        </div>
        <span className="profileImage">
          <img
            className="userImage"
            src={file ? URL.createObjectURL(file) : PF + user.profilePic}
            alt="profileImage"
          />

          <label htmlFor="updateProfileImage">
            <i className=" editProfileIcon fa-solid fa-circle-user"></i>
          </label>
          <input
            type="file"
            id="updateProfileImage"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
        </span>
        <div className="editUserInfo">
          <label className="settingsInputLabel">Username</label>
          <input
            className="userNameText settingsInput "
            type="text"
            value={username}
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="settingsInputLabel">Email</label>

          <input
            className="userNameEmail  settingsInput"
            type="email"
            placeholder={user.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="settingsInputLabel">Password</label>

          <input
            className="userNamePassword  settingsInput"
            type="password"
            placeholder="***"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="settingsSubmit"
            type="submit"
            onClick={handleSubmit}
          >
            Update
          </button>
          {success && (
            <h3 className="successMsg">Profile Update Successfully</h3>
          )}
        </div>
      </div>
      <Sidebar />
    </div>
  );
}

export default Settings;
