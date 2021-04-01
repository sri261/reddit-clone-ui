import React, { useEffect, useState } from "react";
import { Form, Card, FormControl, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import SelectSearch from "react-select-search";
import { authSelectors } from "../../store/authSlice";
import { Route, Redirect, useHistory } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { createNewPost, emptyPostsSlice } from "../../store/postSlice";
import { searchSubreddit } from "../../store/subredditSlice";

const CreatePostPage = () => {
  const user_id = useSelector(authSelectors.user_id);
  const history = useHistory();
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [subredditId, setSubredditId] = useState<number>();
  const [search, setSearch] = useState<any>();
  const [searchSubredditId, setSearchSubredditId] = useState("");
  const dispatch = useAppDispatch();

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      createNewPost({
        user_id: user_id,
        subreddit_id: subredditId,
        post_title: postTitle,
        post_description: postDescription,
        upvotes: 0,
        downvotes: 0,
        comments_count: 0,
      })
    )
      .then(() => {
        dispatch(emptyPostsSlice());
        history.goBack();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {}, [search]);

  return (
    <div>
      {user_id ? (
        <Card>
          <Form onSubmit={onFormSubmit}>
            <Form.Group>
              <FormControl
                placeholder="Title"
                onChange={(e: any) => {
                  setPostTitle(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <FormControl
                placeholder="Text(Optional)"
                onChange={(e: any) => {
                  setPostDescription(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <input
                onClick={() => {
                  setSearchSubredditId("");
                }}
                onChange={(e: any) => {
                  if (e.target.value.length >= 1) {
                    dispatch(searchSubreddit(e.target.value))
                      .then((r) => {
                        setSearch(r.payload);
                      })
                      .catch((e) => {
                        console.log(e);
                      });
                  }
                }}
                value={searchSubredditId}
              />

              {search
                ? Object.keys(search).map((key) => {
                    console.log(search[key]);

                    return (
                      <div
                        onClick={() => {
                          setSearchSubredditId(search[key].subreddit_name);
                          setSubredditId(search[key].id);
                          setSearch([]);
                        }}
                      >
                        {search[key].subreddit_name}
                      </div>
                    );
                  })
                : null}
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
};

export default CreatePostPage;
