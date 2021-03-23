import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import "./pages.css";
import CreatePost from "../components/CreatePost/CreatePost";
import Post from "../components/Post/Post";

function Home() {
  const history = useHistory();

  return (
    <div className="home_page_bg">
      <Row className="home_page">
        <Col>
          <CreatePost />
          <Post />
          <Post />
          <Post />
          <Post />
        </Col>
        <Col sm={3}>
          <Card>left</Card>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
