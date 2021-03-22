import React from "react";
import { Navbar, NavbarBrand } from "react-bootstrap";
import { FaReddit } from "react-icons/fa";
function NavigationBar() {
  return (
    <>
      <Navbar bg="white">
        <NavbarBrand color="danger">
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <FaReddit size="30px" color="#ff4500" />
            <div>&nbsp; reddit</div>
          </div>
        </NavbarBrand>
      </Navbar>
    </>
  );
}

export default NavigationBar;
