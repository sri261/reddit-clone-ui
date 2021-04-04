import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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
import { authSelectors, followSubreddit } from "../../store/authSlice";
import { getSubredditDetails } from "../../store/subredditFollowersSlice";
import { subredditFollowersSelector } from "../../store/subredditFollowersSlice";

function SubrredditPage() {
  const [joined, setJoined] = useState<boolean>(false);
  const { subredditId, subredditName } = useParams<any>();
  const [subredditCreatorId, setSubredditCreatorId] = useState<number>();

  const history = useHistory();
  const dispatch = useAppDispatch();
  const posts = useSelector(postsSelector.posts);
  const user = useSelector(authSelectors.user);
  const userId = useSelector(authSelectors.user_id);
  const followedSubreddits = useSelector(authSelectors.followed_subreddits);
  useEffect(() => {
    if (Object.keys(posts).length === 0) {
      dispatch(getSubredditPosts(subredditId))
        .then()
        .catch((err) => {
          console.log(err);
        });
    }
    Object.keys(posts).map((key) => {
      console.log(posts[key].subreddit.user_id);
      setSubredditCreatorId(posts[key].subreddit.user_id);
    });

    followedSubreddits?.map((subreddit_id) => {
      if (subredditId == subreddit_id) {
        setJoined(true);
      }
    });

    window.onpopstate = () => {
      dispatch(emptyPostsSlice());
    };
  }, [posts, user]);

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
            return <Post details={posts[key]} />;
          })}
        </Col>
        <Col sm={3}>
          <Button
            onClick={() => {
              console.log({ userId, subredditId }, "at button");
              user
                ? dispatch(
                    followSubreddit({
                      subreddit_id: parseInt(subredditId),
                      user_id: userId,
                    })
                  )
                    .then((res) => {})
                    .catch((err) => {
                      console.log(err);
                    })
                : console.log("please login or sign up to continue");
            }}
          >
            {joined ? "Joined" : "Join"}
          </Button>
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
            <Card.Footer>
              {subredditCreatorId === userId ? (
                <Link to={`/subreddit/${subredditId}/${subredditName}/edit`}>
                  Edit Community
                </Link>
              ) : null}
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default SubrredditPage;
