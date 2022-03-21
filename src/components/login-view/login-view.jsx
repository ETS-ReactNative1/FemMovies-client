import React, { useState } from 'react';
import propTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';

// Create LoginView as function component using Hooks
export function LoginView(props) {
  // Call useState method from React to initialize login variables with an empty value
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Sending request to server for authentication
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent default submit button behaviour, i.e., don't reload the page
    console.log(username, password);

    /* Send a request to the server for authentication */
    /* then call this.props.onLoggedIn(username) */
    props.onLoggedIn(username);
  }

  // Return a login form where users can submit their username and password
  // Listening to changes on input and then updating the respective states

  return (
    <>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </>
  );

}

LoginView.propTypes = {
  onLoggedIn: propTypes.func.isRequired
};