import React, { ReactEventHandler, useState } from "react";
// import { useDispatch } from "react-redux";
import {
  Row,
  FormControl,
  Dropdown,
  Navbar,
  NavbarBrand,
  Button,
  Col,
  Modal,
  Form,
} from "react-bootstrap";
import { FaReddit } from "react-icons/fa";
import { useHistory } from "react-router-dom";

import "./NavigationBar.css";
import SignUpModal from "../SignUpModal/SignUpModal";
import { useAppDispatch } from "../../store/store";
import { signup } from "../../store/authSlice";
function NavigationBar() {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signup({ username, password }))
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(password, username);
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
        <div>
          <FormControl className="navbar_search"></FormControl>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <Button variant="outline-primary" className="nav_button">
            Log In
          </Button>
          <Button
            onClick={() => {
              setShowModal(true);
              console.log(showModal, "showModal");
            }}
            variant="primary"
            className="nav_button"
            color="#0079d3"
          >
            Sign Up
          </Button>
        </div>
        {/* <SignUpModal showModal={showModal} /> */}

        {/* +++++++++++++++++++++++++++++++++++ */}
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
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
        {/* +++++++++++++++++++++++++++++++++++ */}
      </Navbar>
    </>
  );
}

export default NavigationBar;
