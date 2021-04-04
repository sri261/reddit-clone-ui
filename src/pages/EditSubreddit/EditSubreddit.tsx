import React, { useState, useEffect } from "react";
import { Form, Button, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { useAppDispatch } from "../../store/store";
import { authSelectors } from "../../store/authSlice";
import {
  getSubredditDetails,
  subredditSelector,
  updateSubreddit,
} from "../../store/subredditSlice";

function EditSubreddit() {
  const [subredditName, setSubredditName] = useState<string | undefined>();
  const [subredditDescription, setSubredditDescription] = useState<
    string | undefined
  >();
  const [imageLocation, setImageLocation] = useState<string | undefined>();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { subredditId } = useParams<any>();
  const subreddit = useSelector(subredditSelector.subreddit);
  const user_id = useSelector(authSelectors.user_id);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      updateSubreddit({
        id: subredditId,
        user_id: user_id,
        subreddit_name: subredditName,
        description: subredditDescription,
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

  useEffect(() => {
    if (Object.keys(subreddit).length === 0) {
      dispatch(getSubredditDetails(subredditId))
        .then()
        .catch((error) => {
          console.log(error);
        });
    }
    Object.keys(subreddit).map((key) => {
      setSubredditName(subreddit[1]?.subreddit_name);
      setSubredditDescription(subreddit[1]?.description);
      setImageLocation(subreddit[1]?.image_location);
    });
  }, [subreddit]);
  return (
    <div>
      <Form onSubmit={onFormSubmit}>
        <Form.Group>
          <FormControl
            value={subredditName}
            onChange={(e: any) => {
              setSubredditName(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group>
          <FormControl
            onChange={(e: any) => {
              setSubredditDescription(e.target.value);
            }}
            value={subredditDescription}
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
    </div>
  );
}

export default EditSubreddit;
