import React from "react";
import { Form, Card, FormControl } from "react-bootstrap";

const CreatePostPage = () => {
  return (
    <div>
      <Card>
        <Form>
          <Form.Group>
            <FormControl placeholder="Title" />
          </Form.Group>
          <Form.Group>
            <FormControl placeholder="Text(Optional)" />
          </Form.Group>
        </Form>
      </Card>
    </div>
  );
};

export default CreatePostPage;
