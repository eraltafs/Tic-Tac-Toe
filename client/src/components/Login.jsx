import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
import { alertMsg } from "./alertmsg.component";
import "./alert.css";

function Login({ setIsAuth }) {
  const cookies = new Cookies();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // login functionality
  const login = () => {
    //checking for user registered or not
    Axios.post("https://tic-tac-toe-9o7w.onrender.com/login", {
      username,
      password,
    }).then((res) => {
      // if form is empty show alert
      if (username === "" || password === "") {
        alertMsg("please fill all details", "error");
      } else {
        // if user found set cookies and show game board
        const { token, firstName, lastName, username, userId } = res.data;
        if (token && firstName && lastName && username && userId) {
          cookies.set("token", token);
          cookies.set("userId", userId);
          cookies.set("username", username);
          cookies.set("firstName", firstName);
          cookies.set("lastName", lastName);
          setIsAuth(true);
        } else {
          // user not found alert
          alertMsg("user not found", "fail");
        }
      }
    });
  };
  return (
    // login form
    <div className="login">
      <label>Login</label>
      <input
        placeholder="Username"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button onClick={login}>Login</button>
    </div>
  );
}
export default Login;
