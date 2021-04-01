import React, { useEffect, useState } from "react";
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

export interface SignUpModalProps {
  showModal: boolean;
}

function SignUpModal(props: SignUpModalProps) {
  //   const [showModal, setShowModal] = useState(props.showModal);
  const [showModal, setShowModal] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  console.log(showModal, "showModal");
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(password, username);
  };

  useEffect(() => {
    setShowModal(props.showModal);
    console.log("inside useEffect");
    console.log(props.showModal, "inside useEffect props.showModal");
  }, [props.showModal]);
  return (
    <div>
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
    </div>
  );
}

export default SignUpModal;
