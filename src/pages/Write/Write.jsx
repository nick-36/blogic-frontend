import React from "react";
import { useContext } from "react";
import { useState } from "react";
// import InputImage from "../../assets/SinglePost-1.jpeg";
import "./Write.css";
import { Context } from "../../context/Context";
import axios from "axios";

function Write(props) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const Data = new FormData();
      Data.append("upload_preset", "ml_default");
      Data.append("file", file);
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_PROD_UPLOAD_URL}`,
          Data
        );
        newPost.picture = res.data.secure_url;
        newPost.cloudinary_id = res.data.public_id;
      } catch (error) {}
    }
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_PROD_SERVER_URL}posts`,
        newPost
      );
      console.log(res.data);
      window.location.replace("/post/" + res.data._id);
    } catch (error) {}
  };

  return (
    <div className="write">
      <form className="writeForm" onSubmit={handleSubmit}>
        {file && (
          <img
            className="writeImage"
            src={URL.createObjectURL(file)}
            alt="selected img"
          />
        )}
        <div className="writeFormGroup">
          <label className="fileInputLabel" htmlFor="fileInput">
            <i className=" writeIcon fa-solid fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            name="picture"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            className="writeTextTitle writeText"
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeTextDesc writeText"
            placeholder="write your story..."
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <button className="btn writeSubmit " type="submit">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}

export default Write;
