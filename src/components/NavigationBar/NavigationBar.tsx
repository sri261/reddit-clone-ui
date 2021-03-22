import React from "react";
import {
  Row,
  FormControl,
  Dropdown,
  Navbar,
  NavbarBrand,
  Button,
  Col,
} from "react-bootstrap";
import { FaReddit } from "react-icons/fa";

import "./NavigationBar.css";

function NavigationBar() {
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
          <Button variant="primary" className="nav_button" color="#0079d3">
            Sign Up
          </Button>
          {/* <Dropdown>
            <Dropdown.Toggle>
              <FaReddit />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
        </div>
      </Navbar>
    </>
  );
}

export default NavigationBar;
