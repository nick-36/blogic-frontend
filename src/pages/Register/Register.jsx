import React from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import { useState } from "react";

import axios from "axios";

function Register(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username,
      email,
      password,
    };
    try {
      await axios.post("/auth/register", newUser);
      window.location.replace("/login");
    } catch (error) {
      console.log(error);
    }
  };
  // handleSubmit();

  return (
    <div className="register">
      <form className="registerForm" onSubmit={handleSubmit}>
        <h1 className="registerTitle">Register</h1>
        <label className="inputRegisterLabel" htmlFor="">
          Username
        </label>
        <input
          className="inputText"
          type="text"
          placeholder="Enter Your Username.."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="inputRegisterLabel" htmlFor="">
          Email
        </label>
        <input
          className="inputText"
          type="email"
          placeholder="Enter Your Email.."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="inputRegisterLabel" htmlFor="">
          Password
        </label>
        <input
          className="inputText"
          type="password"
          placeholder="Enter Your Password.."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn" type="submit">
          Register
        </button>
      </form>
      <button className="btn btnLogin">
        <Link className="link" to="/login">
          Login &#8594;
        </Link>
      </button>
    </div>
  );
}

export default Register;
