import React, { useState } from "react";
import {
  FormControl,
  Navbar,
  NavbarBrand,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { FaReddit } from "react-icons/fa";

import "./NavigationBar.css";
import { useAppDispatch } from "../../store/store";
import { signup, login } from "../../store/authSlice";
import CheckAuth from "../CheckAuth";

function NavigationBar() {
  const [showModal, setShowModal] = useState(false);
  const [showLogininModal, setLoginModalShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    dispatch(signup({ username, password }))
      .then((response) => {
        console.log(response, "response at dispatch ");
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
        console.log(response, "response at dispatch ");
        setLoginModalShowModal(false);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  return (
    <>
      <Navbar
        bg="white"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <NavbarBrand color="danger">
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <FaReddit size="30px" color="#ff4500" />
            <div>&nbsp; reddit</div>
          </div>
        </NavbarBrand>
        {/* <div>
          <FormControl className="navbar_search"></FormControl>
        </div> */}
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
