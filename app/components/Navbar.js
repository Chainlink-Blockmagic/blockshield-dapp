import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const CustomNavbar = () => (
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/">My DApp</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
    </Nav>
  </Navbar>
);

export default CustomNavbar;
