import { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/Home";
import CreatePostPage from "./pages/CreatePostPage/CreatePostPage";
import Layout from "./components/Layout";
import Hot from "./pages/Hot/Hot";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import SubredditPage from "./pages/SubredditPage/SubrredditPage";
import CreateCommunityPage from "./pages/CreateCommunityPage/CreateCommunityPage";
import New from "./pages/New/New";
import EditSubreddit from "./pages/EditSubreddit/EditSubreddit";
import Best from "./pages/Best/Best";
import { checkToken } from "./store/authSlice";
import { useAppDispatch } from "./store/store";
import EditPost from "./pages/EditPost/EditPost";
// import Profile from "./pages/Profile/Profile";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkToken())
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      <div style={{ backgroundColor: "#dae0e6", height: "100vh" }}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Layout>
                <New />
              </Layout>
            </Route>
            {/* <Route exact path="/:user_id">
              <Profile />
            </Route> */}
            <Route path="/hot">
              <Layout>
                <Hot />
              </Layout>
            </Route>
            <Route path="/best">
              <Layout>
                <Best />
              </Layout>
            </Route>
            <Route path="/post/:post_id/edit">
              <EditPost />
            </Route>
            <Route exact path="/submit">
              <NavigationBar />
              <CreatePostPage />
            </Route>
            <Route exact path="/subreddit/:subredditId/:subredditName">
              <SubredditPage />
            </Route>
            <Route exact path="/subreddit/:subredditId/:subredditName/edit">
              <EditSubreddit />
            </Route>
            <Route exact path="/create-community">
              <NavigationBar />
              <CreateCommunityPage />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
