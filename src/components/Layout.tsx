import React from "react";
import { Button, Card, Row, Col, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";

import NavigationBar from "./NavigationBar/NavigationBar";
import TopBar from "./TopBar/TopBar";
import CreatePost from "./CreatePost/CreatePost";
import CheckAuth from "./CheckAuth";

// import { top } from "../images/reddit_background_image.png";
interface LayoutProps {
  children: JSX.Element;
}

function Layout({ children }: LayoutProps) {
  const history = useHistory();
  return (
    <div>
      <Row className=" d-flex flex-column w-100">
        <NavigationBar />
        <Col className="w-100">
          <Row>
            <Col>
              <CheckAuth isPrivate={true}>
                <CreatePost />
              </CheckAuth>
              <TopBar />
              {children}
            </Col>
            <Col sm={3}>
              <Card style={{ marginTop: "25px" }}>
                <Card.Img
                  variant="top"
                  src={
                    "https://media-assets-05.thedrum.com/cache/images/thedrum-prod/s3-news-tmp-90538-reddit_main_2--2x1--940.jpg"
                  }
                  style={{ maxHeight: "100px" }}
                />

                <Card.Body>
                  <Card.Title>Top Communities</Card.Title>
                  <Row
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <CheckAuth isPrivate={true}>
                      <Button
                        variant="danger"
                        style={{ borderRadius: "30px" }}
                        onClick={() => {
                          history.push("/create-community");
                        }}
                      >
                        Create Community
                      </Button>
                    </CheckAuth>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Layout;
