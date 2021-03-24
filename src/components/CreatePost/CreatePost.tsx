import React from "react";
import { Card, FormControl } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { FaImage } from "react-icons/fa";
import { BiLink } from "react-icons/bi";

import "./CreatePost.css";

export function CreatePost() {
  const history = useHistory();

  return (
    <div>
      <Card className="create_post_card">
        <div className="create_post_card_input">
          <FormControl
            placeholder="Create Post"
            className="create_post_input"
            onClick={() => {
              history.push("/submit");
            }}
          ></FormControl>
        </div>
        <div className="create_post_card_icon">
          <FaImage />
        </div>
        <div className="create_post_card_icon">
          <BiLink />
        </div>
      </Card>
    </div>
  );
}

export default CreatePost;
