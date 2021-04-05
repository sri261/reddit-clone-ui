import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { Form, FormControl, Button, Card } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";

import NavigationBar from "../../components/NavigationBar/NavigationBar";
import { authSelectors } from "../../store/authSlice";
import { useAppDispatch } from "../../store/store";
import { postsSelector, editPost } from "../../store/postSlice";

interface EditPost {
  details?: any;
}

function EditPost() {
  const posts = useSelector(postsSelector.posts);
  const { post_id } = useParams<any>();
  const [postTitle, setPostTitle] = useState(posts[post_id]?.post_title);
  const [description, setDescription] = useState(
    posts[post_id]?.post_description
  );
  const [imageLocation, setImageLocation] = useState(
    posts[post_id]?.image_location
  );

  const user = useSelector(authSelectors.user);
  const userId = useSelector(authSelectors.user_id);

  const history = useHistory();
  const dispatch = useAppDispatch();

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      editPost({
        post_id: post_id,
        user_id: userId,
        post_title: postTitle,
        post_description: description,
        image_location: imageLocation,
      })
    )
      .then((res) => {
        history.goBack();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {}, []);

  return (
    <div>
      {user ? (
        <div>
          <NavigationBar />
          <Card>
            <Form onSubmit={onFormSubmit}>
              <Form.Group>
                <FormControl
                  value={postTitle}
                  onChange={(e: any) => {
                    setPostTitle(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <FormControl
                  onChange={(e: any) => {
                    setDescription(e.target.value);
                  }}
                  value={description}
                />
              </Form.Group>
              <Form.Group>
                <FormControl
                  onChange={(e: any) => {
                    setImageLocation(e.target.value);
                  }}
                  value={imageLocation}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
}

export default EditPost;
