import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { Redirect, BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./pages/Login";
import { authSelectors } from "./store/authSlice";
import { RootState } from "./store/store";
import { User } from "./interfaces/User";
import Home from "./pages/Home";
import NavigationBar from "./components/NavigationBar";

function App() {
  // const user = useSelector(authSelectors.user);
  const user = useSelector((state: RootState) => state.auth.username);
  console.log(user);

  return (
    <>
      <BrowserRouter>
        <NavigationBar />
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/submit">
          crete post
        </Route>
      </BrowserRouter>
    </>
    // <BrowserRouter>
    //   <Switch></Switch>
    // </BrowserRouter>
  );
}

export default App;
