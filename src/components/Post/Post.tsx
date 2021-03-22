import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { FaNewspaper } from "react-icons/fa";
import { MdModeComment } from "react-icons/md";
import {} from "react-icons/md";

import "./Post.css";

function Post() {
  return (
    <div>
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
            <div style={{ width: "25px", marginTop: "8px" }}>
              <ImArrowUp />
              <div style={{ fontSize: "80%" }}>3.3k</div>
              <ImArrowDown />
            </div>
          </Col>
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
          <Col>
            <div style={{ marginLeft: "5px" }}>
              <Row>
                <h6 style={{ marginTop: "8px", marginBottom: "0px" }}>
                  This is the title for this post with bold
                </h6>
              </Row>
              <Row>
                <h6 style={{ fontSize: "85%" }}>r/subredd</h6>
                &nbsp;
                <div style={{ fontSize: "12px", color: "#878a8c" }}>
                  Posted by u/sample 10 hours ago
                </div>
              </Row>
              <Row></Row>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default Post;
