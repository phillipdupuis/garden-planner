import '../css/theme.css';
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';


const propTypes = {
  handleLogIn: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSwitchToSignUp: PropTypes.func.isRequired,
  errorText: PropTypes.string,
};

class LogInModal extends React.Component {

  renderForm() {
    return (
      <Form onSubmit={this.props.handleLogIn}>
        <Form.Group controlId="loginUsername">
          <Form.Control required type="text" name="username" placeholder="Username" />
        </Form.Group>
        <Form.Group controlId="loginPassword">
          <Form.Control required type="password" name="password" placeholder="Password" />
        </Form.Group>
        <Button block variant="success" type="submit">Log in</Button>
        <Button block variant="link" type="button" onClick={this.props.handleSwitchToSignUp}>
          No account? Sign up here
        </Button>
      </Form>
    );
  }

  renderError() {
    if (this.props.errorText) {
      return <Alert variant="danger">{this.props.errorText}</Alert>;
    } else {
      return null;
    }
  }

  render() {
    return (
      <Modal
        show={true}
        onHide={this.props.handleClose}
      >
        <Modal.Header closeButton className="bg-pastel-green">
          <Modal.Title>Log in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.renderError()}
          {this.renderForm()}
        </Modal.Body>
      </Modal>
    );
  }
}

LogInModal.propTypes = propTypes;

export default LogInModal;