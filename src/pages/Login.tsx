import React, { useState } from "react";
import { Button, Form, Card, Container, Col, Row } from "react-bootstrap";

import { useAppDispatch } from "../store/store";
import { signup } from "../store/authSlice";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const onFromSubmit = (e: any) => {
    e.preventDefault();
    dispatch(signup({ username, password }))
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Container fluid>
        <Row xs={1}>
          <Col sm={8}>
            <Card>
              <Form onSubmit={onFromSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    // type="email"
                    placeholder="Enter email"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Login
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
