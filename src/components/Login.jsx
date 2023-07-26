// Login.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./login.css";
import { useNavigate } from "react-router-dom";



const Login = ({ setAuthtoken, setUserId, setUserName }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      var bodyFormData = new FormData();
      bodyFormData.append("username", username);
      bodyFormData.append("password", password);

      const response = await axios({
        method: "POST",
        url: "http://127.0.0.1:8000/token",
        headers: {},
        data: bodyFormData,
      });

      localStorage.setItem("authtoken", response.data.access_token);
      localStorage.setItem("userId", response.data.user_id);
      localStorage.setItem("userName", response.data.user_name);

      setUsername("");
      setPassword("");

      setAuthtoken(localStorage.getItem("authtoken"));
      setUserId(localStorage.getItem("userId"));
      setUserName(localStorage.getItem("userName"));

      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // if (isAuthenticated) {
  //   // Redirect to the main content if the user is already logged in
  //   return <Redirect to="/" />;
  // }

  return (
    <div className="login-container pt-4  ">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="login-btn bg-gradient-to-r from-amber-400 to-red-500 hover:from-pink-500 hover:to-yellow-500 rounded mt-2" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};
export const isLoggedIn = () => {
  return localStorage.getItem("authtoken") !== null;
};

export const getUserInfo = () => {
  return {
    access_token: localStorage.getItem("authtoken"),

    user_id: localStorage.getItem("userId"),

    username: localStorage.getItem("userName"),
  };
};

export default Login;
