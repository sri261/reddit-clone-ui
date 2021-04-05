import { useEffect } from "react";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../../store/store";
import { getBestPosts, postsSelector } from "../../store/postSlice";
import { authSelectors } from "../../store/authSlice";
import Post from "../../components/Post/Post";

function Best() {
  const dispatch = useAppDispatch();
  const user_id = useSelector(authSelectors.user_id);
  const posts = useSelector(postsSelector.posts);

  useEffect(() => {
    if (Object.keys(posts).length === 0) {
      dispatch(getBestPosts(user_id))
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [posts]);
  return (
    <div>
      {" "}
      {Object.keys(posts).map((key) => {
        return <Post details={posts[key]} />;
      })}
    </div>
  );
}

export default Best;
