import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
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
          alert("please fill all details")
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
            alert("user not found")
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
