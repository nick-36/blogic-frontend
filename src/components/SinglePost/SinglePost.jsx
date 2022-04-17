import React from "react";
import "./SinglePost.css";
import { useLocation } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";

function SinglePost(props) {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getpost = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_PROD_SERVER_URL}posts/` + path
      );
      setPost(res.data);
    };
    getpost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_PROD_SERVER_URL}posts/${post._id}`,
        {
          data: { username: user.username },
        }
      );
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${process.env.REACT_APP_PROD_SERVER_URL}posts/${post._id}`,
        {
          username: user.username,
          title,
          desc,
        }
      );
      setPost({ ...post, title, desc });

      setUpdateMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="singlepost">
      {post.picture && (
        <img className="singlePostImage" src={post.picture} alt="" />
      )}
      <div className="singlePostInfo">
        {updateMode ? (
          <input
            type="text"
            className="singlePostTitleInput"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        ) : (
          <div className="editContainer">
            <span className="singlePostTitle">{post.title}</span>

            {post.username === user?.username && (
              <div className="Icons">
                <i
                  className="singlePostIcon iconEdit  fa-solid fa-pen-to-square"
                  onClick={() => {
                    setUpdateMode(true);
                  }}
                ></i>
                <i
                  className=" singlePostIcon iconDelete fa-solid fa-trash-can"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </div>
        )}
        <div className="author">
          <span className="authorName">
            Author:
            <Link className="link" to={`/?user=${post.username}`}>
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
        ) : (
          <p className="singlePostDescription">{post.desc}</p>
        )}
      </div>
      {updateMode && (
        <button
          className="singlePostUpdateBtn"
          type="submit"
          onClick={handleUpdate}
        >
          Update
        </button>
      )}
    </div>
  );
}

export default SinglePost;
