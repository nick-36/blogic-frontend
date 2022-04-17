import React from "react";
import "./Post.css";

import { Link } from "react-router-dom";
function Post({ post }) {
  return (
    <div className="post">
      {post.picture && (
        <img className="postImage" src={post.picture} alt="post_picture" />
      )}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c) => {
            return (
              <span key={c._id} className="postCatItem">
                {c.name}
              </span>
            );
          })}
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <h3 className="postTitle">{post.title}</h3>
        </Link>
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
        <p className="postDescription">{post.desc}</p>
      </div>
    </div>
  );
}

export default Post;
