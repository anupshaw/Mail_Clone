import React from "react";
import { useDispatch } from "react-redux";
import "./CSS/login.css";
import { userAction } from "./features/userSlice";
import { auth, provider } from "./firebase";

function Login() {
const dispatch=useDispatch();
  const login=()=>{
    auth.signInWithPopup(provider).then(({user})=>{
      dispatch(userAction.signin({
        displayName:user.displayName,
        photoURL:user.photoURL,
        email:user.email
      }))
    }).catch(error=>{
      alert(error)
    })
  }
  return (
    <div className="loginwrapper">
      <div className="login">
        <img
          src="https://blog.logomyway.com/wp-content/uploads/2021/02/gmail-logo.jpg"
          alt="abc"
        ></img>

        <button className="gmail-login" onClick={login}>Login with Gmail</button>
      </div>
    </div>
  );
}

export default Login;
