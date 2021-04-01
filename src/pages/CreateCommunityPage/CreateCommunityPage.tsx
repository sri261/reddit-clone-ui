import React, { useState } from "react";
import { Form, Button, FormControl, Card } from "react-bootstrap";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../../store/store";
import "./CreateCommunityPage.css";
import { createNewSubreddit } from "../../store/subredditSlice";
import { authSelectors } from "../../store/authSlice";
function CreateCommunityPage() {
  const [subredditName, setSubredditName] = useState("");
  const [subredditDescription, setSubredditDescription] = useState("");
  const [imageLocation, setImageLocation] = useState("");
  const dispatch = useAppDispatch();
  const userId = useSelector(authSelectors.user_id);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      createNewSubreddit({
        subreddit_name: subredditName,
        description: subredditDescription,
        user_id: userId,
        image_location: imageLocation,
      })
    )
      .then((r: any) => {
        console.log(r);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="create_community_main">
      <Card className="create_community_main_card">
        <Card.Title>Create Community</Card.Title>
        <Form onSubmit={onFormSubmit}>
          <Form.Group>
            <FormControl
              placeholder="Subreddit Name(community name)"
              onChange={(e: any) => {
                setSubredditName(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <FormControl
              placeholder="Subreddit description"
              onChange={(e: any) => {
                setSubredditDescription(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group>
            <FormControl
              placeholder="Image Location"
              onChange={(e: any) => {
                setImageLocation(e.target.value);
              }}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default CreateCommunityPage;
