import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "./pages/Home";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import CreatePostPage from "./pages/CreatePostPage/CreatePostPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <NavigationBar />
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/submit">
          <CreatePostPage />
        </Route>
      </BrowserRouter>
    </>
  );
}

export default App;
