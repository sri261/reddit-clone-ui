import React from "react";
import {
  Card,
  Row,
  Col,
  Container,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";

import NavigationBar from "../components/NavigationBar";
import "./pages.css";

function Home() {
  const history = useHistory();

  return (
    <div className="home_page_bg">
      <Row className="home_page">
        <Col>
          <Card className="create_post">
            <FormControl
              placeholder="Create Post"
              className="create_post_input"
              onClick={() => {
                history.push("/submit");
              }}
            ></FormControl>
          </Card>
        </Col>
        <Col sm={3}>
          <Card>left</Card>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
