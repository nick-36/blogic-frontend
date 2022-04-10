import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Header from "../../components/Header/Header";
import Posts from "../../components/Posts/Posts";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Home.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

function Home(props) {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);

  return (
    <div>
      <Navbar />

      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </div>
  );
}

export default Home;
