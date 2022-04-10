import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useContext } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

function Login(props) {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch } = useContext(Context);
  const [error, setError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`/auth/login`, {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      window.location.replace("/");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
      setError(true);
    }
  };

  return (
    <div className="login">
      <form className="loginForm" onSubmit={handleSubmit}>
        <h1 className="loginTitle">Login</h1>
        <label className="inputLoginLabel" htmlFor="">
          Username
        </label>
        <input
          className="inputText"
          type="text"
          ref={userRef}
          placeholder="Enter your username.."
        />
        <label className="inputLoginLabel" htmlFor="">
          Password
        </label>
        <input
          className="inputText"
          type="password"
          ref={passwordRef}
          placeholder="Enter your password..."
        />
        <button className="loginBtn" type="submit">
          Login
        </button>
        {error && <p className="errorMsg">Something went wrong</p>}
      </form>
      <button className="registerBtn">
        <Link className="link" to="/register">
          Register &#8594;
        </Link>
      </button>
    </div>
  );
}

export default Login;
