import { useEffect } from "react";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../.././store/store";
import {
  getHotPosts,
  postsSelector,
  emptyPostsSlice,
} from "../../store/postSlice";
import Post from "../../components/Post/Post";

function New() {
  const dispatch = useAppDispatch();
  const posts = useSelector(postsSelector.posts);

  useEffect(() => {
    if (Object.keys(posts).length === 0) {
      dispatch(getHotPosts())
        .then()
        .catch((err) => {
          console.log(err);
        });
    }
  }, [posts]);
  return (
    <div>
      {Object.keys(posts).map((key) => {
        return <Post details={posts[key]} />;
      })}
    </div>
  );
}

export default New;
