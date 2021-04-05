import React, { useState, useEffect } from "react";
import {
  FormControl,
  Navbar,
  NavbarBrand,
  Button,
  Modal,
  Form,
  Card,
} from "react-bootstrap";
import { FaReddit } from "react-icons/fa";
import { useHistory, Link } from "react-router-dom";

import "./NavigationBar.css";
import { useAppDispatch } from "../../store/store";
import { signup, login, logout } from "../../store/authSlice";
import CheckAuth from "../CheckAuth";
import { searchSubreddit } from "../../store/subredditSlice";
import { emptyPostsSlice } from "../../store/postSlice";

function NavigationBar() {
  const [showModal, setShowModal] = useState(false);
  const [showLogininModal, setLoginModalShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [searchSubredditId, setSearchSubredditId] = useState("");
  const [search, setSearch] = useState<any>();
  const [subredditId, setSubredditId] = useState<number>();

  const dispatch = useAppDispatch();
  const history = useHistory();

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    dispatch(signup({ username, password }))
      .then((response) => {
        setShowModal(false);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);

        console.log(error);
      });
  };
  const onLoginFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    dispatch(login({ username, password }))
      .then((response) => {
        setLoginModalShowModal(false);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  // useEffect(() => {
  //   console.log(user_id);
  // }, [user_id]);
  return (
    <>
      <Navbar
        bg="white"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <NavbarBrand color="danger">
          <div
            style={{ display: "flex", alignItems: "flex-end" }}
            onClick={() => {
              history.push("/");
            }}
          >
            <FaReddit size="30px" color="#ff4500" />
            <div>&nbsp; reddit</div>
          </div>
        </NavbarBrand>
        <div>
          <input
            onClick={() => {
              setSearchSubredditId("");
            }}
            onChange={(e: any) => {
              if (e.target.value.length >= 1) {
                dispatch(searchSubreddit(e.target.value))
                  .then((r: any) => {
                    setSearch(r.payload);
                  })
                  .catch((e: any) => {
                    console.log(e);
                  });
              }
            }}
            value={searchSubredditId}
          />
          {search
            ? Object.keys(search).map((key) => {
                console.log(search[key]);

                return (
                  <div
                    onClick={() => {
                      setSearchSubredditId(search[key].subreddit_name);
                      setSubredditId(search[key].id);
                      setSearch([]);
                      dispatch(emptyPostsSlice());
                    }}
                  >
                    <Link
                      to={`/subreddit/${subredditId}/${search[key].subreddit_name}`}
                    >
                      <Card>{search[key].subreddit_name}</Card>
                    </Link>
                  </div>
                );
              })
            : null}
        </div>

        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <CheckAuth isPrivate={false}>
            <Button
              onClick={() => {
                setLoginModalShowModal(true);
              }}
              variant="outline-primary"
              className="nav_button"
            >
              Log In
            </Button>
          </CheckAuth>

          <CheckAuth isPrivate={false}>
            <Button
              onClick={() => {
                setShowModal(true);
              }}
              variant="primary"
              className="nav_button"
              color="#0079d3"
            >
              Sign Up
            </Button>
          </CheckAuth>
          <CheckAuth isPrivate={true}>
            <Button
              onClick={() => {
                dispatch(logout());
                setShowModal(false);
              }}
              variant="primary"
              className="nav_button"
              color="#0079d3"
            >
              Log Out
            </Button>
          </CheckAuth>
        </div>
        {/* <SignUpModal showModal={showModal} /> */}
        {/* TODO:create a modal component */}
        {/* -------------- Modal for Signup---------------- */}
        <Modal
          show={showModal}
          onHide={() => {
            setShowModal(false);
          }}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={(e) => {
                onFormSubmit(e);
              }}
            >
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <FormControl
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <FormControl
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? "Loading" : "Submit"}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
        {/* -------------- Modal for Login---------------- */}
        <Modal
          show={showLogininModal}
          onHide={() => {
            setLoginModalShowModal(false);
          }}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Log In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={(e) => {
                onLoginFormSubmit(e);
              }}
            >
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <FormControl
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <FormControl
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? "Loading" : "Submit"}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Navbar>
    </>
  );
}

export default NavigationBar;
