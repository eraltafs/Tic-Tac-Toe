import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";

function SignUp({setIsAuth}) {
  const cookies = new Cookies();
  const [user, setUser] = useState(null);

  const sign = ()=>{

    Axios.post("https://dead-pink-parrot-vest.cyclic.app/signup",user).then(res=>{
      const {token,userId,firstName,lastName,username,hashedPassword} = res.data

      cookies.set('token',token);
      cookies.set('userId',userId);
      cookies.set('firstName',firstName);
      cookies.set('lastName',lastName);
      cookies.set('username',username);
      cookies.set('hashedPassword',hashedPassword);
      setIsAuth(true);
    });

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
