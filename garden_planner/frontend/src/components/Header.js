import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import '../css/theme.css';

class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="md" className="bg-pastel-green">
        <Navbar.Brand
          as={Nav.Link}
          onClick={() => this.props.handleSelectPage('designer')}
        >
          Penny's Garden Planner
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-actions" />
        <Navbar.Collapse id="navbar-actions">
          <Nav
            className="mr-auto"
            activeKey={this.props.currentPageId}
            onSelect={selectedKey => this.props.handleSelectPage(selectedKey)}
          >
            {
              this.props.pages.map(page => {
                return <Nav.Link eventKey={page.id} key={page.id}>{page.label}</Nav.Link>;
              })
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;