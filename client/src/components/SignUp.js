import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
import { alertMsg } from "./alertmsg.component";
import "./alert.css"
function SignUp({ setIsAuth }) {
  const cookies = new Cookies();
  const [user, setUser] = useState(null);

  const sign = () => {
    if (user) {
      if (
        !user.firstName ||
        !user.lastName ||
        !user.username ||
        !user.password
      ) {
        alertMsg("please fill all details","error");
      } else {
        Axios.post("https://beautiful-tick-leotard.cyclic.app/signup", user).then((res) => {
          const {
            token,
            userId,
            firstName,
            lastName,
            username,
            hashedPassword,
          } = res.data;
          if (
            token &&
            userId &&
            firstName &&
            lastName &&
            username &&
            hashedPassword
          ) {
            cookies.set("token", token);
            cookies.set("userId", userId);
            cookies.set("firstName", firstName);
            cookies.set("lastName", lastName);
            cookies.set("username", username);
            cookies.set("hashedPassword", hashedPassword);
            setIsAuth(true);
          }
        });
      }
    } else {
      alertMsg("form can't be empty","error");
    }
  };
  return (
    <div className="signUp">
      <label>Sign Up</label>
      <input
        placeholder="First Name"
        onChange={(event) => {
          setUser({ ...user, firstName: event.target.value });
        }}
      />

      <input
        placeholder="Last Name"
        onChange={(event) => {
          setUser({ ...user, lastName: event.target.value });
        }}
      />

      <input
        placeholder="Username"
        onChange={(event) => {
          setUser({ ...user, username: event.target.value });
        }}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(event) => {
          setUser({ ...user, password: event.target.value });
        }}
      />

      <button onClick={sign}>Sign Up</button>
    </div>
  );
}

export default SignUp;
