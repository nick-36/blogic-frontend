import React from "react";
import "./Single.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import SinglePost from "../../components/SinglePost/SinglePost";
function Single(props) {
  return (
    <div className="single">
      <SinglePost />
      <Sidebar />
    </div>
  );
}

export default Single;
