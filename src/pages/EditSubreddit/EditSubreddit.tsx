import React, { useState, useEffect } from "react";
import { Form, Button, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useAppDispatch } from "../../store/store";
import {
  getSubredditDetails,
  subredditSelector,
} from "../../store/subredditSlice";

function EditSubreddit() {
  const [subredditName, setSubredditName] = useState<string | undefined>();
  const [subredditDescription, setSubredditDescription] = useState<
    string | undefined
  >();
  const [imageLocation, setImageLocation] = useState<string | undefined>();
  const dispatch = useAppDispatch();
  const { subredditId } = useParams<any>();
  const subreddit = useSelector(subredditSelector.subreddit);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (Object.keys(subreddit).length === 0) {
      dispatch(getSubredditDetails(subredditId));
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
