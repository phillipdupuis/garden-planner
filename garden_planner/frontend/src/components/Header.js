import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import '../App.css';

class Header extends React.Component {
  render() {
    return (
      <Navbar expand="md" className="bg-pastel-green">
        <Navbar.Brand href="#home">Penny's Garden Planner</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-actions" />
        <Navbar.Collapse id="navbar-actions">
          <Nav className="mr-auto" activeKey={"#home"}>
            <Nav.Link href="#home">Designer</Nav.Link>
            <Nav.Link href="#features">About</Nav.Link>
            <Nav.Link href="#pricing">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;