import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import '../css/theme.css';
import githubIcon from '../images/mark-github.svg';


const propTypes = {
  defaultPath: PropTypes.string.isRequired,
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired
};

const GithubLink = () => {
  return (
    <a
      target="_blank"
      href="https://github.com/phillipdupuis/garden-planner"
      data-toggle="tooltip"
      data-placement="left"
      title="Github"
    >
      <img
        src={githubIcon}
        alt="Github"
        width="24"
        height="24"
        className="d-none d-sm-none d-md-block" 
      />
    </a>
  );
}

class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="md" className="bg-pastel-green">
        <Navbar.Brand href={this.props.defaultPath}>
          Penny's Garden Planner
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-actions" />
        <Navbar.Collapse id="navbar-actions">
          <Nav className="mr-auto" activeKey={this.props.location.pathname}>
            {
              this.props.navItems.map(item => {
                return (
                  <Nav.Item key={item.name}>
                    <Nav.Link href={item.path}>{item.name}</Nav.Link>
                  </Nav.Item>
                );
              })
            }
          </Nav>
          <GithubLink />
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

Header.propTypes = propTypes;

export default withRouter(Header);