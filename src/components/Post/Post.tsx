import React, { useEffect, useState } from "react";
import { Card, Row, Col, Modal, Button } from "react-bootstrap";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { FaNewspaper, FaCommentAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./Post.css";
import { Subreddit } from "../../interfaces/Subreddit";
import { PostI } from "../../interfaces/Post";
import Comments from "../Comments/Comments";
import { TempUser } from "../../interfaces/User";
import { updateVote, emptyPostsSlice } from "../../store/postSlice";
import { useAppDispatch } from "../../store/store";
import { authSelectors } from "../../store/authSlice";
import SubredditPage from "../../pages/SubredditPage/SubrredditPage";
interface Details extends PostI {
  subreddit: Subreddit;
  user: TempUser;
  hot: number;
}

interface PostProps {
  details?: any;
  // inSubredditPage: boolean;
}

// const SelectedSubredditIdContext = React.createContext(details.subreddit.id);

function Post({ details }: PostProps) {
  const [subredditId, setSubredditId] = useState(details.subreddit.id);
  const [subredditName, setSubredditName] = useState(
    details.subreddit.subreddit_name
  );
  const [post_id, setPost_id] = useState(details.id);
  const [modal, setModal] = useState(false);
  const dispatch = useAppDispatch();
  const userId = useSelector(authSelectors.user_id);
  const history = useHistory();

  useEffect(() => {
    // console.log(details, "details");
  }, [details]);

  return (
    <div>
      {/* ----------------- comments modal --------------------------- */}
      <Modal
        show={modal}
        onHide={() => {
          setModal(false);
        }}
        dialogClassName="my-modal"
        // classname="comments_modal"
      >
        {/* {console.log(details)} */}
        <Modal.Header closeButton style={{ backgroundColor: "black" }}>
          <Modal.Title style={{ color: "white", fontSize: "15px" }}>
            <div className="modal_header">
              <div className="modal_votes">
                <ImArrowUp />
                {details ? details.upvotes - details.downvotes : null}
                <ImArrowDown />
              </div>
              <div className="modal_title"> {details?.post_title}</div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Row>
          <Col>
            <Card>
              <Comments post_id={details?.id} />
            </Card>
          </Col>
          <Col sm={3}>
            <div className="p-100">
              <Card>
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <Card.Title>
                  {`r/${details?.subreddit.subreddit_name}`}
                </Card.Title>
                <Card.Body>
                  <Card.Text>{details?.subreddit.description}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Modal>
      {/* --------------- Post --------------------------- */}
      <Card>
        <Row>
          <Col
            xs={1}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* ------------ votes ----------------------- */}
            <div style={{ width: "25px", marginTop: "8px" }}>
              <div
                onClick={() => {
                  dispatch(
                    updateVote({
                      user_id: userId,
                      post_id: post_id,
                      vote: "up",
                    })
                  )
                    .then((results) => {
                      console.log(results);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                <ImArrowUp />
              </div>

              <div style={{ fontSize: "80%" }}>
                {details ? details.upvotes - details.downvotes : null}
              </div>
              <div
                onClick={() => {
                  dispatch(
                    updateVote({
                      user_id: userId,
                      post_id: post_id,
                      vote: "down",
                    })
                  )
                    .then((results) => {
                      console.log(results);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                <ImArrowDown />
              </div>
            </div>
          </Col>
          {/* ------------------- image ------------------------- */}
          <Col
            xs={1}
            style={{
              backgroundColor: "#f6f7f8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "5px",
              borderRadius: "6px",
            }}
          >
            <FaNewspaper style={{ fontSize: "30px", color: "#878a8c" }} />
          </Col>
          {/* ----------------- post details ------------------- */}
          <Col>
            <div style={{ marginLeft: "5px" }}>
              {/* --------- post title ------------------ */}
              <Row>
                <div
                  onClick={() => {
                    setModal(true);
                  }}
                >
                  <h6 style={{ marginTop: "8px", marginBottom: "0px" }}>
                    {details?.post_title}
                  </h6>
                </div>
              </Row>
              {/* --------- post subreddit name ------------------ */}

              <Row>
                <div
                  onClick={() => {
                    dispatch(emptyPostsSlice());
                  }}
                >
                  <Link to={`/subreddit/${subredditId}/${subredditName}`}>
                    <h6 style={{ fontSize: "85%" }}>
                      {`r/${details?.subreddit.subreddit_name}`}
                    </h6>
                  </Link>
                </div>
                &nbsp;
                <div style={{ fontSize: "12px", color: "#878a8c" }}>
                  {`Posted by u/${details?.user.username} `}
                </div>
              </Row>
              <Row
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    setModal(true);
                  }}
                >
                  <FaCommentAlt fontSize="15px" style={{ marginLeft: "5px" }} />
                  <div>{details?.comments_count}</div>
                </div>
              </Row>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default Post;
