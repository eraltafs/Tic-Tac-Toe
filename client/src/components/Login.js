import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
import { alertMsg } from "./alertmsg.component";
import "./alert.css"
function Login({setIsAuth}) {
   const cookies = new Cookies();
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const login = ()=>{

      Axios.post("https://beautiful-tick-leotard.cyclic.app/login",{
        username,
        password
      }).then(res=>{
        if(username===""||password===""){
          alertMsg("please fill all details","error")
        }else{

          const {token,firstName,lastName,username,userId} = res.data;
          if(token&&firstName&&lastName&&username&&userId){
            cookies.set('token',token);
            cookies.set('userId',userId);
            cookies.set('username',username);
            cookies.set('firstName',firstName);
            cookies.set('lastName',lastName);
            setIsAuth(true);  
    
          }else{
            alertMsg("user not found","fail")
          }
        }

    });

    };
  return (
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
