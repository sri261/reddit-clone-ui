import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Col, Row, Card, Button, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import NavigationBar from "../../components/NavigationBar/NavigationBar";
import { useAppDispatch } from "../../store/store";
import {
  getSubredditPosts,
  postsSelector,
  emptyPostsSlice,
} from "../../store/postSlice";
import CreatePost from "../../components/CreatePost/CreatePost";
import Post from "../../components/Post/Post";
import { authSelectors } from "../../store/authSlice";
import { getSubredditDetails } from "../../store/subredditFollowersSlice";

function SubrredditPage() {
  const { subredditId, subredditName } = useParams<any>();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const posts = useSelector(postsSelector.posts);
  const user = useSelector(authSelectors.user);

  useEffect(() => {
    if (Object.keys(posts).length === 0) {
      dispatch(getSubredditPosts(subredditId))
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    }

    dispatch(getSubredditDetails(subredditId))
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    window.onpopstate = () => {
      dispatch(emptyPostsSlice());
    };
  }, [posts]);

  return (
    <div>
      <NavigationBar />
      <Image
        src={`https://image.shutterstock.com/image-vector/sample-stamp-grunge-texture-vector-260nw-1389188336.jpg`}
        fluid
        style={{ height: "25vh", width: "100vw" }}
      />

      <Row className="w-100 " style={{ marginTop: "25px" }}>
        <Col>
          <h3>{`${subredditName}`}</h3>
          <h6> {`r/${subredditName}`}</h6>
          {user ? (
            <div style={{ marginTop: "-25px" }}>
              <CreatePost />
            </div>
          ) : null}

          {Object.keys(posts).map((key) => {
            // console.log(posts[key]);
            return <Post details={posts[key]} />;
          })}
        </Col>
        <Col sm={3}>
          <Button>Join</Button>
          <Card>
            <Card.Title
              style={{
                backgroundColor: "#ff8e5d",
                color: "white",
                height: "40px",
              }}
            >
              <h6 style={{ padding: "10px" }}> About Community</h6>
            </Card.Title>
            <h5>{`r/${subredditName}`}</h5>
            <Card.Text>sample text</Card.Text>
            {user ? (
              <Button
                onClick={(e) => {
                  history.push("/submit");
                }}
              >
                Create Post
              </Button>
            ) : null}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default SubrredditPage;
