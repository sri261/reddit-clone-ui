import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Form, Card, FormControl, Button } from "react-bootstrap";

import { useAppDispatch } from "../.././store/store";
import {
  getCommentsForPost,
  commentsSelector,
  addComments,
} from "../../store/commentsSlice";
import { authSelectors } from "../../store/authSlice";
import { emptyPostsSlice } from "../../store/postSlice";
function Comments(props: any) {
  const [comment, setComment] = useState("");
  const dispatch = useAppDispatch();
  const comments = useSelector(commentsSelector.comments);
  const user = useSelector(authSelectors.user);
  const userId = useSelector(authSelectors.user_id);
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      addComments({
        user_id: userId,
        post_id: props.post_id,
        comment: comment,
        upvotes: 0,
        downvotes: 0,
      })
    )
      .then((response) => {
        dispatch(emptyPostsSlice());
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    dispatch(getCommentsForPost(props.post_id))
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      {user ? (
        <div>
          <Form onSubmit={onFormSubmit}>
            <Form.Group>
              <FormControl
                placeholder="Title"
                onChange={(e: any) => {
                  setComment(e.target.value);
                }}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Comment
            </Button>
          </Form>
        </div>
      ) : (
        <div>Login or SignUp to leave a Comment</div>
      )}

      {Object.keys(comments).map((key) => {
        // console.log(comments[key]);
        return (
          <div>
            <h6>comment:{comments[key].comment}</h6>
            <h6>user:{comments[key].user.username}</h6>
          </div>
        );
      })}
    </div>
  );
}

export default Comments;
