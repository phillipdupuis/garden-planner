import '../css/theme.css';
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';


const propTypes = {
  handleSignUp: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  errorText: PropTypes.string,
};

class SignUpModal extends React.Component {

  renderForm() {
    return (
      <Form onSubmit={this.props.handleSignUp}>
        <Form.Group controlId="signupUsername">
          <Form.Control required type="text" name="username" placeholder="Username" />
        </Form.Group>
        <Form.Group controlId="signupEmail">
          <Form.Control required type="email" name="email" placeholder="Email" />
        </Form.Group>
        <Form.Group controlId="signupPassword">
          <Form.Control required type="password" name="password" placeholder="Password" />
        </Form.Group>
        <Button block variant="success" type="submit">Sign up</Button>
      </Form>
    )
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
          <Modal.Title>Sign up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.renderError()}
          {this.renderForm()}
        </Modal.Body>
      </Modal>
    );
  }
}

SignUpModal.propTypes = propTypes;

export default SignUpModal;