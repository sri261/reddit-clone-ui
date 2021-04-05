import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Form, Card, FormControl, Button, Row } from "react-bootstrap";

import { useAppDispatch } from "../.././store/store";
import "./Comments.css";
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
        <div className="test">
          <Form onSubmit={onFormSubmit} className="comment_form">
            <Form.Group className="comments_input">
              <FormControl
                placeholder="What are your thoughts?"
                onChange={(e: any) => {
                  setComment(e.target.value);
                }}
                className="comments_input"
              />
            </Form.Group>
            <Row className="comments_input_button_row">
              <div>
                <Button
                  size="sm"
                  variant="danger"
                  type="submit"
                  className="comments_input_button_row_button"
                >
                  Comment
                </Button>
              </div>
            </Row>
          </Form>
        </div>
      ) : (
        <div>Login or SignUp to leave a Comment</div>
      )}

      {Object.keys(comments).map((key) => {
        // console.log(comments[key]);
        return (
          <div>
            <Card className="comment_card">
              <div className="comment_card_username">
                u/{comments[key].user.username}
              </div>
              <div>{comments[key].comment}</div>
            </Card>
          </div>
        );
      })}
    </div>
  );
}

export default Comments;
