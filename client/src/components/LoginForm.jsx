import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutations';
import Auth from '../utils/auth';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loginUser] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const { data } = await loginUser({
        variables: { ...userFormData }
      });

      const { token } = data.login;
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Invalid email or password. Please try again.
        </Alert>

        <Form.Group controlId='formBasicEmail' className='mb-3'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            name='email'
            value={userFormData.email}
            onChange={handleInputChange}
            required
          />
          <Form.Control.Feedback type='invalid'>Please enter a valid email.</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId='formBasicPassword' className='mb-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            value={userFormData.password}
            onChange={handleInputChange}
            required
          />
          <Form.Control.Feedback type='invalid'>Please enter your password.</Form.Control.Feedback>
        </Form.Group>

        <Button variant='primary' type='submit'>
          Log In
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
