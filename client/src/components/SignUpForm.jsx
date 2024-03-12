import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import {useMutation} from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth'


const SignupForm = () => {
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [addUser] = useMutation(ADD_USER);

 
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: userFormData.email,
        password: userFormData.password,
        username:userFormData.username,
        
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Error creating an account. Please try again.
        </Alert>
        <Form.Group controlId='formBasicUsername' className='mb-3'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter username'
            name='username'
            value={userFormData.username}
            onChange={handleInputChange}
            required
          />
          <Form.Control.Feedback type='invalid'>Please enter a username.</Form.Control.Feedback>
        </Form.Group>
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
          <Form.Control.Feedback type='invalid'>Please enter a password.</Form.Control.Feedback>
        </Form.Group>
        <Button variant='primary' type='submit'>
          Sign Up
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;
