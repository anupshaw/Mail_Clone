import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";
import { userAction } from "./features/userSlice";
import "./App.css";
import Compose from "./Compose";
import Emaildetail from "./Emaildetail";
import EmailList from "./EmailList";
import { auth } from "./firebase";
import Header from "./Header";
import Login from "./Login";
import Sidebar from "./Sidebar";

function App() {
  const isMessageOpen = useSelector((state) => state.mail.sendMessageIsOpen);
  const user=useSelector((state)=>state.user.value);
  const dispatch=useDispatch();

  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      if(user){
        dispatch(userAction.signin({
          displayName:user.displayName,
          photoURL:user.photoURL,
          email:user.email
        }))
      }else{
        dispatch(userAction.signout())
      }
    })
  },[])
  return (
    <>
      {user && (
        <div className="App">
          <Header />
          <div className="app_body">
            <Sidebar />
            <Switch>
              <Route exact path="/">
                <EmailList />
              </Route>
              <Route path="/mail">
                <Emaildetail />
              </Route>
            </Switch>
          </div>
          {isMessageOpen && <Compose />}
        </div>
      )}
      {!user && <Login />}
    </>
  );
}

export default App;
