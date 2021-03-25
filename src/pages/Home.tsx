import React, { useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

import "./pages.css";
import { useAppDispatch } from "../store/store";
import CreatePost from "../components/CreatePost/CreatePost";
import Post from "../components/Post/Post";
import CheckAuth from "../components/CheckAuth";
import { getSubreddits } from "../store/subredditSlice";
import { subredditSelector } from "../store/subredditSlice";
import { authSelectors } from "../store/authSlice";

function Home() {
  const dispatch = useAppDispatch();
  const subreddits = useSelector(subredditSelector.subreddits);
  const user = useSelector(authSelectors.user);

  useEffect(() => {
    console.log(user);
    if (Object.keys(subreddits).length === 0) {
      dispatch(getSubreddits())
        .then()
        .catch((error) => {
          console.log(error);
        });
    }
  }, [subreddits, user]);

  const renderSubReddits = () => {
    if (user) {
      return (
        <div>
          <Post></Post>
        </div>
      );
    } else {
      return Object.keys(subreddits).map((key) => {
        return (
          <div>
            <CheckAuth isPrivate={false}>
              <Post details={subreddits[key]} />
            </CheckAuth>
          </div>
        );
      });
    }
  };

  return (
    <div className="home_page_bg">
      <Row className="home_page">
        <Col>
          <CheckAuth isPrivate={true}>
            <CreatePost />
          </CheckAuth>
          {renderSubReddits()}
        </Col>
        <Col sm={3}>
          <Card>left</Card>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
