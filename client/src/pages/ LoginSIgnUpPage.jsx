import React from 'react';
import SignUpForm from '../components/SignUpForm';
import LoginForm from '../components/LoginForm';

    const AuthPage = () => {
        return (
          <div>
            <h1>Authentication Page</h1>
            <div>
              <h2>Sign Up</h2>
              <SignUpForm />
            </div>
            <div>
              <h2>Login</h2>
              <LoginForm />
            </div>
          </div>
        );
      };

export default AuthPage;