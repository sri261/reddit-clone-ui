import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import "./pages.css";
import { useAppDispatch } from "../store/store";
import Post from "../components/Post/Post";
import CheckAuth from "../components/CheckAuth";
import { authSelectors } from "../store/authSlice";
// import { getGeneralLatestPosts, postsSelector } from "../store/postSlice";

function Home() {
  const dispatch = useAppDispatch();
  // const posts = useSelector(postsSelector.posts);
  const user = useSelector(authSelectors.user);

  // useEffect(() => {
  //   if (Object.keys(posts).length === 0) {
  //     if (!user) {
  //       dispatch(getGeneralLatestPosts())
  //         .then()
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     }
  //   }
  // }, [posts, user]);

  // const renderPosts = () => {
  //   return Object.keys(posts).map((key) => {
  //     return (
  //       // <CheckAuth isPrivate={false}>
  //       // <Post details={posts[key]} />
  //       <h2>Posts here</h2>
  //       // </CheckAuth>
  //     );
  //   });
  // };
  // return <div>{renderPosts()}</div>;
  return <div>home</div>;
}

export default Home;
